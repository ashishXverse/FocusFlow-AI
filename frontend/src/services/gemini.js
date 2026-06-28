import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export async function analyzeTasks(tasks) {
  const prompt = `
You are an expert AI Productivity Coach.

Analyze these tasks:

${JSON.stringify(tasks, null, 2)}

Return ONLY valid JSON.

Use exactly this format:

{
  "priorityTask": "",
  "reason": "",
  "estimatedHours": "",
  "productivityScore": "",
  "riskLevel": "",
  "tip": "",
  "schedule": [
    {
      "time": "",
      "task": ""
    }
  ]
}

Rules:
- Do NOT explain anything.
- Do NOT use markdown.
- Do NOT wrap the JSON inside \`\`\`.
- Return ONLY valid JSON.
`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let text = response.text;

    // Remove markdown if Gemini accidentally returns it
    text = text.replace(/```json/g, "");
    text = text.replace(/```/g, "");

    return JSON.parse(text);

  } catch (error) {
    console.error(error);

    return {
      priorityTask: "Unable to Analyze",
      reason: "Something went wrong.",
      estimatedHours: "-",
      productivityScore: "-",
      riskLevel: "-",
      tip: "Please try again.",
      schedule: [],
    };
  }
}