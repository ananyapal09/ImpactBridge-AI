import axios from "axios";

const API = "http://localhost:3000/api/admin";

export const getDashboard = async (token) => {
  const res = await axios.get(`${API}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getPendingNGOs = async (token) => {
  const res = await axios.get(`${API}/pending-ngos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const approveNGO = async (id, token) => {
  const res = await axios.put(
    `${API}/approve/${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
export const rejectNGO = async (id, token) => {
  const res = await axios.delete(
    `${API}/reject/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
export const getAllCampaignsAdmin = async (token) => {
  const res = await axios.get(`${API}/campaigns`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
export const deleteCampaignAdmin = async (id, token) => {
  const res = await axios.delete(
    `${API}/campaign/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
export const getAllUsers = async (token) => {
  const res = await axios.get(
    `${API}/users`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
export const getAllDonations = async (token) => {
  const res = await axios.get(
    `${API}/donations`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};
export const getAnalytics = async (token) => {
  const res = await axios.get(
    `${API}/analytics`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};