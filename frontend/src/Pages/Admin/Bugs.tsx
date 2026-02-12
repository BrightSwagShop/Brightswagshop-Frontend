import { useEffect, useState } from "react";
import { bugLabels, type BugKey } from "../../bugs/BugFlags";
import { loadBugFlags, saveBugFlags, type BugFlags } from "../../bugs/BugStore";

export default function Bugs() {
  const [flags, setFlags] = useState<BugFlags>(loadBugFlags());

  useEffect(() => {
    saveBugFlags(flags);
  }, [flags]);

  const toggle = (key: BugKey) => {
    setFlags((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-extrabold text-slate-900">Bug Lab</h1>
      <p className="mt-2 text-slate-600">
        Zet bugs aan/uit om edge cases te testen. (Wordt bewaard in je browser.)
      </p>

      <div className="mt-8 space-y-3">
        {(Object.keys(bugLabels) as BugKey[]).map((key) => (
          <div
            key={key}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4"
          >
            <div>
              <p className="font-semibold text-slate-900">{bugLabels[key]}</p>
              <p className="text-xs text-slate-500">{key}</p>
            </div>

            <button
              onClick={() => toggle(key)}
              className={`h-8 w-14 rounded-full transition px-1 ${
                flags[key] ? "bg-emerald-500" : "bg-slate-300"
              }`}
              aria-pressed={flags[key]}
            >
              <div
                className={`h-6 w-6 rounded-full bg-white transition ${
                  flags[key] ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}