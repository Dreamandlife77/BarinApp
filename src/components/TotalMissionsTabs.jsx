import { useEffect, useState } from "react";

export default function TotalMissionsTabs({
  active,
  onChange,
}) {
  const [language, setLanguage] =
    useState("en");

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem("language") ||
      "en";

    setLanguage(savedLanguage);
  }, []);

  const tabs = [
    "all",
    "learn",
    "mine",
    "social",
    "community",
  ];

  const labels = {
    en: {
      all: "All",
      learn: "Learn",
      mine: "Mine",
      social: "Social",
      community: "Community",
    },

    fa: {
      all: "همه",
      learn: "آموزش",
      mine: "استخراج",
      social: "اجتماعی",
      community: "جامعه",
    },
  };

  return (
    <div className="flex gap-2 mb-4 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`
            px-3
            py-2
            rounded-xl
            whitespace-nowrap
            text-sm

            ${
              active === tab
                ? "bg-yellow-500 text-black"
                : "bg-slate-900 text-white"
            }
          `}
        >
          {labels[language][tab]}
        </button>
      ))}
    </div>
  );
}