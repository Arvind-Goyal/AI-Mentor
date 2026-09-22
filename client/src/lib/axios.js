import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  timeout: 15000, // 15-second safety timeout
});

// Avoid spamming identical toasts in rapid succession
const lastToastTimes = new Map();
const showThrottledToast = (message) => {
  const now = Date.now();
  const lastTime = lastToastTimes.get(message) || 0;
  if (now - lastTime > 2500) {
    lastToastTimes.set(message, now);
    toast.error(message);
  }
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Skip background auth check so visiting public pages doesn't throw a toast
    const isBackgroundAuth = error.config?.url?.includes("/auth/me");
    if (isBackgroundAuth) {
      return Promise.reject(error);
    }

    let message = "An unexpected error occurred.";

    if (error.code === "ECONNABORTED" || error.message?.includes("timeout")) {
      message = "Request timed out. Please check your connection.";
    } else if (error.message === "Network Error" || !error.response) {
      message = "Unable to reach server. Please check your network connection.";
    } else if (error.response) {
      const status = error.response.status;
      const serverMessage = error.response.data?.message;

      if (serverMessage && typeof serverMessage === "string") {
        message = serverMessage;
      } else if (status === 400) {
        message = "Invalid request. Please check your inputs.";
      } else if (status === 401) {
        message = "Session expired. Please log in again.";
      } else if (status === 403) {
        message = "Access denied. You do not have permission for this action.";
      } else if (status === 404) {
        message = "Requested resource was not found.";
      } else if (status === 429) {
        message = "Too many requests. Please wait a moment before trying again.";
      } else if (status >= 500) {
        message = "Server is currently experiencing issues. Please try again shortly.";
      }
    }

    showThrottledToast(message);
    return Promise.reject(error);
  }
);

export default api;