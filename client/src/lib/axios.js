import axios from "axios";
import { toast } from "sonner";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Skip background auth check so visiting public pages doesn't throw a toast
        const isBackgroundAuth = error.config?.url?.includes("/auth/me");
        
        if (!isBackgroundAuth) {
            const message =
                error.response?.data?.message ||
                error.message ||
                "An unexpected error occurred.";
            toast.error(message);
        }

        return Promise.reject(error);
    }
);

export default api;