import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";

import tutorial1 from "../assets/tutorial1.png";
import tutorial2 from "../assets/tutorial2.png";
import tutorial3 from "../assets/tutorial3.png";
import tutorial4 from "../assets/tutorial4.png";

import Irflag from "../assets/IR.jpg"
import USflag from "../assets/US.png"

import { translations } from "../data/translations";

const slides = [
  {
    image: tutorial1,
    title: "Welcome to\nBARIN Mining Quest!",
    description:
      "An educational mining game where you learn, play and earn BARIN tokens.",
  },

  {
    image: tutorial2,
    title: "Learn From\nMining Experts",
    description:
      "Meet real-world mining specialists and discover how minerals move from exploration to global markets.",
  },

  {
    image: tutorial3,
    title: "Mine Minerals\nComplete Missions",
    description:
      "Tap ore rocks, complete educational challenges and gain experience as you progress.",
  },

  {
    image: tutorial4,
    title: "Earn Rewards\nBuild Your Future",
    description:
      "Unlock experts and climb the leaderboard.",
  },
];

export default function Onboarding() {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const [language, setLanguage] = useState("en");
  const t = translations[language];

  const [showLanguageModal, setShowLanguageModal] =
    useState(false);

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem("language") || "en";

    setLanguage(savedLanguage);
  }, []);

  const confirmLanguage = (lang) => {
    setLanguage(lang);

    localStorage.setItem("language", lang);

    setShowLanguageModal(false);
  };

  return (
    <>
      <div   className="min-h-screen bg-[#020617] px-6 py-8 flex flex-col">

        {/* LANGUAGE BUTTON */}

        <div className="flex justify-end">

          <button
            onClick={() =>
              setShowLanguageModal(true)
            }
            className="
              bg-slate-900
              border
              border-slate-700
              rounded-full
              px-4
              py-2
              text-white
              flex
              items-center
              gap-2
            "
          >
            🌐 {language === "en" ? "EN" : "FA"}
          </button>

        </div>

        {/* CAROUSEL */}

        <div className="flex-1">

          <Swiper
            modules={[Pagination]}
            loop={true}
            grabCursor={true}
            onSlideChange={(swiper) =>
              setActiveIndex(swiper.realIndex)
            }
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>

                <div className="pt-8" dir={language === "fa" ? "rtl" : "ltr"}>

                  <span className="text-yellow-500 font-bold">
                    {index + 1}/4
                  </span>

                  <h1
                    className="
                      text-white
                      text-xl
                      font-bold
                      mt-4
                      whitespace-pre-line
                    "
                  >
                    {t.slides[index].title}
                  </h1>

                  <p
                    className="
                      text-slate-300
                      mt-2
                      leading-relaxed
                    "
                  >
                    {t.slides[index].description}
                  </p>

                  <div className="mt-1 flex justify-center">

                    <img
                      src={slide.image}
                      alt=""
                      className="
                        w-[280px]
                        object-contain
                      "
                    />

                  </div>

                </div>

              </SwiperSlide>
            ))}
          </Swiper>

        </div>

        {/* DOTS */}

        <div className="flex justify-center gap-2 mb-6">

          {slides.map((_, index) => (
            <div
              key={index}
              className={`
                h-2 w-2 rounded-full
                ${
                  activeIndex === index
                    ? "bg-yellow-500"
                    : "bg-slate-600"
                }
              `}
            />
          ))}

        </div>
        <div className="pb-10">

          <button
            onClick={() => navigate("/login")}
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
            {t.next}
          </button>
        </div>

      </div>

      {/* LANGUAGE MODAL */}

      {showLanguageModal && (
        <LanguageModal
          currentLanguage={language}
          language={language}
          onConfirm={confirmLanguage}
          onClose={() =>
            setShowLanguageModal(false)
          }
        />
      )}
    </>
  );
}

function LanguageModal({
  currentLanguage,
  onConfirm,
  language,
  onClose,
}) {
  const [selected, setSelected] = useState(
    currentLanguage
  );

  const t = translations[language];

  return (
    <div

      className="
        fixed
        inset-0
        z-50
        bg-[#020617]
        px-6
        py-10
        flex
        flex-col
      "
    >
      <h2
        className="
          text-white
          text-3xl
          font-bold
          text-center
          mb-10
        "
      >
        {t.chooseLanguage}
      </h2>

      {/* ENGLISH */}

      <button
        onClick={() => setSelected("en")}
        className={`
          p-5
          rounded-3xl
          border
          flex
          items-center
          justify-between
          mb-4
          ${
            selected === "en"
              ? "border-yellow-500"
              : "border-slate-700"
          }
        `}
      >
        <div className="flex items-center gap-4">

          <img
            src={USflag}
            alt="English"
            className="w-12 h-12 rounded-full"
          />

          <span className="text-white text-lg">
            English
          </span>

        </div>

        {selected === "en" && (
          <span className="text-yellow-500 text-3xl">
            ✓
          </span>
        )}
      </button>

      {/* PERSIAN */}

      <button
        onClick={() => setSelected("fa")}
        className={`
          p-5
          rounded-3xl
          border
          flex
          items-center
          justify-between
          ${
            selected === "fa"
              ? "border-yellow-500"
              : "border-slate-700"
          }
        `}
      >
        <div className="flex items-center gap-4">

          <img
            src={Irflag}
            alt="English"
            className="w-12 h-12 rounded-full"
          />

          <div className="text-left">

            <div className="text-white text-lg">
              فارسی
            </div>

            <div className="text-slate-400">
              Persian (Farsi)
            </div>

          </div>

        </div>

        {selected === "fa" && (
          <span className="text-yellow-500 text-3xl">
            ✓
          </span>
        )}
      </button>

      <div className="flex-1" />

      <button
        onClick={() =>
          onConfirm(selected)
        }
        className="
          h-14
          rounded-2xl
          bg-yellow-500
          text-black
          font-bold
        "
      >
        {t.confirm}
      </button>
      <p
        className="
          text-center
          text-slate-400
          mt-6
        "
      >
        {t.changeLater}
      </p>
    </div>
  );
}