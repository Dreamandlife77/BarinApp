import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect  } from "react";

import { experts } from "../data/experts";
import BottomNav from "../components/BottomNav";
import MissionsTab from "../components/MissionsTabs"

export default function ExpertsDetail() {
  const [language, setLanguage] =
  useState("en");

useEffect(() => {
  const savedLanguage =
    localStorage.getItem("language") || "en";

  setLanguage(savedLanguage);
}, []);

  const navigate = useNavigate();

  const { id } = useParams();

  const [activeTab, setActiveTab] =
    useState("about");

  const expert = experts.find(
    (e) => String(e.id) === String(id)
  );

  if (!expert) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white">
        {language === "fa"
  ? "کاراکتر پیدا نشد"
  : "Character not found"}
      </div>
    );
  }

  const progress =
    (expert.currentXP / expert.maxXP) * 100;

  return (
    <div
      dir={language === "fa" ? "rtl" : "ltr"}
      className="min-h-screen bg-[#020617] pb-24"
    >

      {/* Hero */}

      <div className="relative bg-[#091827]">

      {/* Back Button */}

      <button
        onClick={() => navigate("/experts")}
        className="
          absolute
          top-3
          left-3
          z-20
          w-10
          h-10
          rounded-full
          bg-yellow/50
          backdrop-blur
          flex
          items-center
          justify-center
          text-white
        "
      >
        <ArrowLeft size={20} />
      </button>

      <img
        src={expert.avatardetail}
        alt={expert.name[language]}
        className="
          w-full
          h-auto
          object-cover
        "
      />

    </div>

      {/* Info */}

      <div className="p-4">

        <div className="flex items-end gap-3">

          <h1 className="text-white text-3xl font-bold">
            {expert.name[language]}
          </h1>

          <span
  className="font-semibold mb-1"
  style={{
    color: expert.color,
  }}
>
  {expert.role[language]}
</span>

        </div>

        <p className="text-slate-400">
           {expert.phase[language]}
        </p>

        <p
  className="font-semibold mt-2"
  style={{
    color: expert.color,
  }}
>
  {expert.quote[language]}
</p>

        {/* XP */}

        <div className="mt-4">

          <div className="flex justify-between">

            <span className="text-white">
              {language === "fa"
  ? `سطح ${expert.level}`
  : `Level ${expert.level}`}
            </span>

            <span className="text-slate-400">
              {expert.currentXP} / {expert.maxXP} XP
            </span>

          </div>

          <div className="mt-2 h-3 bg-slate-700 rounded-full">

            <div
              className="h-3 rounded-full"
              style={{
                width: `${progress}%`,
                backgroundColor: expert.color,
              }}
            />

          </div>

        </div>

        {/* Tabs */}

        <div className="flex gap-2 mt-6">

          <TabButton
            active={activeTab === "about"}
            onClick={() =>
              setActiveTab("about")
            }
          >
            {language === "fa" ? "درباره" : "About"}
          </TabButton>

          <TabButton
            active={activeTab === "missions"}
            onClick={() =>
              setActiveTab("missions")
            }
          >
            {language === "fa" ? "ماموریت‌ها" : "Missions"}
          </TabButton>

          <TabButton
            active={activeTab === "tools"}
            onClick={() =>
              setActiveTab("tools")
            }
          >
            {language === "fa" ? "ابزارها" : "Tools"}
          </TabButton>

          <TabButton
            active={activeTab === "stats"}
            onClick={() =>
              setActiveTab("stats")
            }
          >
            {language === "fa" ? "آمار" : "Stats"}
          </TabButton>

        </div>

        {/* Content */}

        <div className="mt-4">

          {activeTab === "about" && (

            <div className="bg-slate-900 rounded-2xl p-4">

              <h3 className="text-yellow-400 font-bold">
                Profile
              </h3>

              <p className="text-slate-300 mt-3">
                  {language === "fa"
  ? `${expert.name.fa} یک ${expert.role.fa} حرفه‌ای است.`
  : `${expert.name.en} is a professional ${expert.role.en}.`}
              </p>

              <p className="text-slate-400 mt-3">
                {language === "fa"
  ? `متخصص در ${expert.phase.fa}`
  : `Specializes in ${expert.phase.en}`}
              </p>

              <button
                onClick={() =>
                  navigate(`/education/${expert.id}`)
                }
                className="
                  mt-4
                  italic
                  underline
                  text-blue-400
                  hover:text-blue-300
                  transition
                "
              >
                {language === "fa"
  ? "ماژول آموزشی ←"
  : "Educational Module →"}
              </button>

            </div>

          )}

          {activeTab === "missions" && (
            <MissionsTab expert={expert} />
          )}

          {activeTab === "tools" && (

            <div className="space-y-3">

              {expert.tools.map((tool, index) => (

                <ToolCard
                  key={index}
                  icon={tool.icon}
                  name={tool.name[language]}
                />

              ))}

            </div>

          )}

          {activeTab === "stats" && (

            <div className="bg-slate-900 rounded-2xl p-4">

              <StatRow
                label={language === "fa" ? "سطح" : "Level"}
                value={expert.level}
              />

              <StatRow
                label={language === "fa" ? "XP فعلی" : "Current XP"}
                value={`${expert.currentXP}/${expert.maxXP}`}
              />

              <StatRow
                label={language === "fa" ? "رتبه هفتگی" : "Weekly Rank"}
                value={`#${expert.id}`}
              />

              <StatRow
                label={language === "fa" ? "BARIN کسب شده" : "BARIN Earned"}
                value="245"
              />

            </div>

          )}

        </div>

      </div>

      <BottomNav />

    </div>
  );
}

/* ========================== */

function TabButton({
  children,
  active,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        flex-1
        py-2
        rounded-xl
        text-sm
        font-semibold
        transition

        ${
          active
            ? "bg-yellow-500 text-black"
            : "bg-slate-900 text-white"
        }
      `}
    >
      {children}
    </button>
  );
}

/* ========================== */

function MissionCard({
  title,
  reward,
}) {
  return (
    <div className="bg-slate-900 rounded-2xl p-4">

      <div className="flex justify-between">

        <span className="text-white">
          {title}
        </span>

        <span className="text-yellow-500">
          {reward}
        </span>

      </div>

    </div>
  );
}


function MissionAccordion({
  mission,
}) {
  const [open, setOpen] =
    useState(false);

  return (
    <div
      className="
        bg-slate-900
        rounded-2xl
        overflow-hidden
      "
    >
      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          w-full
          p-4
          flex
          items-center
          justify-between
        "
      >
        <div className="text-left">

          <div className="text-white font-medium">
            {mission.title}
          </div>

        </div>

        <div className="flex items-center gap-3">

          <span className="text-yellow-500 font-semibold">
            {mission.reward}
          </span>

          <span className="text-white">
            {open ? "▲" : "▼"}
          </span>

        </div>

      </button>

      {open && (
        <div className="px-4 pb-4">

          <div className="border-t border-slate-700 pt-4">

            <p className="text-slate-300">
              {mission.description}
            </p>

            <div className="mt-3">

              <span className="text-slate-500">
                Platform:
              </span>

              <span className="ml-2 text-white">
                {mission.platform}
              </span>

            </div>

          </div>

        </div>
      )}

    </div>
  );
}
/* ========================== */

function ToolCard({
  icon,
  name,
}) {
  return (
    <div
      className="
        bg-slate-900
        rounded-2xl
        p-4
        flex
        items-center
        gap-3
      "
    >
      <div className="text-2xl">
        {icon}
      </div>

      <span className="text-white">
        {name}
      </span>

    </div>
  );
}

/* ========================== */

function StatRow({
  label,
  value,
}) {
  return (
    <div className="flex justify-between py-2">

      <span className="text-slate-400">
        {label}
      </span>

      <span className="text-white">
        {value}
      </span>

    </div>
  );
}