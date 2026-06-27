import { useNavigate } from "react-router-dom";
import { Play } from "lucide-react";
import API from "../config/api";

import BottomNav from "../components/BottomNav";
import { translations } from "../data/translations";
import { experts } from "../data/experts";
import { minerals } from "../data/mineralData";
import { useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Gift } from "lucide-react";
import DailyRewardsModal from "../components/DailyRewardsModal";


export default function Home() {

  const [showDailyRewards, setShowDailyRewards] = useState(false);
  const [missions, setMissions] = useState([]);
  const navigate = useNavigate();

  const [dailyCode, setDailyCode] = useState("");
const [checkingCode, setCheckingCode] = useState(false);

const [showRewardPopup, setShowRewardPopup] = useState(false);
const [rewardData, setRewardData] = useState(null);

const verifyDailyCode = async () => {

  if (!dailyCode.trim()) {
    return;
  }

  try {

    setCheckingCode(true);

    const res = await API.post(
  "/missions/verify-code",
  {
    code: dailyCode,
  }
);

    setRewardData({
      title: "Code Accepted!",
      barin: 20,
      xp: 20
    });

    setShowRewardPopup(true);

    setTimeout(() => {
      setShowRewardPopup(false);
    }, 2500);

    setDailyCode("");

    // reload missions
    const missionRes =
      await API.get("/daily-missions/today");

    setMissions(missionRes.data);

  } catch (err) {

  setRewardData({
    title: "Wrong Code",
    message:
      err.response?.data?.message ||
      "Something went wrong."
  });

  setShowRewardPopup(true);

  setTimeout(() => {
    setShowRewardPopup(false);
  }, 2500);

} finally {

    setCheckingCode(false);

  }

};

  const { id } = useParams();

  const currentExpert =
    experts.find(
      (e) => String(e.id) === String(id)
    ) || experts.find((e) => e.id === 1);

  const mineral =
    minerals.find((m) => m.id === 1);

  const energy = 80;

  const progress =
    (currentExpert.currentXP /
      currentExpert.maxXP) *
    100;

  const [language, setLanguage] =
  useState("en");


  useEffect(() => {
    const savedLanguage =
      localStorage.getItem("language") || "en";

    setLanguage(savedLanguage);
  }, []);

  const t = translations[language];

useEffect(() => {

  const loadMissions = async () => {

    try {

      const res =
        await API.get(
          "/daily-missions/today"
        );

      setMissions(
        res.data
      );

    } catch (err) {

      console.log(
        "Mission Load Error:",
        err
      );

    }

  };

  loadMissions();

}, []);

useEffect(() => {

  const loadMissions = async () => {
    try {
      const res =
        await API.get(
          "/daily-missions/today"
        );

      setMissions(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  loadMissions();

  const interval =
    setInterval(
      loadMissions,
      60000
    ); // every minute

  return () =>
    clearInterval(interval);

}, []);

  return (
    <div  dir={language === "fa" ? "rtl" : "ltr" } className="min-h-screen bg-[#020617] pb-24" >
      {/* Current Expert */}

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
    setShowDailyRewards(true)
  }
  className="
    absolute
    top-100
    right-3
    z-20
    w-12
    h-12
    rounded-full
    bg-yellow-500
    flex
    items-center
    justify-center
    shadow-[0_0_20px_rgba(255,200,0,.6)]
    animate-bounce
  "
>

  
  <Gift
    size={24}
    className="text-black"
  />
</button>
        <h1 className="text-white text-2xl font-bold">
          {t.home}
        </h1>

      </div>

      <div className="px-4">
        <div
          className="
            bg-slate-900
            rounded-2xl
            p-4
          "
        >

          <div className="flex gap-4">

            <img
              src={currentExpert.avatar}
              alt=""
              className="
                w-30
                h-30
                rounded-full
              "
            />

            <div className="flex-1">

              <div className="text-slate-400">
                {t.currentExpert}
              </div>

              <div className="text-white text-2xl font-bold">
                {currentExpert.name[language]}
              </div>

              <div
                style={{
                  color:
                    currentExpert.color,
                }}
                className="font-semibold"
              >
                {currentExpert.role[language]}
              </div>

              <div className="mt-2 flex justify-between">

                <span className="text-white">
                  {t.Level} {currentExpert.level}
                </span>

                <span className="text-slate-400">
                  {currentExpert.currentXP}
                  /
                  {currentExpert.maxXP}
                </span>

              </div>

              <div
                className="
                  mt-2
                  h-2
                  bg-slate-700
                  rounded-full
                "
              >

                <div
                  className="h-2 rounded-full"
                  style={{
                    width:
                      `${progress}%`,
                    backgroundColor:
                      currentExpert.color,
                  }}
                />

              </div>

            </div>

          </div>

          <button
            onClick={() =>
              navigate(
                `/experts`
              )
            }
            className="
              w-full
              mt-4
              py-3
              rounded-xl
              bg-yellow-500
              text-black
              font-bold
            "
          >
            {t.viewExperts}
          </button>

        </div>

      </div>
      
      {/* Energy */}

      <div className="px-4 mt-4">

        <div
          className="
            bg-slate-900
            rounded-2xl
            p-4
          "
        >

          <div className="flex justify-between">

            <span className="text-white">
              ⚡ {t.energy}
            </span>

            <span className="text-white">
              {energy}/100
            </span>

          </div>

          <div
            className="
              mt-3
              h-3
              bg-slate-700
              rounded-full
            "
          >

            <div
              className="
                h-3
                bg-yellow-500
                rounded-full
              "
              style={{
                width: `${energy}%`,
              }}
            />

          </div>

        </div>

      </div>

      {/* Missions */}

<div className="px-4 mt-4">

  <div
    className="
      bg-slate-900
      rounded-2xl
      p-4
    "
  >

    {/* Header */}
    <h3 className="text-white font-bold text-lg">
      {t.todayMissions}
    </h3>

    

    {/* Today's Code */}
    <div className="mt-4 mb-5">



      <div className="text-yellow-400 text-sm font-bold mb-2">
        Today's Code
      </div>

      <div className="flex gap-2">

        <input
          value={dailyCode}
          onChange={(e) => setDailyCode(e.target.value)}
          placeholder="Enter today's code"
          className="
            flex-1
            bg-slate-800
            border
            border-yellow-500
            rounded-lg
            px-3
            py-2
            text-white
            outline-none
          "
        />

        <button
          disabled={checkingCode}
          onClick={verifyDailyCode}
          className="
            px-5
            rounded-lg
            bg-yellow-500
            text-black
            font-bold
            hover:bg-yellow-400
            disabled:opacity-50
          "
        >
          {checkingCode ? "..." : "Confirm"}
        </button>

      </div>

    </div>

    {/* Mission List */}

    {missions.length === 0 ? (

      <div className="text-slate-400 text-center py-4">
        No missions today
      </div>

    ) : (

      missions.map((mission) => (

        <MissionRow
          key={mission.id}
          title={
            language === "fa"
              ? mission.title_fa
              : mission.title_en
          }
          progress={`${mission.progress}/${mission.target}`}
          reward={
            <div className="text-right">

              <div className="text-cyan-300 font-black">
                ⚡ {mission.xp} XP
              </div>

              <div className="text-yellow-300 font-black">
                🪙 {mission.barin} BARIN
              </div>

            </div>
          }
        />

      ))

    )}

  </div>

</div>

      {/* Mining Card */}

      <div className="px-4 mt-4">

        <div
          className="
            bg-slate-900
            rounded-2xl
            p-4
            relative
          "
        >

          <div className="flex justify-between">

            <div>

              <div className="text-white text-2xl font-bold">
                {mineral.name[language]}
              </div>

              <div
                style={{
                  color:
                    mineral.color,
                }}
              >
                {mineral.rarity[language]}
              </div>

            </div>

            <div
              className="font-bold text-xl"
              style={{
                color:
                  mineral.color,
              }}
            >
              {mineral.symbol}
            </div>

          </div>

          <div className="relative">

            <img
              src={mineral.images[0]}
              alt=""
              className="
                w-full
                h-72
                object-contain
              "
            />

            <button
              onClick={() =>
                navigate("/mining")
              }
              className="
                absolute
                inset-0
                flex
                items-center
                justify-center
              "
            >

              <div
                className="
                  bg-green-500/20
                  border
                  border-green-500
                  rounded-full
                  p-6
                  backdrop-blur
                "
              >

                <Play
                  size={60}
                  fill="#22C55E"
                  color="#22C55E"
                />

              </div>

            </button>

          </div>

          <button
            onClick={() =>
              navigate("/mining")
            }
            className="
              w-full
              py-4
              rounded-xl
              bg-yellow-500
              text-black
              font-bold
            "
          >
            {t.tapToMine}
          </button>

        </div>

      </div>

      {
  showDailyRewards && (
    <DailyRewardsModal
      onClose={() => setShowDailyRewards(false)}
    />
  )
}

{/* Reward Popup */}
{showRewardPopup && (

  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

    <div
      className="
        animate-[popup_.35s_ease]
        bg-[#091827]
        border-2
        border-yellow-400
        rounded-3xl
        w-80
        p-6
        text-center
        shadow-[0_0_35px_rgba(255,200,0,.45)]
      "
    >

      <div className="text-6xl mb-3">
        🎁
      </div>

      <h2 className="text-yellow-400 text-2xl font-black">
        {rewardData?.title}
      </h2>

      {rewardData?.message ? (

        <p className="text-white mt-4">
          {rewardData.message}
        </p>

      ) : (

        <>

          <div className="mt-5 text-yellow-300 text-xl font-black">
            +{rewardData?.barin} BARIN
          </div>

          <div className="text-cyan-300 text-xl font-black">
            +{rewardData?.xp} XP
          </div>

          <div className="mt-5 text-green-400 font-bold">
            Reward Added Successfully
          </div>

        </>

      )}

    </div>

  </div>

)}

<BottomNav />

    </div>
  );
}

function MissionRow({
  title,
  progress,
  reward,
}) {
  return (
    <div
      className="
        flex
        justify-between
        py-3
        border-b
        border-slate-800
      "
    >
      <div>

        <div className="text-white">
          {title}
        </div>

        <div className="text-slate-400 text-sm">
          {progress}
        </div>

      </div>

      <div className="text-right">
        {reward}
      </div>

    </div>
  );
}