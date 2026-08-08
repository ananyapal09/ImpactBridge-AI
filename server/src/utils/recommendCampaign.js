const openRouter = require("../config/openrouter");

async function recommendCampaign(campaign) {
  try {
    const fraudScore = Number(campaign.fraudScore) || 0;

    const goal = Number(campaign.goalAmount) || 0;
    const raised = Number(campaign.raisedAmount) || 0;

    const progress = goal > 0 ? raised / goal : 0;

    let badge = "Best Impact";
    let reason =
      "This campaign has a clear objective, transparent funding goal, and strong potential for meaningful social impact.";

    // Fraud score:
    // 0–39  = High Risk
    // 40–69 = Medium Risk
    // 70–100 = Low Risk

    if (fraudScore < 40) {
      badge = "High Risk";
      reason =
        "This campaign has a low safety score and requires additional donor caution.";
    } else if (progress >= 0.8) {
      badge = "Almost Complete";
      reason =
        "This campaign is close to reaching its funding goal and could benefit from final contributions.";
    } else if (
      campaign.category === "Healthcare" ||
      campaign.category === "Disaster Relief"
    ) {
      badge = "Urgent";
      reason =
        "This campaign addresses an important social need that may require timely support.";
    } else if (progress >= 0.4) {
      badge = "Fast Progress";
      reason =
        "This campaign is showing healthy fundraising progress toward its goal.";
    } else if (fraudScore >= 70) {
      badge = "Best Impact";
      reason =
        "This campaign has a strong safety score and clear potential for meaningful social impact.";
    } else {
      badge = "Best Impact";
      reason =
        "This campaign has a reasonable safety score and a clear social impact objective.";
    }

    return {
      badge,
      reason,
    };
  } catch (err) {
    console.log(
      "Recommendation Error:",
      err.response?.data || err.message
    );

    return {
      badge: "Best Impact",
      reason:
        "This campaign has a clear objective, transparent funding goal, and strong potential for meaningful social impact.",
    };
  }
}

module.exports = recommendCampaign;