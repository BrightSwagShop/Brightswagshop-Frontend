import { PublicClientApplication } from "@azure/msal-browser";

const getCurrentOrigin = () => {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }

  return import.meta.env.VITE_FRONTEND_URL || "http://localhost:5173";
};

const getRedirectUri = () => {
  return (
    import.meta.env.VITE_AZURE_REDIRECT_URI ||
    `${getCurrentOrigin()}/auth/callback`
  );
};

const getPostLogoutRedirectUri = () => {
  return import.meta.env.VITE_FRONTEND_URL || getCurrentOrigin();
};

const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
    redirectUri: getRedirectUri(),
    postLogoutRedirectUri: `${getPostLogoutRedirectUri()}/login`, 
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const loginRequest = {
  scopes: ["openid", "profile", "email", `api://${import.meta.env.VITE_API_CLIENT_ID}/access_as_user`],
};