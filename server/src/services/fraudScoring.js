function calculateFraudScore(campaign, ngo) {
  let score = 50;

  const breakdown = [];

  // NGO Verified
  if (ngo.user.isVerified) {
    score += 20;
    breakdown.push({
      factor: "Verified NGO",
      impact: "+20",
      status: "positive",
    });
  } else {
    score -= 20;
    breakdown.push({
      factor: "NGO Not Verified",
      impact: "-20",
      status: "negative",
    });
  }

  // Description Length
  if (campaign.description.length >= 200) {
    score += 10;
    breakdown.push({
      factor: "Detailed Description",
      impact: "+10",
      status: "positive",
    });
  } else {
    score -= 15;
    breakdown.push({
      factor: "Very Short Description",
      impact: "-15",
      status: "negative",
    });
  }

  // Website
  if (ngo.website && ngo.website.trim() !== "") {
    score += 10;
    breakdown.push({
      factor: "Official Website",
      impact: "+10",
      status: "positive",
    });
  } else {
    score -= 10;
    breakdown.push({
      factor: "Website Missing",
      impact: "-10",
      status: "negative",
    });
  }

  // Address
  if (
    ngo.address &&
    ngo.address !== "Not Updated"
  ) {
    score += 10;
    breakdown.push({
      factor: "Verified Address",
      impact: "+10",
      status: "positive",
    });
  } else {
    score -= 10;
    breakdown.push({
      factor: "Address Missing",
      impact: "-10",
      status: "negative",
    });
  }

  // Goal Amount
  if (campaign.goalAmount > 1000000) {
    score -= 10;
    breakdown.push({
      factor: "Very High Goal Amount",
      impact: "-10",
      status: "negative",
    });
  } else {
    score += 5;
    breakdown.push({
      factor: "Reasonable Goal",
      impact: "+5",
      status: "positive",
    });
  }

  // Deadline
  const days =
    (new Date(campaign.deadline) - new Date()) /
    (1000 * 60 * 60 * 24);

  if (days < 7) {
    score -= 10;
    breakdown.push({
      factor: "Very Short Deadline",
      impact: "-10",
      status: "negative",
    });
  } else {
    score += 5;
    breakdown.push({
      factor: "Reasonable Deadline",
      impact: "+5",
      status: "positive",
    });
  }

  score = Math.max(0, Math.min(100, score));

  let riskLevel = "Low";

  if (score < 40) riskLevel = "High";
  else if (score < 70) riskLevel = "Medium";

  return {
    fraudScore: score,
    riskLevel,
    breakdown,
  };
}

module.exports = calculateFraudScore;