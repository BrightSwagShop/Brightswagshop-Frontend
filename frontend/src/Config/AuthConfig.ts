import { PublicClientApplication } from "@azure/msal-browser";

const getCurrentOrigin = () => {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }

  return "http://localhost:5173";
};

const toAbsoluteUrl = (value: string | undefined, fallbackPath: string) => {
  const fallbackUrl = new URL(fallbackPath, getCurrentOrigin()).toString();

  if (!value || !value.trim()) {
    return fallbackUrl;
  }

  try {
    return new URL(value.trim()).toString();
  } catch {
    return fallbackUrl;
  }
};

const getFrontendBaseUrl = () => {
  return toAbsoluteUrl(import.meta.env.VITE_FRONTEND_URL, "/").replace(/\/$/, "");
};

const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
    redirectUri: toAbsoluteUrl(import.meta.env.VITE_AZURE_REDIRECT_URI, "/auth/callback"),
    postLogoutRedirectUri: `${getFrontendBaseUrl()}/login`,
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