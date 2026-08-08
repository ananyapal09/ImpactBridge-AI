import api from "../utils/axios";

export const getVerifiedNGOs = async () => {
  const res = await api.get("/ngos");
  return res.data;
};
