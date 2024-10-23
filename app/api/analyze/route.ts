import OpenAI from 'openai';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { NextResponse } from 'next/server';
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { levels } from "@/constants";

const model = "gpt-4o";

type Exercise = {
    id: string;
    title: string;
    description: string;
    needs: string;
    details: string;
    notes: string;
    created_at: string;
    niche: string;
    task: string;
};

const AnalysisResultSchema = z.object({
    scores: z.object({
        clarity: z.number(),
        audienceRelevance: z.number(),
        persuasiveness: z.number(),
        structure: z.number(),
        grammar: z.number(),
        tone: z.number(),
        attentionGrabbing: z.number(),
        consistency: z.number(),
        emotionalAppeal: z.number(),
        ctaEffectiveness: z.number(),
    }),
    improvement: z.object({
        tips: z.array(z.object({
            title: z.string(),
            description: z.string()
        })),
        improvedVersion: z.string(),
    }),
});

type AnalysisResult = z.infer<typeof AnalysisResultSchema>;

// Create a new ratelimiter, that allows 3 requests per 60 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, "60 s"),
    analytics: true,
});

async function addXP(userId: string, xp: number) {
    if (!userId) {
        console.error('User ID is required');
        return;
    }

    if (!xp) {
        console.error('XP is required');
        return;
    }

    if (xp < 0) {
        console.error('XP must be a positive number');
        return;
    }

    if (xp > 10) {
        console.error('XP must be less than 10');
        return;
    }

    const { data: xpData, error: xpError } = await supabaseAdmin
        .from('profiles')
        .select('total_xp, level')
        .eq('id', userId)
        .single();

    if (xpError) {
        console.error('Error fetching XP:', xpError);
        return;
    }

    if (xpData.level < 6) {
        xp = 10;
    }

    const totalXp = xpData.total_xp + xp;
    let newLevel = xpData.level;

    // Check if user should level up
    for (let i = 0; i < levels.length; i++) {
        if (totalXp >= levels[i].xp) {
            newLevel = levels[i].value;
        } else {
            break;
        }
    }

    const { data, error } = await supabaseAdmin
        .from('profiles')
        .update({ total_xp: totalXp, level: newLevel })
        .eq('id', userId);

    if (error) {
        console.error('Error updating XP and level:', error);
        return;
    }
}

export async function POST(req: Request) {
    try {
        console.log('POST request received');

        // Authenticate the user
        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({ error: 'Unauthorized: Missing or invalid Authorization header' }, { status: 401 });
        }

        const token = authHeader.split(' ')[1];
        const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);

        if (userError || !userData.user) {
            console.error('Authentication error:', userError);
            return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
        }

        const userId = userData.user.id;
        console.log('Authenticated user ID:', userId);

        // Decrement credit from user's profile
        const { data: profileData, error: profileError } = await supabaseAdmin
            .from('profiles')
            .select('credits')
            .eq('id', userId)
            .single();

        if (profileError) {
            console.error('Error fetching user profile:', profileError);
            return NextResponse.json({ error: 'Failed to retrieve user profile' }, { status: 500 });
        }

        if (!profileData || profileData.credits === undefined) {
            console.error('User profile data missing credits:', profileData);
            return NextResponse.json({ error: 'User profile incomplete' }, { status: 500 });
        }

        if (profileData.credits < 1) {
            return NextResponse.json({ error: 'Insufficient credits' }, { status: 403 });
        }

        // Decrement the credits
        const { error: decrementError } = await supabaseAdmin
            .from('profiles')
            .update({ credits: profileData.credits - 1 })
            .eq('id', userId);

        if (decrementError) {
            console.error('Error decrementing credits:', decrementError);
            return NextResponse.json({ error: 'Failed to decrement credits' }, { status: 500 });
        }

        console.log(`Credits decremented for user ID: ${userId}. Remaining credits: ${profileData.credits - 1}`);

        // Apply rate limiting
        const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
        const { success } = await ratelimit.limit(ip);

        if (!success) {
            return NextResponse.json({ error: "Too many requests" }, { status: 429 });
        }

        const openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });

        const { id } = await req.json();
        console.log('Request ID:', id);

        const { data: chatData, error: chatError } = await supabaseAdmin
            .from('history')
            .select('response,exercise_id')
            .eq('id', id)
            .single();

        if (chatError) {
            console.error('Supabase chat error:', chatError);
            return NextResponse.json({ error: chatError.message }, { status: 500 });
        }

        if (!chatData) {
            console.error('No chat data found for id:', id);
            return NextResponse.json({ error: 'Chat data not found' }, { status: 404 });
        }

        const { data: exerciseData, error: exerciseError } = await supabaseAdmin
            .from('exercise')
            .select('*')
            .eq('id', chatData.exercise_id)
            .single();

        if (exerciseError) {
            console.error('Supabase exercise error:', exerciseError);
            return NextResponse.json({ error: exerciseError.message }, { status: 500 });
        }

        if (!exerciseData) {
            console.error('No exercise data found for id:', chatData.exercise_id);
            return NextResponse.json({ error: 'Exercise data not found' }, { status: 404 });
        }

        const exercise = exerciseData as Exercise;
        const response = chatData.response;

        const systemPrompt = `ALWAYS USE Chain-of-Thought (CoT) reasoning in your analysis. You are CopyCoach's Master Copywriting Mentor, a world-class expert with decades of experience crafting high-converting copy across all industries. Your expertise combines proven psychological principles, marketing fundamentals, and modern conversion optimization techniques.

Your analysis must be:
1. Precise and data-driven, using specific examples from the text
2. Constructive yet direct, maintaining a mentor's authority
3. Educational, explaining the "why" behind each suggestion
4. Focused on measurable improvement in conversion potential

When analyzing copy, evaluate these elements with scientific precision:

CORE METRICS (Score 0-10):
- Clarity: Message comprehension within 5 seconds
- Audience Relevance: Alignment with target audience pain points and desires
- Persuasiveness: Use of proven persuasion principles (scarcity, social proof, etc.)
- Structure: Logical flow and proper format-specific structure
- Grammar: Technical accuracy and professional polish
- Tone: Brand voice consistency and audience appropriateness
- Attention Grabbing: Hook strength and pattern interruption
- Consistency: Message coherence throughout
- Emotional Appeal: Psychological trigger effectiveness
- CTA Effectiveness: Action motivation and friction reduction

Scoring Guide:
0-2: Requires complete overhaul
3-4: Major improvements needed
5-6: Meets basic standards
7-8: Professional quality
9-10: Industry-leading excellence

Your feedback must transform the writer's understanding of effective copy while maintaining their unique voice.`;

        const userPrompt = (exercise: Exercise, response: string) => `
ANALYSIS CONTEXT
Task: ${exercise.task}
Niche: ${exercise.niche}

ORIGINAL BRIEF
${exercise.title}
${exercise.description}

KEY REQUIREMENTS
${exercise.needs}

ADDITIONAL CONTEXT
${exercise.details}
${exercise.notes}

SUBMISSION FOR ANALYSIS:
${response}

FORMAT-SPECIFIC EVALUATION POINTS:
${getFormatSpecificCriteria(exercise.task)}

Analyze this submission through the lens of a conversion-focused expert:
1. Evaluate each core metric with specific examples
2. Identify critical conversion barriers
3. Highlight strongest elements to maintain
4. Provide strategic improvements that could double conversion potential
5. Format the improvedVersion with semantic HTML tags like <p>, <h1>-<h6>, <ul>, <li>, <strong>, <em> - no buttons, images or styling

Return a structured analysis following the AnalysisResultSchema format, ensuring:
- Scores are justified with specific examples
- Tips focus on highest-impact changes first, must also include relevant examples
- Improved version maintains core message while implementing all critical fixes, and is in HTML format`;

        // Helper function to provide format-specific evaluation criteria
        function getFormatSpecificCriteria(task: string): string {
            // Let's analyze each task type and determine specific evaluation criteria
            const criteria = {
                'blog_post': 'SEO optimization, headline impact, content structure, internal linking strategy, readability score, content depth, keyword usage, meta description effectiveness',
                'captions': 'Hook strength, brevity, emoji usage, personality match, hashtag relevance, call-to-action placement, engagement prompt effectiveness',
                'email_marketing': 'Subject line open rate potential, preview text optimization, email flow, spam trigger avoidance, segmentation relevance, personalization elements',
                'flyer': 'Visual hierarchy, headline impact, information organization, white space usage, contact information placement, call-to-action visibility',
                'social_media': 'Platform tone alignment, character count optimization, hashtag strategy, engagement triggers, visual-text harmony, trend relevance',
                'story_scripts': 'Narrative flow, character development, emotional resonance, pacing, dialogue authenticity, scene transitions, story arc completion',
                'product_description': 'Feature-benefit balance, technical accuracy, SEO optimization, buying objection handling, specification clarity, comparative advantages'
            };

            return criteria[task as keyof typeof criteria] || 'Standard copywriting best practices including clarity, persuasion, and audience relevance';
        }

        console.log('Sending request to OpenAI...', new Date().getTime());

        const completion = await openai.beta.chat.completions.parse({
            model: model,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt(exercise, response) }
            ],
            response_format: zodResponseFormat(AnalysisResultSchema, "analysis_result"),
            temperature: 0.5,
        });
        const input_token_price = 0.00000015;
        const output_token_price = 0.0000006;
        console.log('OpenAI response received', completion.usage);
        console.log('OpenAI cost', `$${(completion.usage?.prompt_tokens! * input_token_price) + (completion.usage?.completion_tokens! * output_token_price).toFixed(10)}`);


        const parsedResult = completion.choices[0].message.parsed;
        if (!parsedResult) {
            throw new Error('Failed to parse OpenAI response');
        }
        const result: AnalysisResult = parsedResult;


        const overallScore = Object.values(result.scores).reduce((acc, curr) => acc + curr, 0) / Object.values(result.scores).length;
        console.log('Overall score:', overallScore);
        await addXP(userId, overallScore);

        const { error: insertError } = await supabaseAdmin
            .from('analysis_results')
            .insert([
                {
                    history_id: id,
                    result: result,
                }
            ]);

        if (insertError) {
            console.error('Error inserting analysis result:', insertError);
        }
        console.log('Sending response to client...');
        return NextResponse.json(result);

    } catch (error) {
        console.error('Error in POST route:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
