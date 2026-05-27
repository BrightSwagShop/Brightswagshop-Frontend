import axios from "axios";
import { msalInstance, msalReady } from "../Config/AuthConfig";
import { getApiBaseUrl } from "../Config/apiBaseUrl";

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  // If a local JWT is present, use it immediately (normal username/password flow).
  const jwtToken = localStorage.getItem("token");

  if (jwtToken) {
    config.headers.Authorization = `Bearer ${jwtToken}`;
    return config;
  }

  // Public auth endpoints (login/register) should not wait for MSAL or try to acquire tokens.
  const url = config.url || "";
  if (url.includes("/api/users/login") || url.includes("/api/users/register")) {
    return config;
  }

  // For other requests, wait for MSAL to initialize then try to acquire a token silently.
  await msalReady;

  const accounts = msalInstance.getAllAccounts();

  if (accounts.length > 0) {
    try {
      const tokenResponse = await msalInstance.acquireTokenSilent({
        account: accounts[0],
        scopes: [`api://${import.meta.env.VITE_API_CLIENT_ID}/access_as_user`],
      });

      config.headers.Authorization = `Bearer ${tokenResponse.accessToken}`;
    } catch (error) {
      console.error("Token error", error);
    }
  }

  return config;
});

export default api;
