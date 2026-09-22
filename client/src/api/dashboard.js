import api from "../lib/axios";
import { fetchWithCache, invalidateCache } from "../lib/cache";

export const getDashboard = async (force = false) => {
  return fetchWithCache(
    "dashboard_data",
    async () => {
      const { data } = await api.get("/dashboard");
      return data;
    },
    { ttl: 2 * 60 * 1000, force }
  );
};

export const invalidateDashboardCache = () => {
  invalidateCache("dashboard_data");
};