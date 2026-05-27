import apiClient from "./axiosInstance";

export const fetchWithAuth = async (url: string) => {
  return apiClient.get(url);
};

export type TestAutomationSuite = "Api" | "Frontend";

export type TestAutomationRunStatus =
  | "Queued"
  | "Running"
  | "Succeeded"
  | "Failed";

export type TestAutomationRun = {
  id: string;
  suite: TestAutomationSuite;
  status: TestAutomationRunStatus;
  startedAt: string;
  completedAt: string | null;
  exitCode: number | null;
  reportPath: string;
  outputTail: string[];
  errorMessage: string | null;
};

export const getLatestTestRuns = async () => {
  const response = await apiClient.get<TestAutomationRun[]>(
    "/api/admin/test-automation/runs/latest"
  );

  return response.data;
};

export const startTestRun = async (suite: TestAutomationSuite) => {
  const response = await apiClient.post<TestAutomationRun>(
    "/api/admin/test-automation/runs",
    { suite }
  );

  return response.data;
};

export const getTestRun = async (runId: string) => {
  const response = await apiClient.get<TestAutomationRun>(
    `/api/admin/test-automation/runs/${runId}`
  );

  return response.data;
};