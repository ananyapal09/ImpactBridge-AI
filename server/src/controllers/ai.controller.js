const openRouter = require("../config/openrouter");
const Campaign = require("../models/Campaign");

const {
  rankCampaigns,
} = require("../utils/tfidf");

// =====================================
// AI Chat About Campaign
// =====================================

const chatWithAI = async (req, res) => {
  try {
    const {
      campaignId,
      question,
    } = req.body;

    if (!campaignId || !question) {
      return res.status(400).json({
        success: false,
        message:
          "Campaign ID and question are required.",
      });
    }

    const campaign =
      await Campaign.findById(campaignId);

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found.",
      });
    }

    const prompt = `
You are an AI assistant for a crowdfunding platform called ImpactBridge.

Campaign Details:

Title: ${campaign.title}

Category: ${campaign.category}

Description:
${campaign.description}

Goal Amount: ₹${campaign.goalAmount}

Raised Amount: ₹${campaign.raisedAmount}

AI Verified: ${campaign.aiVerified}

Fraud Score: ${campaign.fraudScore}

AI Summary:
${campaign.aiSummary}

Suggestions:
${campaign.aiSuggestions.join(", ")}

User Question:
${question}

Answer professionally in under 150 words.
`;

    const result =
      await openRouter.post(
        "/chat/completions",
        {
          model:
            "openai/gpt-oss-20b:free",

          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }
      );

    const response =
      result.data.choices[0].message.content;

    return res.status(200).json({
      success: true,
      answer: response,
    });

  } catch (err) {
    console.error(
      err.response?.data ||
        err.message
    );

    return res.status(500).json({
      success: false,
      message:
        err.response?.data?.error
          ?.message ||
        err.message,
    });
  }
};

// =====================================
// AI Campaign Summary
// =====================================

const summarizeCampaign = async (
  req,
  res
) => {
  try {
    const { campaignId } =
      req.body;

    const campaign =
      await Campaign.findById(
        campaignId
      );

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found.",
      });
    }

    const prompt = `
Summarize this crowdfunding campaign in around 80 words.

Title:
${campaign.title}

Description:
${campaign.description}
`;

    const result =
      await openRouter.post(
        "/chat/completions",
        {
          model:
            "openai/gpt-oss-20b:free",

          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }
      );

    return res.status(200).json({
      success: true,

      summary:
        result.data.choices[0]
          .message.content,
    });

  } catch (err) {
    console.error(
      err.response?.data ||
        err.message
    );

    return res.status(500).json({
      success: false,
      message:
        err.response?.data?.error
          ?.message ||
        err.message,
    });
  }
};

// =====================================
// TF-IDF Campaign Recommendation
// =====================================

const recommendCampaign = async (
  req,
  res
) => {
  try {
    console.log(
      "========== TF-IDF RECOMMENDATIONS =========="
    );

    // Get active campaigns
    const campaigns =
      await Campaign.find({
        status: "active",
      }).lean();

    if (!campaigns.length) {
      return res.status(200).json({
        success: true,
        recommendations: [],
      });
    }

    console.log(
      `Found ${campaigns.length} active campaigns`
    );

    // =====================================
    // TF-IDF + Cosine Similarity
    // =====================================

    const rankedCampaigns =
      rankCampaigns(campaigns);

    console.log(
      "TF-IDF ranking generated"
    );

    // =====================================
    // Select Top 3
    // =====================================

    const topCampaigns =
      rankedCampaigns.slice(0, 3);

    // =====================================
    // Generate badges + reasons
    // =====================================

    const recommendations =
      topCampaigns.map(
        (campaign, index) => {
          let badge = "Best Impact";
          let reason =
            "Strong campaign relevance with good safety and impact signals.";

          const fraudScore =
            Number(
              campaign.fraudScore
            ) || 0;

          const goal =
            Number(
              campaign.goalAmount
            ) || 0;

          const raised =
            Number(
              campaign.raisedAmount
            ) || 0;

          const progress =
            goal > 0
              ? raised / goal
              : 0;

          // ---------------------------------
          // Badge logic
          // ---------------------------------

          if (fraudScore < 40) {
    badge = "High Risk";

    reason =
        "This campaign has a low safety score and requires additional donor caution.";
}

          else if (progress >= 0.8) {
            badge =
              "Almost Complete";

            reason =
              "This campaign is close to reaching its funding goal and could benefit from final contributions.";
          }

          else if (
            campaign.category ===
            "Healthcare" ||
            campaign.category ===
            "Disaster Relief"
          ) {
            badge = "Urgent";

            reason =
              "This campaign addresses an important social need with potentially urgent beneficiaries.";
          }

          else if (progress >= 0.4) {
            badge =
              "Fast Progress";

            reason =
              "This campaign is showing healthy fundraising progress toward its goal.";
          }

          // First recommendation gets
          // Best Impact if it is safe
          if (
            index === 0 &&
            fraudScore >=40 &&
            progress < 0.8
          ) {
            badge = "Best Impact";

            reason =
              "TF-IDF analysis found strong content relevance combined with favorable safety and impact signals.";
          }

          return {
            _id: campaign._id,

            title:
              campaign.title,

            category:
              campaign.category,

            goalAmount:
              campaign.goalAmount,

            raisedAmount:
              campaign.raisedAmount,

            fraudScore:
              campaign.fraudScore,

            badge,

            reason,

            // ---------------------------------
            // ML scores
            // ---------------------------------

            similarityScore:
              campaign.similarityScore,

            safetyScore:
              campaign.safetyScore,

            progressScore:
              campaign.progressScore,

            recommendationScore:
              campaign.finalScore,
          };
        }
      );

    console.log(
      "Top Recommendations:",
      recommendations.map(
        (item) => ({
          title: item.title,
          score:
            item.recommendationScore,
        })
      )
    );

    return res.status(200).json({
      success: true,

      algorithm:
        "TF-IDF + Cosine Similarity",

      recommendations,
    });

  } catch (err) {
    console.error(
      "Recommendation Error:",
      err
    );

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =====================================
// Exports
// =====================================

module.exports = {
  chatWithAI,
  summarizeCampaign,
  recommendCampaign,
};