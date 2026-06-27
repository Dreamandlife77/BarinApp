import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

import { experts } from "../data/experts";

export default function EducationDetail() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [language, setLanguage] =
    useState("en");

  useEffect(() => {
    const savedLanguage =
      localStorage.getItem("language") ||
      "en";

    setLanguage(savedLanguage);
  }, []);

  const expert = experts.find(
    (e) => String(e.id) === String(id)
  );

  if (!expert) {
    return (
      <div
        className="
          min-h-screen
          bg-[#020617]
          text-white
          flex
          items-center
          justify-center
        "
      >
        {language === "fa"
          ? "محتوا پیدا نشد"
          : "Content not found"}
      </div>
    );
  }

  const education =
    expert.education;

  return (
    <div
      dir={
        language === "fa"
          ? "rtl"
          : "ltr"
      }
      className="min-h-screen bg-[#020617]"
    >
      {/* Hero */}

      <div className="relative">
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
            bg-black/40
            backdrop-blur
            flex
            items-center
            justify-center
            text-white
          "
        >
          <ArrowLeft />
        </button>

        <img
          src={education.image}
          alt=""
          className="
            w-full
            h-auto
            object-cover
          "
        />
      </div>

      {/* Content */}

      <div className="p-4">
        <h1
          className="
            text-3xl
            font-bold
          "
          style={{
            color: education.color,
          }}
        >
          {
            education.title[
              language
            ]
          }
        </h1>

        {/* Minerals */}

        <div className="mt-6">
          <h3
            className="
              text-white
              font-bold
            "
          >
            {language === "fa"
              ? "مواد معدنی کلیدی"
              : "Key Minerals"}
          </h3>

          <div
            className="
              flex
              flex-wrap
              gap-2
              mt-3
            "
          >
            {education.minerals[
              language
            ].map((mineral) => (
              <span
                key={mineral}
                className="
                  bg-slate-900
                  px-3
                  py-1
                  rounded-full
                  text-white
                "
              >
                {mineral}
              </span>
            ))}
          </div>
        </div>

        {/* Fact */}

        <div className="mt-6">
          <h3
            className="
              text-white
              font-bold
            "
          >
            {language === "fa"
              ? "نکته مهم"
              : "Key Fact"}
          </h3>

          <p
            className="
              text-slate-300
              mt-2
              leading-relaxed
            "
          >
            {
              education.fact[
                language
              ]
            }
          </p>
        </div>

        {/* Connection */}

        <div className="mt-6">
          <h3
            className="
              text-white
              font-bold
            "
          >
            {language === "fa"
              ? "ارتباط با BARIN"
              : "BARIN Connection"}
          </h3>

          <p
            className="
              text-slate-300
              mt-2
              leading-relaxed
            "
          >
            {
              education.connection[
                language
              ]
            }
          </p>
        </div>
      </div>
    </div>
  );
}