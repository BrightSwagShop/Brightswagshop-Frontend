import api from "../API/api";

export type DebugBugKey =
  | "brokenImages"
  | "productApiError"
  | "slowLoading"
  | "loginFails"
  | "DisableAddToCart"
  | "WrongCartTotal";

export type DebugBugStatus = Record<DebugBugKey, boolean>;

export type DebugBugToggleResponse = {
  feature: DebugBugKey;
  enabled: boolean;
};

export async function getBugStatuses() {
  const response = await api.get<DebugBugStatus>("/api/debug/settings");
  return response.data;
}

export async function toggleBug(feature: DebugBugKey) {
  const response = await api.post<DebugBugToggleResponse>(
    `/api/debug/toggle/${feature}`,
  );

  return response.data;
}
