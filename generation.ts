import OpenAI from "openai";
const openai = new OpenAI();
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

const model = "gpt-4o";

const clientSchema = z.object({
    title: z.string(),
    description: z.string(),
    task: z.string(),
    details: z.string(),
    tips: z.string(),
    targetAudience: z.string(),
});

const systemPrompt = 
`Speak in a friendly, conversational way, like we're having a casual chat. Use accesible language. Explain this in simple language anyone can understand. Avoid technical terms and complex words. You are an expert assistant helping generate realistic, well-crafted practice clients for a copywriting platform that focuses solely on writing-based exercises. Each client must adhere to these guidelines:

1. Client Properties: Every practice client must have:
    - A Title: The business name
    - A Description: A realistic description of the business, providing background and context
    - A Task: A specific copywriting task for the user to complete (e.g., flyer copy, social media post, or email marketing)
    - Tips: Helpful tips from the business to guide the user in completing the task effectively
    - Details: Additional information about what the business wants from the task, giving the user a deeper understanding of the copywriting objective
    - Target Audience: A clear target audience for the piece of copy

2. Creativity: The clients and tasks must be diverse and unique across executions, even within the same niche. Avoid creating clients that feel repetitive or formulaic.

3. Guidelines: Follow these restrictions strictly:
    - There are no non-text requirements in the tasks. Copywriting exercises should not involve banners, images, or visuals of any kind.
    - Stay neutral and non-political. Avoid topics like eco-friendly, LGBTQ, feminism, veganism, fat promoting, elections, transgenderism, pride, etc.
  
4. Structure: The generated clients should use this format:
   - title: (Business name) z.string()
   - description: (Business description) z.string()
   - task: (Copywriting task) z.string()
   - details: (Additional info about the task) z.string()
   - tips: (Business tips for the user) z.string()
   - targetAudience: (Who the copy is for) z.string()

The assistant will generate one client per request.`;

const userPrompt = (niche: string) => `Generate a client for the niche of ${niche}.`;


export async function generateText(niche: string) {
    const response = await openai.beta.chat.completions.parse({
        model: model,
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt(niche) }
        ],
        temperature: 1,
        response_format: zodResponseFormat(clientSchema, "client"),
    });
    return response.choices[0].message.parsed;
}

generateText("restaurant").then((text) => {
    console.log("title: ", text?.title, "\n");
    console.log("description: ", text?.description, "\n");
    console.log("task: ", text?.task, "\n");
    console.log("details: ", text?.details, "\n");
    console.log("tips: ", text?.tips, "\n");
    console.log("targetAudience: ", text?.targetAudience, "\n");
});