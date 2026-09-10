import api from "../lib/axios"; 

export const getHistory = async () => {
  const response = await api.get("/history", {
    withCredentials: true,
  });

  return response.data;
};

export const saveHistory = async (historyData) => {
  const response = await api.post("/history", historyData, {
    withCredentials: true,
  });

  return response.data;
};