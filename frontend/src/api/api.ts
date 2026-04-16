import axios from "axios";
import { msalInstance } from "../Config/AuthConfig";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  const jwtToken = localStorage.getItem("token");

  if (jwtToken) {
    config.headers.Authorization = `Bearer ${jwtToken}`;
    return config;
  }

  const accounts = msalInstance.getAllAccounts();

  if (accounts.length > 0) {
    try {
      const tokenResponse = await msalInstance.acquireTokenSilent({
        account: accounts[0],
        scopes: [
          `api://${import.meta.env.VITE_API_CLIENT_ID}/access_as_user`,
        ],
      });

      config.headers.Authorization = `Bearer ${tokenResponse.accessToken}`;
    } catch (error) {
      console.error("Token error", error);
    }
  }

  return config;
});

export default api;