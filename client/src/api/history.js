import api from "../lib/axios"; 
import { fetchWithCache, invalidateCache } from "../lib/cache";

export const getHistory = async (force = false) => {
  return fetchWithCache(
    "user_history",
    async () => {
      const response = await api.get("/history", {
        withCredentials: true,
      });
      return response.data;
    },
    { ttl: 2 * 60 * 1000, force }
  );
};

export const saveHistory = async (historyData) => {
  const response = await api.post("/history", historyData, {
    withCredentials: true,
  });

  // Invalidate history and dashboard caches so fresh data is loaded
  invalidateCache("user_history");
  invalidateCache("dashboard_data");

  return response.data;
};

export const invalidateHistoryCache = () => {
  invalidateCache("user_history");
};