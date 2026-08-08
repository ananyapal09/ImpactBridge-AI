import axios from "axios";

const API = "http://localhost:3000/api/ngos";

export const getVerifiedNGOs = async () => {
  const res = await axios.get(API);
  return res.data;
};