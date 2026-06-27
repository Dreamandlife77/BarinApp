import {
  useState,
  useEffect,
} from "react";

import BottomNav from "../components/BottomNav";
import TotalMissionsTabs from "../components/TotalMissionsTabs";
import MissionSection from "../components/MissionSection";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { verifyMission, } from "../api/mission";
import {
  missionCategories,
} from "../data/missions";

export default function Missions() {

  const [showModal, setShowModal] =
  useState(false);

  const resetSubmission =
  () => {

    setPreview(null);

    setFile(null);

    setJudgeResult(null);

  };
  
const [selectedMission, setSelectedMission] =
  useState("");

const [preview, setPreview] =
  useState(null);

  const [language, setLanguage] =
  useState("en");

  const [showMissionList, setShowMissionList] =
  useState(false);

const missions = [
  "Read: Iron in Bridge Engineering",
  "Open Mineral Cards",
  "Mine 300 units of Iron Ore",
];

const [file, setFile] =
  useState(null);

const [judgeResult,
  setJudgeResult] =
  useState(null);

const [loading,
  setLoading] =
  useState(false);

const handleImageChange =
  (e) => {

    const selected =
      e.target.files[0];

    if (!selected)
      return;

    setJudgeResult(null);

    setFile(selected);

    setPreview(
      URL.createObjectURL(
        selected
      )
    );
  };

  const handleVerify =
  async () => {

    if (
      !selectedMission
    ) {
      return;
    }

    if (!file) {
      return;
    }

    try {

      setLoading(true);

      const result =
        await verifyMission(
          selectedMission,
          file
        );

      setJudgeResult(
        result.completed
      );

    } catch {

      setJudgeResult(
        false
      );

    } finally {

      setLoading(false);

    }
  };

useEffect(() => {
  const savedLanguage =
    localStorage.getItem("language") ||
    "en";

  setLanguage(savedLanguage);
}, []);
   const navigate = useNavigate();
  const [tab, setTab] =
    useState("all");   

  return (
    <div dir={language === "fa" ? "rtl" : "ltr"}  className="min-h-screen bg-[#020617] pb-24">

      <div className="p-4 text-center relative">

  <button
    onClick={() =>
      navigate(-1)
    }
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
    <ArrowLeft />
  </button>

  <button
    onClick={() =>
      setShowModal(true)
    }
    className="
      absolute
      top-15
      right-3
      px-4
      py-2
      rounded-xl
      bg-yellow-500
      text-black
      font-semibold
      text-sm
    "
  >
    Submit Mission
  </button>

  <h1 className="text-white text-2xl font-bold">
    {language === "fa"
      ? "ماموریت‌ها"
      : "Missions"}
  </h1>

</div>

      <div className="p-4 pt-12">

        <TotalMissionsTabs
          active={tab}
          onChange={setTab}
        />

        {(tab === "all" ||
          tab === "learn") && (
          <MissionSection
            title={
  language === "fa"
    ? "📚 ماموریت‌های آموزشی"
    : "📚 Learn Missions"
}
            missions={
              missionCategories.learn
            }
          />
        )}

        {(tab === "all" ||
          tab === "mine") && (
          <MissionSection
            title={
  language === "fa"
    ? "⛏️ ماموریت‌های استخراج"
    : "⛏️ Mine Missions"
}
            missions={
              missionCategories.mine
            }
          />
        )}

        {(tab === "all" ||
          tab === "social") && (
          <MissionSection
            title={
  language === "fa"
    ? "✖ ماموریت‌های اجتماعی"
    : "✖ Social Missions"
}
            missions={
              missionCategories.social
            }
          />
        )}

        {(tab === "all" ||
          tab === "community") && (
          <MissionSection
            title={
  language === "fa"
    ? "👥 ماموریت‌های جامعه"
    : "👥 Community Missions"
}
            missions={
              missionCategories.community
            }
          />
        )}

      </div>

      {showModal && (

  <div
    className="
      fixed
      inset-0
      bg-black/70
      z-50
      flex
      items-center
      justify-center
      p-4
    "
  >

    <div
      className="
        w-full
        max-w-md
        bg-[#071224]
        rounded-3xl
        p-5
        border
        border-slate-800
      "
    >

      {/* Header */}

      <div className="flex justify-between items-center">

        <h2 className="text-white font-bold text-xl">
          Submit Mission Proof
        </h2>

        <button
          onClick={() => {

            setShowModal(false);

            setPreview(null);

            setFile(null);

            setSelectedMission("");

            setJudgeResult(null);

          }}
          className="
            text-slate-400
            text-2xl
          "
        >
          ×
        </button>

      </div>

      {/* Mission */}

      <div className="mt-6">

  <label
    className="
      text-white
      font-medium
    "
  >
    1. Select Mission
  </label>

  <button
    onClick={() =>
      setShowMissionList(
        !showMissionList
      )
    }
    className="
      w-full
      mt-2
      bg-[#091827]
      rounded-xl
      p-3
      text-white
      flex
      justify-between
      items-center
    "
  >
    <span>
      {selectedMission ||
        "Choose a mission"}
    </span>

    <span>
      ▼
    </span>
  </button>

  {showMissionList && (

    <div
      className="
        mt-2
        bg-[#091827]
        rounded-xl
        overflow-hidden
        border
        border-slate-700
      "
    >

      {missions.map(
        (mission) => (

          <button
            key={mission}
            onClick={() => {
              setSelectedMission(
                mission
              );

              setJudgeResult(null);

              setShowMissionList(
                false
              );
            }}
            className="
              w-full
              text-left
              px-4
              py-3
              text-white
              hover:bg-slate-800
              border-b
              border-slate-800
            "
          >
            {mission}
          </button>

        )
      )}

    </div>

  )}

</div>

      {/* Upload */}

      <div className="mt-6">

        <label
          className="
            text-white
            font-medium
          "
        >
          2. Upload Screenshot
        </label>

        {!preview ? (

          <label
            className="
              mt-3
              border
              border-dashed
              border-slate-600
              rounded-2xl
              h-40
              flex
              flex-col
              items-center
              justify-center
              cursor-pointer
              bg-[#091827]
            "
          >

            <div className="text-4xl">
              🖼️
            </div>

            <p className="text-white mt-2">
              Click to upload
            </p>

            <p className="text-slate-400 text-sm">
              PNG, JPG up to 10MB
            </p>

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImageChange
              }
              className="hidden"
            />

          </label>

        ) : (

          <div
            className="
              mt-3
              bg-[#091827]
              rounded-2xl
              p-3
            "
          >

            <div className="relative">

              <img
                src={preview}
                alt=""
                className="
                  w-full
                  rounded-xl
                  max-h-80
                  object-cover
                "
              />

              <button
                onClick={() => {

                setPreview(null);

                setFile(null);

                setJudgeResult(null);

              }}
                className="
                  absolute
                  top-2
                  right-2
                  w-8
                  h-8
                  rounded-full
                  bg-black/70
                  text-white
                "
              >
                ×
              </button>

            </div>

            <button
              className="
                mt-4
                text-yellow-500
                text-sm
                w-full
              "
            >
              Change Image
            </button>

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImageChange
              }
              className="
                opacity-0
                absolute
                pointer-events-none
              "
            />

          </div>

        )}

      </div>

      {/* Submit */}

      <button
  onClick={handleVerify}
  disabled={loading}
  className="
    w-full
    mt-8
    py-4
    rounded-2xl
    bg-yellow-500
    text-black
    font-bold
  "
>
  {
    loading
      ? "Checking..."
      : "Confirm Submission"
  }
</button>
{
  judgeResult === true && (
    <div
      className="
        mt-4
        text-center
        text-green-500
        font-bold
      "
    >
      ✅ Mission Completed
    </div>
  )
}

{
  judgeResult === false && (
    <div
      className="
        mt-4
        text-center
        text-red-500
        font-bold
      "
    >
      ❌ Please update again.
    </div>
  )
}
    </div>

  </div>

)}

      <BottomNav />

    </div>
  );
}