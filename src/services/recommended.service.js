import api from "./api";

export const getRecommended = () => {
    return api.get("/recommendations");
};

export const getRecommendationsByPlat = (platId) => {
    return api.get(`/recommendations/${platId}`);
};

export const analyzePlatRecommendation = (platId) => {
    return api.post(`/recommendations/analyze/${platId}`);
};

export const deleteRecommendation = (recommendationId) => {
    return api.delete(`/recommendations/${recommendationId}`);
};
