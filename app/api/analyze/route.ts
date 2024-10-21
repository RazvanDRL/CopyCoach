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
        overallScore: z.number(),
    }),
    improvement: z.object({
        tips: z.string(),
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

        const userPrompt = (exercise: Exercise, response: string) => `
You are an expert copywriting evaluator and coach. Your task is to evaluate the following copywriting response, providing clear, balanced feedback in JSON format. The evaluation must include:

1. Scores (0-10) for: clarity, audience relevance, persuasiveness, structure, grammar, tone, attention-grabbing, consistency, emotional appeal, CTA effectiveness, and overall score (calculated as the accurate median of the 10 scores).

   - The median score should be the middle value when the scores are arranged in numerical order. If there are two middle numbers, the median is the average of those two numbers.

2. Improvement Tips:
    - Include positive feedback for any category where the score is 8 or above, and explain why the copy performed well in that category.
    - For scores below 8, provide constructive tips on how to improve.
    - Congratulate the user on areas where they scored well, and clearly explain the strengths of the copy.
    - For categories that scored below 8, provide clear and actionable advice for improvement.
    - Structure the feedback clearly: start with Strengths first, followed by Improvement Tips.

    Improvement Tips format:
    Strengths: 
      - <strong>Clarity (Score: 9)</strong>: Your copy is clear and easy to understand, which is essential for keeping your audience engaged. The simplicity of your language ensures the message is conveyed effectively. <br>
    <br>
    Improvement Tips:
      - <strong>Persuasiveness (Score: 6)</strong>: While your points are strong, adding a more emotional appeal could make the copy more persuasive. Consider using phrases like “imagine how much time you could save” to create a connection with the reader.

3. Revised version:
    - Rewrite the response using your own expert-level copywriting skills.
    - Ensure that the revised version reflects the specific tips provided in the expert feedback, especially addressing any areas of improvement.
    - If the original copy had strong points, preserve those strengths in the revised version and emphasize the improvements.

Exercise: ${exercise}
Response: ${response}
`;
        const systemPrompt = `You are a highly skilled copywriting evaluator and coach. Use understandable language by a beginner and be realistic. Always provide scores and feedback for copywriting exercises. When a score is 8 or higher, you must congratulate the user and provide specific reasons why the copy is strong in that category. For lower scores, provide detailed improvement suggestions. Ensure all feedback is constructive, balanced, and actionable. Make sure to use HTML tags to format the tips and improvedVersion.`;


        console.log('Sending request to OpenAI...', new Date().getTime());

        const completion = await openai.beta.chat.completions.parse({
            model: model,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt(exercise, response) }
            ],
            response_format: zodResponseFormat(AnalysisResultSchema, "analysis_result"),
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
        await addXP(userId, result.scores.overallScore);

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