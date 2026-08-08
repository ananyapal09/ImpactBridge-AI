import axios from "axios";

const API = "http://localhost:3000/api/campaigns";

export const getAllCampaigns = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const getMyCampaigns = async (token) => {
  const res = await axios.get(`${API}/my-campaigns`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getCampaignById = async (id) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};

export const createCampaign = async (data, token) => {
  const res = await axios.post(API, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const updateCampaign = async (id, data, token) => {
  const res = await axios.put(`${API}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteCampaign = async (id, token) => {
  const res = await axios.delete(`${API}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};