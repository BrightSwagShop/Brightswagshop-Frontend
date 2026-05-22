import { PublicClientApplication } from "@azure/msal-browser";

const DEFAULT_AZURE_TENANT_ID = "6e31f9af-7cc0-4417-84ca-cf98c4ce67f5";
const DEFAULT_AZURE_CLIENT_ID = "a2f6f5bd-663f-40f2-9cde-95529bd036b2";
const DEFAULT_API_CLIENT_ID = "7de03491-e033-4b69-9df6-60a8195c4cb9";

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

const normalizeRedirectUri = (value: string | undefined) => {
  const fallbackUrl = new URL("/auth/callback.html", getCurrentOrigin()).toString();

  if (!value || !value.trim()) {
    return fallbackUrl;
  }

  try {
    const url = new URL(value.trim(), getCurrentOrigin());

    if (url.pathname === "/auth/callback") {
      url.pathname = "/auth/callback.html";
    }

    return url.toString();
  } catch {
    return fallbackUrl;
  }
};

const getFrontendBaseUrl = () => {
  return toAbsoluteUrl(import.meta.env.VITE_FRONTEND_URL, "/").replace(/\/$/, "");
};

const getTenantId = () => import.meta.env.VITE_AZURE_TENANT_ID?.trim() || DEFAULT_AZURE_TENANT_ID;

const getAzureClientId = () => import.meta.env.VITE_AZURE_CLIENT_ID?.trim() || DEFAULT_AZURE_CLIENT_ID;

const getApiClientId = () => import.meta.env.VITE_API_CLIENT_ID?.trim() || DEFAULT_API_CLIENT_ID;

const msalConfig = {
  auth: {
    clientId: getAzureClientId(),
    authority: `https://login.microsoftonline.com/${getTenantId()}`,
    redirectUri: normalizeRedirectUri(import.meta.env.VITE_AZURE_REDIRECT_URI),
    postLogoutRedirectUri: `${getFrontendBaseUrl()}/login`,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

export const loginRequest = {
  scopes: ["openid", "profile", "email", `api://${getApiClientId()}/access_as_user`],
};