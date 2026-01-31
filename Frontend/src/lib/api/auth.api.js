import api from "./index";

export const authAPI = {
    login: async (email, password) => {
        return api.post("/auth/login", { email, password });
    },
    register: async (userData) => {
        return api.post("/auth/register", userData);
    },
    me: async () => {
        return api.get(`/auth/me?_t=${Date.now()}`);
    },
    getMe: async () => {
        return api.get(`/auth/me?_t=${Date.now()}`);
    },
    logout: async () => {
        return api.post("/auth/logout");
    },
    changePassword: async (passwordData) => {
        return api.post("/auth/change-password", passwordData);
    }
};
