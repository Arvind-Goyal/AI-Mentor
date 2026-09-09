import axios from "axios";

const API_URL = "http://localhost:5000/api/history";

export const getHistory = async () => {
  const response = await axios.get(API_URL, {
    withCredentials: true,
  });

  return response.data;
};

export const saveHistory = async (historyData) => {
  const response = await axios.post(
    API_URL,
    historyData,
    {
      withCredentials: true,
    }
  );

  return response.data;
};