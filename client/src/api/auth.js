import api from "../lib/axios";

export const signup = async (userData) => {
    const { data } = await api.post("/auth/signup", userData);
    return data;
};

export const login = async (credentials) => {
    const { data } = await api.post("/auth/login", credentials);
    return data;
};

export const logout = async () => {
    const { data } = await api.post("/auth/logout");
    return data;
};

export const getCurrentUser = async () => {
    const { data } = await api.get("/auth/me");
    return data;
};

export const requestPasswordReset = async (email) => {
    const { data } = await api.post("/auth/forgot-password", { email });
    return data;
};

export const resetPassword = async (token, password) => {
    const { data } = await api.post("/auth/reset-password", { token, password });
    return data;
};