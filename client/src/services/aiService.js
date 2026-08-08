import axios from "axios";

const API = "http://localhost:3000/api/ai";

export const chatWithAI = async (
  campaignId,
  question,
  token
) => {
  const res = await axios.post(
    `${API}/chat`,
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

export const getAISummary = async (
  campaignId
) => {
  const res = await axios.post(
    `${API}/summary`,
    {
      campaignId,
    }
  );

  return res.data;
};

export const getRecommendations = async () => {
  const res = await axios.get(
    `${API}/recommendations`
  );

  return res.data;
};