import { useNavigate } from "react-router-dom";
import bgImage from "../assets/splash-bg.png";

export default function Splash() {
  const navigate = useNavigate();
  return (
    <div
      className="relative min-h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Top Gradient */}
      <div className="absolute top-0 left-0 right-0 h-72 bg-gradient-to-b from-black/70 to-transparent"></div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-72 bg-gradient-to-t from-black/80 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen px-6">

        {/* Logo Area */}
        <div className="pt-12 text-center">

          <h1
            className="
              text-6xl
              font-black
              tracking-wide
              text-yellow-500
              drop-shadow-lg
            "
          >
            BARIN
          </h1>

          <h2
            className="
              text-3xl
              font-bold
              text-white
              mt-1
            "
          >
            MINING QUEST
          </h2>

          <div className="mt-0 space-y-1">
            {/* <p className="text-yellow-400 font-semibold">
              Learn Mining. Earn Rewards.
            </p> */}

            <p className="text-yellow-400 text-lg font-bold">
              Own the Future of  Critical Minerals.
            </p>

          </div>

        </div>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Buttons */}
        <div className="pb-10">

          <button
            onClick={() => navigate("/tutorial")}
            className="
              w-full
              h-14
              rounded-2xl
              bg-gradient-to-r
              from-yellow-500
              to-yellow-400
              text-black
              font-bold
              text-lg
              shadow-xl
              active:scale-95
              transition
            "
          >
            LET'S GO
          </button>

          <button
            onClick={() => navigate("/tutorial")}
            className="
              w-full
              h-14
              mt-3
              rounded-2xl
              border
              border-yellow-500/40
              bg-slate-900/60
              backdrop-blur
              text-white
              text-lg
              font-bold
            "
          >
            بزن بریم
          </button>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-6">

           

          </div>

        </div>

      </div>
    </div>
  );
}