import { useState, useEffect } from "react";

import API from "../config/api";

import box from "../assets/UI/box.png";
import coin from "../assets/UI/coin.png";
import fire from "../assets/UI/fire.png";
import shield from "../assets/UI/shield.png";
import calendar from "../assets/UI/calendar.png";

const rewards = [
  { day: 1, barin: 50, xp: 20 },
  { day: 2, barin: 75, xp: 30 },
  { day: 3, barin: 100, xp: 40 },
  { day: 4, barin: 125, xp: 50 },
  { day: 5, barin: 150, xp: 60 },
  { day: 6, barin: 200, xp: 75 },
  {
    day: 7,
    barin: 300,
    xp: 100,
    chest: true,
  },
];

export default function DailyRewardsModal({
  onClose,
}) {

const [currentDay, setCurrentDay] = useState(1);
const [streak, setStreak] = useState(0);
const [claimedToday, setClaimedToday] = useState(false);
const [claimedDays, setClaimedDays] = useState([]);
const [showRewardPopup, setShowRewardPopup] = useState(false);
const [rewardData, setRewardData] = useState(null);
  const [
    loading,
    setLoading,
  ] = useState(true);

const claimReward = async () => {
  try {
    const res = await API.post("/daily/claim");
    const data = res.data;

    // ✅ SAVE REWARD DATA FOR UI
    setRewardData(data.reward);
    setShowRewardPopup(true);

    // update UI
    setCurrentDay(data.currentDay);
    setStreak(data.streak);
    setClaimedToday(true);

    await fetchDailyStatus();

    // auto close popup after 2.5s
    setTimeout(() => {
      setShowRewardPopup(false);
      setRewardData(null);
    }, 2500);

  } catch (err) {
    return;
  }
};

  useEffect(() => {
    fetchDailyStatus();
  }, []);

 const fetchDailyStatus = async () => {
  try {
    const res = await API.get("/daily/status");

    setCurrentDay(res.data.currentDay);
    setStreak(res.data.streak);
    setClaimedToday(res.data.claimedToday);

    // IMPORTANT: backend does NOT send this yet
    // so we simulate it from streak

    const claimed = [];

    for (let i = 1; i < res.data.currentDay; i++) {
      claimed.push(i);
    }

    setClaimedDays(claimed);

  } catch (err) {
    console.log("Daily Status Error:", err);
  } finally {
    setLoading(false);
  }
};


  return (
    <div
      className="
        fixed
        inset-0
        bg-black/80
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
          rounded-3xl
          bg-[#071224]
          border
          border-yellow-500/20
          p-5
          max-h-[90vh]
          overflow-y-auto
        "
      >
        {/* Header */}

        <div className="relative text-center">

          <button
            onClick={onClose}
            className="
              absolute
              right-0
              top-0
              text-white
              text-xl
            "
          >
            ✕
          </button>

          <h2
            className="
              text-yellow-400
              text-3xl
              font-black
            "
          >
            DAILY LOGIN
          </h2>

          <h2
            className="
              text-yellow-400
              text-3xl
              font-black
            "
          >
            REWARDS
          </h2>

        </div>

        {/* Streak */}



<div
  className="
    mt-5
    bg-[#091827]
    rounded-2xl
    p-4
  "
>

  <div className="flex justify-between items-center">

    <div className="flex gap-3">

      <img
        src={fire}
        alt=""
        className="w-10 h-10"
      />

      <div>

        <div className="text-white font-bold">
          CURRENT STREAK:
          <span className="text-yellow-400 ml-2">
            {streak} DAYS
          </span>
        </div>

        <div className="text-yellow-400 text-sm">
          Progress Saved
        </div>

      </div>

    </div>

    <img
      src={shield}
      alt=""
      className="w-12 h-12"
    />

  </div>

{/* Progress Bar */}
<div className="mt-5">
  <div className="flex items-center">

    {[1,2,3,4,5,6,7].map((day, index) => {

      // ✅ FIX: correct logic
      const isClaimed = day <= streak;

      const isToday = day === streak + 1 && !claimedToday;

      return (
        <div key={day} className="flex items-center flex-1">

          {/* CIRCLE */}
          <div
            className={`
              w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 shrink-0

              ${isClaimed
                ? "bg-green-500 border-green-400 text-white"
                : isToday
                ? "bg-yellow-500 border-yellow-400 text-black animate-pulse"
                : "bg-slate-800 border-slate-600 text-slate-400"
              }
            `}
          >
            {isClaimed ? "✓" : day}
          </div>

          {/* LINE */}
          {index < 6 && (
            <div
              className={`
                flex-1 h-1
                ${isClaimed ? "bg-green-500" : "bg-slate-700"}
              `}
            />
          )}

        </div>
      );
    })}

  </div>

  {/* Labels */}
  <div className="flex mt-2">
    {[1,2,3,4,5,6,7].map((day) => (
      <div
        key={day}
        className="flex-1 text-center text-[10px] text-slate-400"
      >
        Day {day}
      </div>
    ))}
  </div>
</div>

</div>


{/* Cards */}

<div className="grid grid-cols-3 gap-4 mt-6">
    {rewards.map((reward, index) => {

  const isClaimed =
    reward.day < currentDay ||
    (reward.day === currentDay && claimedToday);

  const isToday =
    reward.day === currentDay && !claimedToday;

  return (
    <div
      key={reward.day}
      className={`
        rounded-2xl overflow-hidden border-[3px]

        ${
          isClaimed
            ? "border-green-500"
            : isToday
            ? "border-yellow-400 shadow-[0_0_20px_rgba(255,200,0,.4)]"
            : "border-slate-700"
        }

        ${reward.day === 7 ? "col-span-3" : ""}
      `}
    >

      {/* CARD BODY */}
      <div className="bg-[#091827] p-2 text-center">

        <img
          src={reward.chest ? box : coin}
          className="w-10 h-10 mx-auto mt-3 object-contain"
        />

        <div className="text-yellow-400 font-black">
          {reward.barin}
          <span className="text-white text-sm"> Barin</span>
        </div>

        <div className="text-sky-400 font-bold">
          {reward.xp} XP
        </div>

      </div>

      {/* STATUS BAR */}
      <div
        className={`
          py-3 text-center font-bold

          ${
            isClaimed
              ? "bg-green-900 text-green-400"
              : isToday
              ? "bg-yellow-500 text-black"
              : "bg-slate-800 text-slate-400"
          }
        `}
      >
        {isClaimed
          ? "✓ CLAIMED"
          : isToday
          ? "TODAY"
          : "🔒 LOCKED"}
      </div>

    </div>
  );
})}
</div>

        

        {/* Notice */}

        <div
          className="
            mt-5
            bg-[#091827]
            rounded-2xl
            p-4
            flex
            justify-between
            items-center
          "
        >
          <div>

            <div className="text-yellow-400 font-bold">
              Missed a day?
            </div>

            <div className="text-slate-400 text-sm">
              Progress is saved.
            </div>

          </div>

          <img
            src={calendar}
            alt=""
            className="w-10 h-10"
          />

        </div>

        {/* Button */}

        <button
          onClick={claimReward}
          disabled={claimedToday}
          className="
            w-full
            mt-5
            py-4
            rounded-2xl
            bg-yellow-500
            text-black
            font-black
            disabled:opacity-50
          "
        >
          {
            claimedToday
              ? "✓ CLAIMED"
              : "🎁 CLAIM REWARD"
          }
        </button>

      </div>

      {showRewardPopup && rewardData && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

    <div className="animate-pulse animate-scale-in bg-gradient-to-b from-yellow-400 to-yellow-600 text-black p-6 rounded-3xl shadow-2xl text-center w-80">

      {/* TITLE */}
      <h2 className="text-2xl font-black mb-3">
        🎉 REWARD CLAIMED!
      </h2>

      {/* ICON */}
      <div className="text-5xl mb-3">💰</div>

      {/* VALUES */}
      <div className="text-lg font-bold">
        +{rewardData.barin} BARIN
      </div>

      <div className="text-sm font-semibold">
        +{rewardData.xp} XP
      </div>

      {/* ANIMATION BAR */}
      <div className="mt-4 w-full h-2 bg-black/20 rounded-full overflow-hidden">
        <div className="h-full bg-white animate-pulse w-full"></div>
      </div>

    </div>

  </div>
)}
    </div>
  );
}