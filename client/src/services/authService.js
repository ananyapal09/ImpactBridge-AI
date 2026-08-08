import api from "../utils/axios";

export const login = async (data) => {
    const response = await api.post("/auth/login", data);
    return response.data;
};

export const register = async (data) => {
    const response = await api.post("/auth/register", data);
    return response.data;
};

// ================= PROFILE =================

export const getProfile = async () => {
    const response = await api.get("/users/profile");
    return response.data;
};

export const updateProfile = async (data) => {
    const response = await api.put("/users/profile", data);
    return response.data;
};

// ================= PASSWORD =================

export const changePassword = async (data) => {
    const response = await api.put(
        "/users/change-password",
        data
    );

    return response.data;
};