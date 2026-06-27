import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import BottomNav from "../components/BottomNav";
import { minerals } from "../data/mineralData";

export default function MineralCollection() {

  const navigate = useNavigate();

  const [language, setLanguage] =
  useState("en");

useEffect(() => {
  const savedLanguage =
    localStorage.getItem("language") ||
    "en";

  setLanguage(savedLanguage);
}, []);

  const [filter, setFilter] =
    useState("All");

  const filteredMinerals =
  filter === "All"
    ? minerals
    : minerals.filter(
        (m) =>
          m.rarity.en === filter
      );

  return (
    <div
  dir={language === "fa" ? "rtl" : "ltr"}
  className="min-h-screen bg-[#020617] pb-24"
>

      {/* Header */}

      <div
  className={`
    flex
    items-center
    gap-3
    p-4
    ${
      language === "fa"
        ? "flex-row-reverse"
        : ""
    }
  `}
>

        <button
          onClick={() =>
            navigate(-1)
          }
        >
          <ArrowLeft
            size={22}
            className="text-white"
          />
        </button>

        <h1
          className="
            text-white
            text-xl
            font-bold
          "
        >
          {language === "fa"
  ? "مجموعه مواد معدنی"
  : "Mineral Collection"}
        </h1>

      </div>

      {/* Filters */}

      <div
        className="
          px-4
          flex
          gap-2
          mb-5
        "
      >

        {[
          "All",
          "Common",
          "Uncommon",
          "Rare",
        ].map((tab) => (

          <button
            key={tab}
            onClick={() =>
              setFilter(tab)
            }
            className={`
              px-4
              py-2
              rounded-xl
              text-sm

              ${
                filter === tab
                  ? "bg-yellow-500 text-black"
                  : "bg-slate-900 text-white"
              }
            `}
          >
            {
  language === "fa"
    ? {
        All: "همه",
        Common: "رایج",
        Uncommon: "غیرمعمول",
        Rare: "کمیاب",
      }[tab]
    : tab
}
          </button>

        ))}

      </div>

      {/* Grid */}

      <div
        className="
          px-4
          grid
          grid-cols-2
          gap-4
        "
      >

        {filteredMinerals.map(
          (mineral) => (

            <div
            key={mineral.id}
            className="
                relative
                overflow-hidden
                rounded-2xl
                border
                h-50
            "
            style={{
                borderColor: mineral.color,
            }}
            >

            {/* Background Image */}

            <img
                src={mineral.images[0]}
                alt={mineral.name[language]}
                className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
                "
            />

            {/* Dark Overlay */}

            <div
                className="
                absolute
                inset-0
                bg-gradient-to-b
                from-black/20
                via-transparent
                to-black/80
                "
            />

            {/* Top Info */}

            <div
                className="
                absolute
                top-3
                left-3
                z-10
                "
            >

              <h3
                className="
                  text-white
                  font-bold
                  text-sm
                "
              >
                {mineral.name[language]}
              </h3>

               

            </div>

            {/* Bottom Info */}

            <div
                className="
                absolute
                bottom-3
                left-3
                z-10
                "
            >

                <p
                className="
                    font-bold
                    text-sm
                "
                style={{
                    color: mineral.color,
                }}
                >
                {mineral.rarity[language]}
                </p>

            </div>

            </div>  

          )
        )}

      </div>

      <BottomNav />

    </div>
  );
}