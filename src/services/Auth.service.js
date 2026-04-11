import api from "./api";

export const login = (email, password) => {
    return api.post("/login", { email, password });
};

export const me = () => {
    return api.get("/profile");
};

export const logout = () => {
    return api.post("/logout");
};

export const register = ({ name, email, password, password_confirmation, dietary_tags = [] }) => {
    return api.post("/register", {
        name,
        email,
        password,
        password_confirmation,
        dietary_tags,
    });
};
