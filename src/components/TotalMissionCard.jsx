import {
  CheckCircle,
} from "lucide-react";

import {
  useState,
  useEffect,
} from "react";

export default function MissionCard({
  mission,
}) {
  const [language, setLanguage] =
    useState("en");

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem("language") ||
      "en";

    setLanguage(savedLanguage);
  }, []);

  const percentage =
    mission.total
      ? (mission.progress /
          mission.total) *
        100
      : 0;

  return (
    <div
      className="
        bg-slate-900
        rounded-2xl
        p-4
      "
    >
      <div className="flex justify-between">
        <div>
          <h4 className="text-white font-semibold">
            {mission.title?.[language]}
          </h4>

          {mission.description && (
            <p className="text-slate-400 text-sm">
              {
                mission.description[
                  language
                ]
              }
            </p>
          )}
        </div>

        {mission.completed && (
          <CheckCircle
            className="text-green-500"
            size={22}
          />
        )}
      </div>

      {mission.total && (
        <>
          <div
            className="
              mt-3
              h-2
              bg-slate-700
              rounded-full
            "
          >
            <div
              className="
                h-2
                rounded-full
                bg-green-500
              "
              style={{
                width: `${percentage}%`,
              }}
            />
          </div>

          <div className="mt-1 text-right text-slate-400 text-sm">
            {mission.progress} /{" "}
            {mission.total}
          </div>
        </>
      )}

      <div className="mt-2 text-yellow-500 font-semibold">
        {mission.reward}
      </div>
    </div>
  );
}