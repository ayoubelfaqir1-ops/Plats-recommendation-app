import api from "./api";

export const getProfile = () => {
  return api.get("/profile");
};

export const updateProfile = (profileData) => {
  return api.patch("/profile", profileData);
};
