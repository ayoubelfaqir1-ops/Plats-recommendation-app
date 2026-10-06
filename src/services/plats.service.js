import api from "./api";

export const getPlats = ({
    page = 1,
    search = "",
    category_id = null,
    per_page = 6,
}) => {
    const params = { page, per_page };
    if (search) params.search = search;
    if (category_id) params.category_id = category_id;

    return api.get("/plats", { params });
};

export const getPlatById = (platId) => {
    return api.get(`/plats/${platId}`);
};

export const createPlat = (platData) => {
    return api.post("/plats", platData);
};

export const updatePlat = (platId, platData) => {
    return api.put(`/plats/${platId}`, platData);
};

export const deletePlat = (platId) => {
    return api.delete(`/plats/${platId}`);
};

export const uploadPlatImage = (platId, formData) => {
    return api.post(`/plats/${platId}/image`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
