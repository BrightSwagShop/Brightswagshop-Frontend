import { useEffect, useMemo, useState } from "react";
import { FaFlask, FaSpinner, FaExternalLinkAlt } from "react-icons/fa";

import { getApiBaseUrl } from "../../Config/apiBaseUrl";
import {
  getLatestTestRuns,
  getTestRun,
  startTestRun,
  type TestAutomationRun,
  type TestAutomationRunStatus,
  type TestAutomationSuite,
} from "../../services/adminApi";

const suites: Array<{ key: TestAutomationSuite; label: string; description: string }> = [
  { key: "Api", label: "Run API tests", description: "Cucumber playwright test suite for the backend API's" },
  { key: "Frontend", label: "Run Frontend tests", description: "Playwright UI tests for the frontend" },
];

const statusCopy: Record<TestAutomationRunStatus, string> = {
  Queued: "Queued",
  Running: "Running",
  Succeeded: "Succeeded",
  Failed: "Failed",
};

function StatusPill({ status }: { status: TestAutomationRunStatus }) {
  const colorClasses = {
    Queued: "bg-slate-100 text-slate-700",
    Running: "bg-amber-100 text-amber-800",
    Succeeded: "bg-emerald-100 text-emerald-800",
    Failed: "bg-rose-100 text-rose-800",
  }[status];

  const shouldSpin = status === "Running";

  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${colorClasses}`}>
      {shouldSpin ? <FaSpinner className="animate-spin" /> : <FaFlask />}
      {statusCopy[status]}
    </span>
  );
}

export default function TestAutomationReport() {
  const [runs, setRuns] = useState<Record<TestAutomationSuite, TestAutomationRun | null>>({
    Api: null,
    Frontend: null,
  });
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);
  const [reportPreviewRunId, setReportPreviewRunId] = useState<string | null>(null);
  const [activeSuite, setActiveSuite] = useState<TestAutomationSuite | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeRun = activeSuite ? runs[activeSuite] : null;
  const selectedRun = selectedRunId
    ? Object.values(runs).find((run) => run?.id === selectedRunId) ?? null
    : activeRun ?? runs.Frontend ?? runs.Api;
  const reportUrl = useMemo(() => {
    if (!selectedRun || reportPreviewRunId !== selectedRun.id) {
      return null;
    }

    const cacheBuster = selectedRun.completedAt ?? selectedRun.startedAt;
    return `${getApiBaseUrl()}${selectedRun.reportPath}?v=${cacheBuster}`;
  }, [reportPreviewRunId, selectedRun]);

  const refreshRuns = async () => {
    const latestRuns = await getLatestTestRuns();
    setRuns({
      Api: latestRuns.find((run) => run.suite === "Api") ?? null,
      Frontend: latestRuns.find((run) => run.suite === "Frontend") ?? null,
    });
  };

  useEffect(() => {
    void refreshRuns().catch((refreshError) => {
      console.error(refreshError);
      setError("Could not load the latest test runs.");
    });
  }, []);

  useEffect(() => {
    if (!activeRun || activeRun.status !== "Running") {
      return;
    }

    const intervalId = window.setInterval(() => {
      void getTestRun(activeRun.id)
        .then((updatedRun) => {
          setRuns((currentRuns) => ({
            ...currentRuns,
            [updatedRun.suite]: updatedRun,
          }));
        })
        .catch((pollError) => {
          console.error(pollError);
        });
    }, 2000);

    return () => window.clearInterval(intervalId);
  }, [activeRun]);

  useEffect(() => {
    if (!selectedRun || selectedRun.status === "Queued" || selectedRun.status === "Running") {
      setReportPreviewRunId(null);
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setReportPreviewRunId(selectedRun.id);
    }, 750);

    return () => window.clearTimeout(timeoutId);
  }, [selectedRun?.id, selectedRun?.status, selectedRun?.completedAt]);

  const handleStart = async (suite: TestAutomationSuite) => {
    setError(null);
    setIsLoading(true);
    setActiveSuite(suite);

    try {
      const run = await startTestRun(suite);
      setSelectedRunId(run.id);
      setRuns((currentRuns) => ({ ...currentRuns, [suite]: run }));

      const pollRun = async (runId: string) => {
        const latestRun = await getTestRun(runId);
        setRuns((currentRuns) => ({ ...currentRuns, [latestRun.suite]: latestRun }));

        if (latestRun.status === "Running" || latestRun.status === "Queued") {
          window.setTimeout(() => {
            void pollRun(runId);
          }, 2000);
        }
      };

      void pollRun(run.id);
    } catch (startError) {
      console.error(startError);
      setError(`Could not start ${suite} tests.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10">
      <div className="grid gap-4 xl:grid-cols-3">
        {suites.map((suite) => {
          const run = runs[suite.key];
          const isActive = activeSuite === suite.key;

          return (
            <div
              key={suite.key}
              className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{suite.label}</h2>
                  <p className="mt-1 text-sm text-slate-600">{suite.description}</p>
                </div>
                {run ? <StatusPill status={run.status} /> : <StatusPill status="Queued" />}
              </div>

              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => void handleStart(suite.key)}
                  disabled={isLoading}
                  className="inline-flex items-center gap-2 rounded-2xl bg-yellow-400 px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isActive && isLoading ? <FaSpinner className="animate-spin" /> : <FaFlask />}
                  Start suite
                </button>

                {run?.reportPath ? (
                  <a
                    href={`${getApiBaseUrl()}${run.reportPath}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                  >
                    Open report
                    <FaExternalLinkAlt className="text-xs" />
                  </a>
                ) : null}
              </div>

              <div className="mt-5 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
                {run ? (
                  <>
                    <div>Started: {new Date(run.startedAt).toLocaleString()}</div>
                    <div>
                      Completed: {run.completedAt ? new Date(run.completedAt).toLocaleString() : "Still running"}
                    </div>
                    <div>Exit code: {run.exitCode ?? "n/a"}</div>
                  </>
                ) : (
                  <div>No run yet.</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {error ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Live output</h2>
              <p className="mt-1 text-sm text-slate-600">
                Progress and diagnostics from the latest selected run.
              </p>
            </div>
            {selectedRun ? <StatusPill status={selectedRun.status} /> : null}
          </div>

          <div className="mt-5 rounded-2xl bg-slate-950 p-4 text-sm text-slate-100">
            {selectedRun?.outputTail?.length ? (
              <pre className="max-h-[26rem] overflow-auto whitespace-pre-wrap font-mono text-xs leading-6 text-slate-100">
                {selectedRun.outputTail.join("\n")}
              </pre>
            ) : (
              <div className="flex min-h-40 items-center justify-center text-slate-400">
                {selectedRun ? "Waiting for output..." : "No run selected yet."}
              </div>
            )}
          </div>

          {selectedRun?.errorMessage ? (
            <div className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
              {selectedRun.errorMessage}
            </div>
          ) : null}
        </section>

        <section className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Report preview</h2>
            <p className="mt-1 text-sm text-slate-600">
              The generated report is embedded here once the suite has produced it.
            </p>
          </div>

          <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
            {reportUrl ? (
              <iframe
                title="Test automation report"
                src={reportUrl}
                key={reportUrl}
                className="h-[42rem] w-full"
              />
            ) : (
              <div className="flex h-[42rem] items-center justify-center p-8 text-center text-sm text-slate-500">
                {selectedRun && (selectedRun.status === "Running" || selectedRun.status === "Queued")
                  ? "The report will appear here when the run finishes."
                  : "Start a suite to load the report here."}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}