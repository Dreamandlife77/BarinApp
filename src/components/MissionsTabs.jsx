import MissionCard from "./MissionCard";

export default function MissionsTab({
  expert,
}) {

  const missions =
  getMissionsByRole(
    expert.role?.en
  );

  return (
    <div className="space-y-3">

      {missions.map((mission, index) => (

        <MissionCard
          key={index}
          mission={mission}
        />

      ))}

    </div>
  );
}

function getMissionsByRole(role) {

  const data = {

    Geologist: [
      {
        title: {
          en: "Mineral Identification",
          fa: "شناسایی مواد معدنی",
        },
        description: {
          en: "Write a post about hematite or magnetite.",
          fa: "درباره هماتیت یا مگنتیت یک پست منتشر کنید.",
        },
        reward: "30 BARIN",
        platform: {
          en: "X (Twitter)",
          fa: "ایکس (توییتر)",
        },
      },

      {
        title: {
          en: "Deposit Mapping",
          fa: "نقشه‌برداری ذخایر",
        },
        description: {
          en: "Share BARIN mine infographic on Telegram.",
          fa: "اینفوگرافیک معدن BARIN را در تلگرام به اشتراک بگذارید.",
        },
        reward: "25 BARIN",
        platform: {
          en: "Telegram",
          fa: "تلگرام",
        },
      },

      {
        title: {
          en: "Digital Explorer",
          fa: "اکتشاف‌گر دیجیتال",
        },
        description: {
          en: "Refer a new member to BARIN community.",
          fa: "یک عضو جدید را به جامعه BARIN معرفی کنید.",
        },
        reward: "35 BARIN",
        platform: {
          en: "Telegram",
          fa: "تلگرام",
        },
      },

      {
        title: {
          en: "Exploration Report",
          fa: "گزارش اکتشاف",
        },
        description: {
          en: "Answer weekly technical question.",
          fa: "به سوال فنی هفتگی پاسخ دهید.",
        },
        reward: "40 BARIN",
        platform: {
          en: "Telegram",
          fa: "تلگرام",
        },
      },
    ],

    Geophysicist: [
      {
        title: {
          en: "Aerial Map",
          fa: "نقشه هوایی",
        },
        description: {
          en: "Explain aerial vs ground exploration methods.",
          fa: "تفاوت روش‌های اکتشاف هوایی و زمینی را توضیح دهید.",
        },
        reward: "35 BARIN",
        platform: {
          en: "X (Twitter)",
          fa: "ایکس (توییتر)",
        },
      },

      {
        title: {
          en: "Signal Detection",
          fa: "تشخیص سیگنال",
        },
        description: {
          en: "Write a thread about AI in mineral exploration.",
          fa: "یک رشته‌توییت درباره هوش مصنوعی در اکتشاف معدنی بنویسید.",
        },
        reward: "45 BARIN",
        platform: {
          en: "X (Twitter)",
          fa: "ایکس (توییتر)",
        },
      },

      {
        title: {
          en: "Global Coverage",
          fa: "پوشش جهانی",
        },
        description: {
          en: "Introduce BARIN to an English-speaking group.",
          fa: "BARIN را به یک گروه انگلیسی‌زبان معرفی کنید.",
        },
        reward: "40 BARIN",
        platform: {
          en: "International",
          fa: "بین‌المللی",
        },
      },

      {
        title: {
          en: "Data Analysis",
          fa: "تحلیل داده",
        },
        description: {
          en: "Create a short video about BARIN technical data.",
          fa: "یک ویدیوی کوتاه درباره داده‌های فنی BARIN تهیه کنید.",
        },
        reward: "50 BARIN",
        platform: {
          en: "Telegram",
          fa: "تلگرام",
        },
      },
    ],

    "Mining Engineer": [
      {
        title: {
          en: "Pit Design",
          fa: "طراحی معدن روباز",
        },
        description: {
          en: "Explain open-pit vs underground mining.",
          fa: "تفاوت معدن‌کاری روباز و زیرزمینی را توضیح دهید.",
        },
        reward: "40 BARIN",
        platform: {
          en: "Telegram",
          fa: "تلگرام",
        },
      },

      {
        title: {
          en: "Controlled Blast",
          fa: "انفجار کنترل‌شده",
        },
        description: {
          en: "Write a post with #BarinMining about extraction.",
          fa: "یک پست با هشتگ #BarinMining درباره استخراج منتشر کنید.",
        },
        reward: "45 BARIN",
        platform: {
          en: "X (Twitter)",
          fa: "ایکس (توییتر)",
        },
      },

      {
        title: {
          en: "Digital Modeling",
          fa: "مدل‌سازی دیجیتال",
        },
        description: {
          en: "Create an infographic of extraction phases.",
          fa: "اینفوگرافیکی از مراحل استخراج طراحی کنید.",
        },
        reward: "55 BARIN",
        platform: {
          en: "Telegram",
          fa: "تلگرام",
        },
      },

      {
        title: {
          en: "Team Building",
          fa: "توسعه تیم",
        },
        description: {
          en: "Refer 3 new members to BARIN community.",
          fa: "سه عضو جدید را به جامعه BARIN معرفی کنید.",
        },
        reward: "60 BARIN",
        platform: {
          en: "Telegram",
          fa: "تلگرام",
        },
      },
    ],

    "Process Engineer": [
      {
        title: {
          en: "Digital Crushing",
          fa: "خردایش دیجیتال",
        },
        description: {
          en: "Explain difference between raw ore and concentrate.",
          fa: "تفاوت سنگ معدن خام و کنسانتره را توضیح دهید.",
        },
        reward: "50 BARIN",
        platform: {
          en: "X (Twitter)",
          fa: "ایکس (توییتر)",
        },
      },

      {
        title: {
          en: "Quality Testing",
          fa: "آزمایش کیفیت",
        },
        description: {
          en: "Answer a technical processing question.",
          fa: "به یک سوال فنی درباره فرآوری پاسخ دهید.",
        },
        reward: "60 BARIN",
        platform: {
          en: "Telegram",
          fa: "تلگرام",
        },
      },

      {
        title: {
          en: "Plant Design",
          fa: "طراحی کارخانه",
        },
        description: {
          en: "Create a processing infographic.",
          fa: "یک اینفوگرافیک از مراحل فرآوری طراحی کنید.",
        },
        reward: "70 BARIN",
        platform: {
          en: "X (Twitter)",
          fa: "ایکس (توییتر)",
        },
      },

      {
        title: {
          en: "Sustainable Processing",
          fa: "فرآوری پایدار",
        },
        description: {
          en: "Write about BARIN ESG approach.",
          fa: "درباره رویکرد ESG شرکت BARIN بنویسید.",
        },
        reward: "55 BARIN",
        platform: {
          en: "X (Twitter)",
          fa: "ایکس (توییتر)",
        },
      },
    ],

    "Commerce Director": [
      {
        title: {
          en: "Digital Export",
          fa: "صادرات دیجیتال",
        },
        description: {
          en: "Introduce BARIN to 2 English-language groups.",
          fa: "BARIN را به دو گروه انگلیسی‌زبان معرفی کنید.",
        },
        reward: "70 BARIN",
        platform: {
          en: "International",
          fa: "بین‌المللی",
        },
      },

      {
        title: {
          en: "EV Market Analysis",
          fa: "تحلیل بازار خودروهای برقی",
        },
        description: {
          en: "Explain the role of minerals in the EV industry.",
          fa: "نقش مواد معدنی در صنعت خودروهای برقی را توضیح دهید.",
        },
        reward: "65 BARIN",
        platform: {
          en: "X (Twitter)",
          fa: "ایکس (توییتر)",
        },
      },

      {
        title: {
          en: "Blockchain in Export",
          fa: "بلاکچین در صادرات",
        },
        description: {
          en: "Write a thread about blockchain and mineral exports.",
          fa: "یک رشته‌توییت درباره بلاکچین و صادرات مواد معدنی بنویسید.",
        },
        reward: "80 BARIN",
        platform: {
          en: "X (Twitter)",
          fa: "ایکس (توییتر)",
        },
      },

      {
        title: {
          en: "BARIN Ambassador",
          fa: "سفیر BARIN",
        },
        description: {
          en: "Produce an article or short podcast about BARIN.",
          fa: "یک مقاله یا پادکست کوتاه درباره BARIN تولید کنید.",
        },
        reward: "100 BARIN",
        platform: {
          en: "Any Platform",
          fa: "هر پلتفرمی",
        },
      },
    ],
  };

  return data[role] || [];
}