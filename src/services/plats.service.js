import api from "./api";

export const getPlats = ({ page = 1, search = "" ,per_page = 4}) => {
    return api.get("/plats", {
        params: {
        page,
        search,
        per_page,
        },
    });
};

export const getPlatById = (platId) => {
    return api.get(`/plats/${platId}`);
};
