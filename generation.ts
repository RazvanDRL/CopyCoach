import OpenAI from "openai";
const openai = new OpenAI();

const model = "gpt-4o-mini";

const niche = "weight loss";

const systemPrompt = `You are an expert at copywriting in the niche of ${niche}.`;

export async function generateText(prompt: string) {
    const response = await openai.chat.completions.create({
        model: model,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: prompt }
        ],
    });
    return response.choices[0].message.content;
}

generateText("What is the capital of France?").then((text) => {
    console.log(text);
});
