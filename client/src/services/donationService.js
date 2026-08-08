import api from "../utils/axios";

// Create Razorpay Order
export const createOrder = async (
  campaignId,
  amount,
  token
) => {
  const res = await api.post(
    "/donations/create-order",
    {
      campaignId,
      amount,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// Verify Payment
export const verifyPayment = async (
  data,
  token
) => {
  const res = await api.post(
    "/donations/verify",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// Get Logged-in User Donations
export const getMyDonations = async (token) => {
  const res = await api.get(
    "/donations/my",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

// Download Donation Certificate
export const downloadCertificate = async (donationId) => {
  const token = localStorage.getItem("token");

  const res = await api.get(
    `/donations/${donationId}/certificate`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
    }
  );

  return res.data;
};
