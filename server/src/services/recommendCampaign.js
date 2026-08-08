const openRouter = require("../config/openrouter");

async function generateRecommendation(campaign) {
  try {
    const prompt = `
You are an AI donation advisor.

Analyze this NGO campaign and respond ONLY with valid JSON.

Campaign Title:
${campaign.title}

Category:
${campaign.category}

Description:
${campaign.description}

Goal Amount:
₹${campaign.goalAmount}

Raised Amount:
₹${campaign.raisedAmount}

Fraud Score:
${campaign.fraudScore}

Return exactly this format:

{
  "reason":"One short sentence explaining why donors should support this campaign.",
  "badge":"High Impact"
}
`;

    const result = await openRouter.post("/chat/completions", {
      model: "openai/gpt-oss-20b:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
    });

    let text = result.data.choices[0].message.content;

    console.log("LLM RESPONSE:");
    console.log(text);

    // Remove markdown if present
    text = text
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // Extract JSON even if extra text exists
    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start !== -1 && end !== -1) {
      text = text.substring(start, end + 1);
    }

    const parsed = JSON.parse(text);

    return {
      reason:
        parsed.reason ||
        "This campaign appears trustworthy and impactful.",
      badge:
        parsed.badge ||
        "Recommended",
    };

  } catch (err) {

    console.log("AI Recommendation Error");
    console.log(err.response?.data || err.message);

    return {
      reason:
        "This campaign appears trustworthy and suitable for donations.",
      badge: "Recommended",
    };
  }
}

module.exports = generateRecommendation;