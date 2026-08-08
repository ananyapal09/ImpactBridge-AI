const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateAISummary(campaign) {
  try {
    const prompt = `
You are an AI system evaluating an NGO fundraising campaign.

Analyze the campaign below and return ONLY valid JSON.

Campaign Title:
${campaign.title}

Category:
${campaign.category}

Description:
${campaign.description}

Goal Amount:
₹${campaign.goalAmount}

Return exactly this JSON structure:

{
  "summary": "A concise summary of the campaign.",
  "beneficiaries": "Who will benefit from this campaign.",
  "urgency": "How urgent the campaign appears and why.",
  "trustAssessment": "An assessment of transparency and donor trust based ONLY on the information provided.",
  "suggestions": [
    "Suggestion 1",
    "Suggestion 2",
    "Suggestion 3"
  ]
}

Do not use markdown.
Do not use code fences.
Return only JSON.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    const text = response.text;

    console.log("Gemini Raw Response:", text);

    // Remove accidental markdown fences if Gemini adds them
    const cleanedText = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanedText);

  } catch (error) {
    console.error("Gemini AI Error:", error);

    return {
      summary: "AI summary unavailable.",
      beneficiaries: "",
      urgency: "",
      trustAssessment: "",
      suggestions: [],
    };
  }
}

module.exports = generateAISummary;