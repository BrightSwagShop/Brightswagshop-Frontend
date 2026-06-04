import { useEffect, useState } from "react";
import {
  getBugStatuses,
  toggleBug,
  type DebugBugKey,
  type DebugBugStatus,
} from "../../services/bugService";
import Loading from "../../components/Loading";

const bugLabels: Record<DebugBugKey, string> = {
  brokenImages: "Broken images",
  brokenFavorites: "Broken favorites",
  productApiError: "Product API error",
  slowLoading: "Slow loading",
  loginFails: "Login fails",
  DisableAddToCart: "Disable add to cart",
  WrongCartTotal: "Wrong cart total",
};

export default function Bugs() {
  const [flags, setFlags] = useState<DebugBugStatus | null>(null);

  useEffect(() => {
    const load = async () => {
      const data = await getBugStatuses();
      setFlags(data);
    };

    load();
  }, []);

  const handleToggle = async (feature: DebugBugKey) => {
    const result = await toggleBug(feature);

    setFlags((current) =>
      current
        ? {
            ...current,
            [feature]: result.enabled,
          }
        : current,
    );
  };

  if (!flags) {
    return (
      <div className="p-6 bg-[#EDEDED] min-h-screen">
        <h1 className="text-4xl font-semibold text-[#3C3C3B]">Bugs</h1>
        <p className="text-[#3C3C3B] mt-1 mb-8">
          Zet hier de ingebouwde bugs aan of uit.
        </p>
        <Loading />
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#EDEDED] min-h-screen">
      <h1 className="text-4xl font-semibold text-[#3C3C3B]">Bugs</h1>
      <p className="text-[#3C3C3B] mt-1 mb-8">
        Zet hier de ingebouwde bugs aan of uit.
      </p>

      <div className="grid grid-cols-2 gap-6 max-w-3xl">
        {(Object.keys(bugLabels) as DebugBugKey[]).map((feature) => (
          <div
            key={feature}
            className="bg-white rounded-xl p-4 shadow-sm flex flex-col items-center justify-center text-center"
          >
            <p className="text-sm font-medium text-[#3C3C3B] mb-4">
              {bugLabels[feature]}
            </p>

            <button
              onClick={() => handleToggle(feature)}
              className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
                flags[feature] ? "bg-yellow-400" : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                  flags[feature] ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>

            <p className="text-xs text-gray-500 mt-2">
              {flags[feature] ? "Actief" : "Uit"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
