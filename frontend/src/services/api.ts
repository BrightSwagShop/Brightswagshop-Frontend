import { msalInstance } from "../Config/AuthConfig";

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const accounts = msalInstance.getAllAccounts();

  if (accounts.length === 0) {
    throw new Error("No user logged in");
  }

  const token = await msalInstance.acquireTokenSilent({
    account: accounts[0],
    scopes: ["api://YOUR_API_CLIENT_ID/.default"],
  });

  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token.accessToken}`,
      "Content-Type": "application/json",
    },
  });
};