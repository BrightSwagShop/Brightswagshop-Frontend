import axios from "axios";
import { msalInstance } from "../Config/AuthConfig";

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

//  interceptor
apiClient.interceptors.request.use(
  async (config) => {
    const accounts = msalInstance.getAllAccounts();

    if (accounts.length > 0) {
      try {
        const tokenResponse = await msalInstance.acquireTokenSilent({
          account: accounts[0],
          scopes: [
            `api://${import.meta.env.VITE_API_CLIENT_ID}/access_as_user`,
          ],
        });
        console.log(tokenResponse.accessToken);

        config.headers.Authorization = `Bearer ${tokenResponse.accessToken}`;
      } catch (error) {
        console.error("Token error", error);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;