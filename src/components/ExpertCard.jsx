import { useNavigate } from "react-router-dom";
import { Mars, Venus } from "lucide-react";
import { useState, useEffect } from "react";

export default function ExpertCard({ pair, rank }) {

  const [gender, setGender] = useState("male");
  const navigate = useNavigate();
  const expert =
    gender === "male"
      ? pair.male
      : pair.female;

  const progress =
    (expert.currentXP / expert.maxXP) * 100;
  
    const [language, setLanguage] =
      useState("en");

    useEffect(() => {
      const savedLanguage =
        localStorage.getItem("language") || "en";

      setLanguage(savedLanguage);
    }, []);

  return (
    <div
      dir={language === "fa" ? "rtl" : "ltr"}
      onClick={() =>
        navigate(`/home/${expert.id}`)
      }
      className="
        bg-[#091827]
        rounded-3xl
        border
        border-slate-700
        p-4
        mb-3
        relative
        cursor-pointer
      "
    >
      {/* Gender Toggle */}

      <div
        className="
          absolute
          top-3
          left-3
          flex
          bg-black/30
          rounded-full
          overflow-hidden
          z-10
        "
      >

      <button
        onClick={(e) => {
          e.stopPropagation();
          setGender("male");
        }}
        className={`
          px-3
          py-1
          ${
            gender === "male"
              ? "bg-yellow-500 text-black"
              : "text-white"
          }
        `}
      >
        <Mars size={12} strokeWidth={3.5} />
      </button>  
        
      <button
        onClick={(e) => {
          e.stopPropagation();
          setGender("female");
        }}
        className={`
          px-3
          py-1
          flex
          items-center
          justify-center

          ${
            gender === "female"
              ? "bg-yellow-500 text-black"
              : "text-white"
          }
        `}
      >
        <Venus size={12} strokeWidth={3.5} />
      </button>
      </div>

      {/* Content */}

      <div className="flex gap-4 pt-6">

        <img
          src={expert.avatar}
          alt={expert.name[language]}
          className="
            rounded-xl
            w-22
            h-22
            object-contain
          "
        />

        <div className="flex-1">

          <div className="flex gap-2 items-center">

            <h4
              className="
                text-white
                text-lg
                font-bold
              "
            >
              {expert.name[language]}
            </h4>

            <p
              className="text-sm font-medium"
              style={{
                color: expert.color,
              }}
            >
              {expert.role[language]}
            </p>

          </div>

          <p className="text-slate-400 text-sm">
            {expert.phase[language]}
          </p>

          <div className="flex justify-between mt-1">

            <span className="text-white text-sm">
              {language === "fa"
              ? `سطح ${expert.level}`
              : `Level ${expert.level}`}
            </span>

            <span className="text-slate-400 text-sm">
              {expert.currentXP} / {expert.maxXP} XP
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
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                backgroundColor: expert.color,
              }}
            />
          </div>

        </div>

      </div>

      {/* Rank Circle */}

      <div
      onClick={(e) => {
            e.stopPropagation();
            navigate(`/experts/${expert.id}`)
          }} 

        className="
          absolute
          right-2
          top-2
          rounded-3xl
          px-4
          py-1
          text-white
          text-xs
          font-semibold
          shadow-lg
        "
        style={{
          backgroundColor: expert.color,
        }}
      >
    {language === "fa"
      ? "بیشتر"
      : "More..."}
  </div>

    </div>
  );
}