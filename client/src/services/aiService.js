import api from "../utils/axios";

export const chatWithAI = async (
  campaignId,
  question,
  token
) => {
  const res = await api.post(
    "/ai/chat",
    {
      campaignId,
      question,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getAISummary = async (campaignId) => {
  const res = await api.post(
    "/ai/summary",
    {
      campaignId,
    }
  );

  return res.data;
};

export const getRecommendations = async () => {
  const res = await api.get("/ai/recommendations");

  return res.data;
};
