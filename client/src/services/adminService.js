import api from "../utils/axios";

export const getDashboard = async (token) => {
  const res = await api.get("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getPendingNGOs = async (token) => {
  const res = await api.get("/admin/pending-ngos", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const approveNGO = async (id, token) => {
  const res = await api.put(
    `/admin/approve/${id}`,
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
  const res = await api.delete(`/admin/reject/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getAllCampaignsAdmin = async (token) => {
  const res = await api.get("/admin/campaigns", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const deleteCampaignAdmin = async (id, token) => {
  const res = await api.delete(`/admin/campaign/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getAllUsers = async (token) => {
  const res = await api.get("/admin/users", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getAllDonations = async (token) => {
  const res = await api.get("/admin/donations", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const getAnalytics = async (token) => {
  const res = await api.get("/admin/analytics", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
