import apiClient from "./axiosInstance";

export const fetchWithAuth = async (url: string) => {
  return apiClient.get(url);
};