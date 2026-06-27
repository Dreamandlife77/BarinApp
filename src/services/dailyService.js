import API from "../config/api";

// get status
export const getDailyStatus = async () => {
  const res = await API.get("/daily/status");
  return res.data;
};

// claim reward
export const claimDailyReward = async () => {
  const res = await API.post("/daily/claim");
  return res.data;
};