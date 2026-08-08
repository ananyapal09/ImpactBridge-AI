const openRouter = require("../config/openrouter");

async function verifyCampaign(description) {
  try {
    const prompt = `
You are an NGO verification assistant.

Analyze this campaign.

Campaign:
${description}

Return ONLY valid JSON in this format:

{
  "aiVerified": true,
  "fraudScore": 15,
  "aiSummary": "One line summary",
  "aiSuggestions": [
    "Suggestion 1",
    "Suggestion 2"
  ]
}
`;

    const response = await openRouter.post("/chat/completions", {
      model: "openai/gpt-oss-20b:free",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const text =
      response.data.choices[0].message.content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(text);

  } catch (err) {
    console.log(err.response?.data || err.message);

    return {
      aiVerified: false,
      fraudScore: 100,
      aiSummary: "AI verification failed.",
      aiSuggestions: [],
    };
  }
}

module.exports = verifyCampaign;