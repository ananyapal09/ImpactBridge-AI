// ============================================================
// TF-IDF + COSINE SIMILARITY
// ============================================================

function tokenize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2);
}

// ------------------------------------------------------------
// Create TF-IDF vectors
// ------------------------------------------------------------

function createTfIdf(documents) {
  const tokenizedDocs = documents.map(tokenize);

  const vocabulary = [
    ...new Set(tokenizedDocs.flat()),
  ];

  const documentFrequency = {};

  vocabulary.forEach((word) => {
    documentFrequency[word] =
      tokenizedDocs.filter((doc) =>
        doc.includes(word)
      ).length;
  });

  const vectors = tokenizedDocs.map((doc) => {
    const vector = {};

    vocabulary.forEach((word) => {
      const termFrequency =
        doc.length > 0
          ? doc.filter(
              (item) => item === word
            ).length / doc.length
          : 0;

      const inverseDocumentFrequency =
        Math.log(
          documents.length /
            (1 + documentFrequency[word])
        );

      vector[word] =
        termFrequency *
        inverseDocumentFrequency;
    });

    return vector;
  });

  return {
    vocabulary,
    vectors,
  };
}

// ------------------------------------------------------------
// Cosine Similarity
// ------------------------------------------------------------

function cosineSimilarity(vectorA, vectorB) {
  const words = new Set([
    ...Object.keys(vectorA),
    ...Object.keys(vectorB),
  ]);

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  words.forEach((word) => {
    const a = vectorA[word] || 0;
    const b = vectorB[word] || 0;

    dotProduct += a * b;
    magnitudeA += a * a;
    magnitudeB += b * b;
  });

  if (
    magnitudeA === 0 ||
    magnitudeB === 0
  ) {
    return 0;
  }

  return (
    dotProduct /
    (Math.sqrt(magnitudeA) *
      Math.sqrt(magnitudeB))
  );
}

// ------------------------------------------------------------
// Rank Campaigns
// ------------------------------------------------------------

function rankCampaigns(campaigns) {
  if (!campaigns.length) {
    return [];
  }

  // Create searchable text for every campaign
  const documents = campaigns.map(
    (campaign) =>
      `${campaign.title || ""} ${
        campaign.category || ""
      } ${
        campaign.description || ""
      }`
  );

  /*
    Since the current frontend doesn't collect
    donor preferences, we create an overall
    campaign-interest profile from the active
    campaign corpus.

    Later we can replace this with actual
    donor preferences/history.
  */

  const query = campaigns
    .map(
      (campaign) =>
        `${campaign.category || ""} ${
          campaign.description || ""
        }`
    )
    .join(" ");

  const allDocuments = [
    ...documents,
    query,
  ];

  const { vectors } =
    createTfIdf(allDocuments);

  const queryVector =
    vectors[vectors.length - 1];

  const scoredCampaigns =
    campaigns.map((campaign, index) => {
      const similarity =
        cosineSimilarity(
          vectors[index],
          queryVector
        );

      // ------------------------------------------------------
      // Campaign Progress
      // ------------------------------------------------------

      const goal =
        Number(campaign.goalAmount) || 0;

      const raised =
        Number(campaign.raisedAmount) || 0;

      const progress =
        goal > 0
          ? Math.min(raised / goal, 1)
          : 0;

      // ------------------------------------------------------
      // Safety Score
      // ------------------------------------------------------

      const fraudScore =
        Number(campaign.fraudScore) || 0;

      const safetyScore =
        Math.max(
          0,
          1 - fraudScore / 100
        );

      // ------------------------------------------------------
      // Final Recommendation Score
      //
      // TF-IDF relevance = 60%
      // Safety            = 25%
      // Progress          = 15%
      // ------------------------------------------------------

      const finalScore =
        similarity * 0.60 +
        safetyScore * 0.25 +
        progress * 0.15;

      return {
        ...campaign,

        similarityScore:
          Number(
            similarity.toFixed(4)
          ),

        safetyScore:
          Number(
            safetyScore.toFixed(4)
          ),

        progressScore:
          Number(
            progress.toFixed(4)
          ),

        finalScore:
          Number(
            finalScore.toFixed(4)
          ),
      };
    });

  return scoredCampaigns.sort(
    (a, b) =>
      b.finalScore -
      a.finalScore
  );
}

module.exports = {
  tokenize,
  createTfIdf,
  cosineSimilarity,
  rankCampaigns,
};