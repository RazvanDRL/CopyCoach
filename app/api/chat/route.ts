import OpenAI from 'openai';
import { supabaseAdmin } from '@/lib/supabaseAdmin';
import { NextResponse } from 'next/server';
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";

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

// Create a new ratelimiter, that allows 5 requests per 60 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(5, "60 s"),
    analytics: true,
});

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

        const prompt = `
You are an expert copywriting evaluator. Analyze the given response to the copywriting exercise below. Provide a thorough evaluation in JSON format, including:

1. Scores (0-10) for: clarity, audience relevance, persuasiveness, structure, grammar, tone, attention-grabbing, consistency, emotional appeal, CTA effectiveness, and overall score (the median of all scores).

2. Improvement tips: Actionable, bulleted advice, with specific examples, for enhancing the copy.

3. Improved version: Rewrite the response to demonstrate expert-level copywriting.

Exercise: ${exercise}
Response: ${response}

Ensure your feedback is very detailed, incredibly constructive, and exactlytailored to the specific exercise and response. Focus solely on evaluating the text content and never mention non-text elements like images, banners, or other visual elements.`;

        console.log('Sending request to OpenAI...');
        console.log('Current timestamp:', new Date().getTime());

        const completion = await openai.beta.chat.completions.parse({
            model: "gpt-4o",
            messages: [
                { role: "system", content: "You are a copywriting analysis AI. Your task is to evaluate copywriting and provide scores and improvement tips. You must provide a score for each category and provide detailed explanations in the tips and improvedVersion fields." },
                { role: "user", content: prompt }
            ],
            response_format: zodResponseFormat(AnalysisResultSchema, "analysis_result"),
        });

        // console.log('OpenAI response received:', completion);

        const parsedResult = completion.choices[0].message.parsed;
        if (!parsedResult) {
            throw new Error('Failed to parse OpenAI response');
        }
        const result: AnalysisResult = parsedResult;

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
            // Proceed without interrupting the response
        }

        // console.log('Parsed result:', result);

        console.log('Sending response to client...');
        return NextResponse.json(result);

    } catch (error) {
        console.error('Error in POST route:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
