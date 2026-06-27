import { useState, useEffect } from "react";

export default function MissionCard({
  mission,
}) {
  const [open, setOpen] =
    useState(false);

  const [language, setLanguage] =
    useState("en");

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem("language") ||
      "en";

    setLanguage(savedLanguage);
  }, []);

  return (
    <div
      className="
        bg-slate-900
        rounded-2xl
        overflow-hidden
        border
        border-slate-800
      "
    >
      {/* Header */}

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          w-full
          flex
          justify-between
          items-center
          p-4
          text-left
        "
      >
        <div className="flex-1">

          <div className="text-white font-semibold">
            {mission.title?.[language]}
          </div>

        </div>

        <div className="flex items-center gap-3">

          <span
            className="
              text-yellow-500
              font-bold
              whitespace-nowrap
            "
          >
            {mission.reward}
          </span>

          <span
            className="
              text-slate-400
              text-sm
            "
          >
            {open ? "▲" : "▼"}
          </span>

        </div>
      </button>

      {/* Content */}

      {open && (

        <div
          className="
            px-4
            pb-4
            animate-fadeIn
          "
        >

          <div
            className="
              border-t
              border-slate-700
              pt-4
            "
          >

            <p
              className="
                text-slate-300
                leading-relaxed
              "
            >
              {
                mission.description?.[
                  language
                ]
              }
            </p>

            <div className="mt-4">

              <span className="text-slate-500">
                {language === "fa"
                  ? "پلتفرم:"
                  : "Platform:"}
              </span>

              <span
                className="
                  text-white
                  font-medium
                  ml-2
                "
              >
                {
                  mission.platform?.[
                    language
                  ]
                }
              </span>

            </div>

          </div>

        </div>

      )}
    </div>
  );
}