const DEFAULT_API_URL = "https://brightswagshop-backend.onrender.com";

export const getApiBaseUrl = () => {
  const configuredUrl = (import.meta.env.VITE_API_URL || "").trim();

  const baseUrl = configuredUrl.length > 0 ? configuredUrl : DEFAULT_API_URL;
  // Avoid double slashes when callers append endpoint paths.
  return baseUrl.replace(/\/+$/, "");
};
