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
    <div className="p-6 bg-[#EDEDED] min-h-screen">
      <h1 className="text-4xl font-semibold text-[#3C3C3B]">Bugs</h1>
      <p className="text-[#3C3C3B] mt-1 mb-8">
        Zet hier de ingebouwde bugs aan of uit.
      </p>

      {/* GRID */}
      <div className="grid grid-cols-2 gap-6 max-w-3xl">

        {(Object.keys(bugLabels) as BugKey[]).map((key) => (
          <div
            key={key}
            className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center justify-center text-center"
          >
            {/* TITLE */}
            <p className="text-sm font-medium text-[#3C3C3B] mb-4">
              {bugLabels[key]}
            </p>

            {/* TOGGLE */}
            <button
              onClick={() => toggle(key)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                flags[key] ? "bg-yellow-400" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  flags[key] ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>

            {/* STATUS */}
            <p className="text-xs text-gray-500 mt-2">
              {flags[key] ? "Actief" : "Uit"}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}