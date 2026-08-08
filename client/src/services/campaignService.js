import api from "../utils/axios";

export const getAllCampaigns = async () => {
  const res = await api.get("/campaigns");
  return res.data;
};

export const getMyCampaigns = async (token) => {
  const res = await api.get("/campaigns/my-campaigns", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getCampaignById = async (id) => {
  const res = await api.get(`/campaigns/${id}`);
  return res.data;
};

export const createCampaign = async (data, token) => {
  const res = await api.post("/campaigns", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateCampaign = async (id, data, token) => {
  const res = await api.put(`/campaigns/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteCampaign = async (id, token) => {
  const res = await api.delete(`/campaigns/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
