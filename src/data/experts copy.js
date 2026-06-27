import kaveh from "../assets/characters/kaveh.png";
import kavehdetail from "../assets/characters/kavehdetail.png";
import aria from "../assets/characters/aria.png";
import ariadetail from "../assets/characters/ariadetail.png";
import rostam from "../assets/characters/rostam.png";
import rostamdetail from "../assets/characters/rostamdetail.png";
import daniyar from "../assets/characters/daniyar.png";
import daniyardetail from "../assets/characters/daniyardetail.png";
import shayan from "../assets/characters/shayan.png";
import shayandetail from "../assets/characters/shayandetail.png";

import sara from "../assets/characters/sara.png";
import saradetail from "../assets/characters/saradetail.png";
import nila from "../assets/characters/nila.png";
import niladetail from "../assets/characters/niladetail.png";
import ana from "../assets/characters/ana.png";
import anadetail from "../assets/characters/anadetail.png";
import mahsa from "../assets/characters/mahsa.png";
import mahsadetail from "../assets/characters/mahsadetail.png";
import layla from "../assets/characters/layla.png";
import layladetail from "../assets/characters/layladetail.png";
import bridgeEngineering from "../assets/educational/bridge.png";
import construction from "../assets/educational/construction.png";
import solarCells from "../assets/educational/solar.png";
import evBatteries from "../assets/educational/batteries.png";
import cleanEnergy from "../assets/educational/energy.png";

export const experts = [
 {
    id: 1,
    name: {
      en: "Kaveh",
      fa: "کاوه",
    },
    role: {
      en: "Geologist",
      fa: "زمین‌شناس",
    },
    phase: {
      en: "Exploration - Phase 1",
      fa: "اکتشاف - فاز ۱",
    },
    level: 3,
    currentXP: 180,
    maxXP: 300,
    color: "#EAB308",
    avatar: kaveh,
    avatardetail: kavehdetail,
    quote: {
      en: "The earth never lies — you just need to know where to listen",
      fa: "زمین هرگز دروغ نمی‌گوید؛ فقط باید بدانی کجا گوش بدهی.",
    },
    tools: [
      {
        icon: "⛏️",
        name: {
          en: "Rock Hammer",
          fa: "چکش زمین‌شناسی",
        },
      },

      {
        icon: "🔍",
        name: {
          en: "Magnifying Glass",
          fa: "ذره‌بین",
        },
      },

      {
        icon: "🗺️",
        name: {
          en: "Geological Maps",
          fa: "نقشه‌های زمین‌شناسی",
        },
      },

      {
        icon: "🧪",
        name: {
          en: "Sample Analysis Kit",
          fa: "کیت تحلیل نمونه‌های معدنی",
        },
      },
   ],

  education: {
    title: {
      en: "Bridge Engineering",
      fa: "مهندسی پل",
    },

    minerals: {
      en: ["Iron", "Silica", "Copper"],
      fa: ["آهن", "سیلیس", "مس"],
    },

    fact: {
      en: "Golden Gate Bridge uses 83,000 tons of steel.",
      fa: "پل گلدن گیت از ۸۳ هزار تن فولاد ساخته شده است.",
    },

    connection: {
      en: "BARIN hematite feeds directly into steel supply chain.",
      fa: "هماتیت BARIN مستقیماً زنجیره تأمین فولاد را تغذیه می‌کند.",
    },

    image: bridgeEngineering,
    color: "#F97316",
  },
 },

{
  id: 2,

  name: {
    en: "Aria",
    fa: "آریا",
  },

  role: {
    en: "Geophysicist",
    fa: "ژئوفیزیکدان",
  },

  phase: {
    en: "Exploration - Phase 1",
    fa: "اکتشاف - فاز ۱",
  },

  level: 2,
  currentXP: 140,
  maxXP: 350,

  color: "#06B6D4",

  avatar: aria,
  avatardetail: ariadetail,

  quote: {
    en: "Data is my compass — every signal hides a secret",
    fa: "داده‌ها قطب‌نمای من هستند؛ هر سیگنال رازی در دل خود دارد.",
  },

  tools: [
    {
      icon: "🛰️",
      name: {
        en: "Satellite Data",
        fa: "داده‌های ماهواره‌ای",
      },
    },

    {
      icon: "📡",
      name: {
        en: "Magnetic Field Sensors",
        fa: "حسگرهای میدان مغناطیسی",
      },
    },

    {
      icon: "📱",
      name: {
        en: "Digital Tablet",
        fa: "تبلت دیجیتال",
      },
    },

    {
      icon: "🎧",
      name: {
        en: "Headset",
        fa: "هدست ارتباطی",
      },
    },
  ],

  education: {
    title: {
      en: "Clean Energy",
      fa: "انرژی پاک",
    },

    image: cleanEnergy,

    minerals: {
      en: [
        "Steel",
        "Rare Earth",
        "Lithium",
        "Copper",
      ],

      fa: [
        "فولاد",
        "عناصر نادر خاکی",
        "لیتیوم",
        "مس",
      ],
    },

    fact: {
      en: "Clean energy uses 6x more minerals than fossil fuels.",
      fa: "انرژی‌های پاک شش برابر بیشتر از سوخت‌های فسیلی به مواد معدنی نیاز دارند.",
    },

    connection: {
      en: "BARIN sits at the core of the global clean energy transition.",
      fa: "BARIN در قلب گذار جهانی به انرژی پاک قرار دارد.",
    },

    color: "#06B6D4",
  },
},

{
  id: 3,

  name: {
    en: "Rostam",
    fa: "رستم",
  },

  role: {
    en: "Mining Engineer",
    fa: "مهندس معدن",
  },

  phase: {
    en: "Extraction - Phase 2",
    fa: "استخراج - فاز ۲",
  },

  level: 1,
  currentXP: 80,
  maxXP: 500,

  color: "#F97316",

  avatar: rostam,
  avatardetail: rostamdetail,

  quote: {
    en: "I design the mountain — before I move it",
    fa: "پیش از آنکه کوه را جابه‌جا کنم، آن را طراحی می‌کنم.",
  },

  tools: [
    {
      icon: "📐",
      name: {
        en: "Drill Blueprints",
        fa: "نقشه‌های حفاری",
      },
    },

    {
      icon: "💻",
      name: {
        en: "Pit Design Software",
        fa: "نرم‌افزار طراحی معدن روباز",
      },
    },

    {
      icon: "🚜",
      name: {
        en: "Heavy Machinery",
        fa: "ماشین‌آلات سنگین",
      },
    },

    {
      icon: "🧨",
      name: {
        en: "Explosives Plan",
        fa: "برنامه انفجار کنترل‌شده",
      },
    },
  ],

  education: {
    title: {
      en: "Construction",
      fa: "ساخت‌وساز",
    },

    image: construction,

    minerals: {
      en: [
        "Steel",
        "Aluminium",
        "Copper",
        "Gypsum",
      ],

      fa: [
        "فولاد",
        "آلومینیوم",
        "مس",
        "گچ",
      ],
    },

    fact: {
      en: "Average home uses 2-5 tons of steel.",
      fa: "یک خانه معمولی بین ۲ تا ۵ تن فولاد مصرف می‌کند.",
    },

    connection: {
      en: "Construction is the world's largest consumer of iron ore.",
      fa: "صنعت ساخت‌وساز بزرگ‌ترین مصرف‌کننده سنگ‌آهن در جهان است.",
    },

    color: "#F97316",
  },
},

{
  id: 4,

  name: {
    en: "Daniyar",
    fa: "دانیار",
  },

  role: {
    en: "Process Engineer",
    fa: "مهندس فرآوری",
  },

  phase: {
    en: "Processing - Phase 3",
    fa: "فرآوری - فاز ۳",
  },

  level: 1,
  currentXP: 60,
  maxXP: 600,

  color: "#22C55E",

  avatar: daniyar,
  avatardetail: daniyardetail,

  quote: {
    en: "Raw ore is the input — pure product is my art",
    fa: "سنگ معدن خام، ماده اولیه است؛ محصول خالص، هنر من است.",
  },

  tools: [
    {
      icon: "⚗️",
      name: {
        en: "Mineral Concentrate Flask",
        fa: "فلاسک کنسانتره معدنی",
      },
    },

    {
      icon: "📋",
      name: {
        en: "Clipboard",
        fa: "تخته یادداشت",
      },
    },

    {
      icon: "🥼",
      name: {
        en: "Lab Coat",
        fa: "روپوش آزمایشگاهی",
      },
    },

    {
      icon: "🪖",
      name: {
        en: "Green Safety Helmet",
        fa: "کلاه ایمنی سبز",
      },
    },
  ],

  education: {
    title: {
      en: "Solar Cells",
      fa: "سلول‌های خورشیدی",
    },

    image: solarCells,

    minerals: {
      en: [
        "Silicon",
        "Silver",
        "Copper",
      ],

      fa: [
        "سیلیکون",
        "نقره",
        "مس",
      ],
    },

    fact: {
      en: "95% of solar panels use pure silicon.",
      fa: "۹۵٪ پنل‌های خورشیدی از سیلیکون خالص استفاده می‌کنند.",
    },

    connection: {
      en: "BARIN supports the clean energy supply chain upstream.",
      fa: "BARIN از بخش بالادستی زنجیره تأمین انرژی پاک پشتیبانی می‌کند.",
    },

    color: "#22C55E",
  },
},

{
  id: 5,

  name: {
    en: "Shayan",
    fa: "شایان",
  },

  role: {
    en: "Commerce Director",
    fa: "مدیر بازرگانی",
  },

  phase: {
    en: "Sales & Export - Phase 4",
    fa: "فروش و صادرات - فاز ۴",
  },

  level: 1,
  currentXP: 40,
  maxXP: 800,

  color: "#A855F7",

  avatar: shayan,
  avatardetail: shayandetail,

  quote: {
    en: "Every shipment is a covenant — every blockchain a proof",
    fa: "هر محموله یک تعهد است و هر بلاکچین گواهی بر آن.",
  },

  tools: [
    {
      icon: "💼",
      name: {
        en: "Briefcase",
        fa: "کیف مدیریتی",
      },
    },

    {
      icon: "🌍",
      name: {
        en: "World Map",
        fa: "نقشه جهانی تجارت",
      },
    },

    {
      icon: "🚢",
      name: {
        en: "Cargo Ships",
        fa: "کشتی‌های باری",
      },
    },

    {
      icon: "📈",
      name: {
        en: "Global Market Analysis",
        fa: "تحلیل بازارهای جهانی",
      },
    },
  ],

  education: {
    title: {
      en: "EV Batteries",
      fa: "باتری خودروهای برقی",
    },

    image: evBatteries,

    minerals: {
      en: [
        "Lithium",
        "Nickel",
        "Cobalt",
        "Copper",
      ],

      fa: [
        "لیتیوم",
        "نیکل",
        "کبالت",
        "مس",
      ],
    },

    fact: {
      en: "By 2030 the world will need 40x more lithium.",
      fa: "تا سال ۲۰۳۰ جهان به ۴۰ برابر لیتیوم بیشتری نیاز خواهد داشت.",
    },

    connection: {
      en: "BARIN sits directly in the EV manufacturer supply chain.",
      fa: "BARIN به‌طور مستقیم در زنجیره تأمین تولیدکنندگان خودروهای برقی قرار دارد.",
    },

    color: "#A855F7",
  },
},

 {
    id: 6,
    name: "Sara",
    role: "Geologist",
    phase: "Exploration - Phase 1",
    level: 2,
    currentXP: 150,
    maxXP: 300,
    color: "#EAB308",
    avatar: sara,
    avatardetail: saradetail,
    quote: "The earth never lies — you just need to know where to listen",
    tools: [
    {
      icon: "⛏️",
      name: "Rock Hammer",
    },
    {
      icon: "🔍",
      name: "Magnifying Glass",
    },
    {
      icon: "🗺️",
      name: "Geological Maps",
    },
    {
      icon: "🧪",
      name: "Sample Analysis Kit",
    },
  ],
  education: {
    title: {
      en: "Bridge Engineering",
      fa: "مهندسی پل",
    },

    minerals: {
      en: ["Iron", "Silica", "Copper"],
      fa: ["آهن", "سیلیس", "مس"],
    },

    fact: {
      en: "Golden Gate Bridge uses 83,000 tons of steel.",
      fa: "پل گلدن گیت از ۸۳ هزار تن فولاد ساخته شده است.",
    },

    connection: {
      en: "BARIN hematite feeds directly into steel supply chain.",
      fa: "هماتیت BARIN مستقیماً زنجیره تأمین فولاد را تغذیه می‌کند.",
    },

    image: bridgeEngineering,
    color: "#F97316",
  },
  },

{
  id: 7,

  name: {
    en: "Nila",
    fa: "نیلا",
  },

  role: {
    en: "Geophysicist",
    fa: "ژئوفیزیکدان",
  },

  phase: {
    en: "Exploration - Phase 1",
    fa: "اکتشاف - فاز ۱",
  },

  level: 3,
  currentXP: 170,
  maxXP: 350,

  color: "#06B6D4",

  avatar: nila,
  avatardetail: niladetail,

  quote: {
    en: "Data is my compass — every signal hides a secret",
    fa: "داده‌ها قطب‌نمای من هستند؛ هر سیگنال رازی در دل خود دارد.",
  },

  tools: [
    {
      icon: "🛰️",
      name: {
        en: "Satellite Data",
        fa: "داده‌های ماهواره‌ای",
      },
    },

    {
      icon: "📡",
      name: {
        en: "Magnetic Field Sensors",
        fa: "حسگرهای میدان مغناطیسی",
      },
    },

    {
      icon: "📱",
      name: {
        en: "Digital Tablet",
        fa: "تبلت دیجیتال",
      },
    },

    {
      icon: "🎧",
      name: {
        en: "Headset",
        fa: "هدست ارتباطی",
      },
    },
  ],

  education: {
    title: {
      en: "Clean Energy",
      fa: "انرژی پاک",
    },

    image: cleanEnergy,

    minerals: {
      en: [
        "Steel",
        "Rare Earth",
        "Lithium",
        "Copper",
      ],

      fa: [
        "فولاد",
        "عناصر نادر خاکی",
        "لیتیوم",
        "مس",
      ],
    },

    fact: {
      en: "Clean energy uses 6x more minerals than fossil fuels.",
      fa: "انرژی‌های پاک شش برابر بیشتر از سوخت‌های فسیلی به مواد معدنی نیاز دارند.",
    },

    connection: {
      en: "BARIN sits at the core of the global clean energy transition.",
      fa: "BARIN در قلب گذار جهانی به انرژی پاک قرار دارد.",
    },

    color: "#06B6D4",
  },
},

{
    id: 8,
    name: "Ana",
    role: "Mining Engineer",
    phase: "Extraction - Phase 2",
    level: 1,
    currentXP: 30,
    maxXP: 500,
    color: "#F97316",
    avatar: ana,
    avatardetail: anadetail,
    quote: "I design the mountain — before I move it",
    tools: [
  {
    icon: "📐",
    name: "Drill Blueprints",
  },
  {
    icon: "💻",
    name: "Pit Design Software",
  },
  {
    icon: "🚜",
    name: "Heavy Machinery",
  },
  {
    icon: "🧨",
    name: "Explosives Plan",
  },
],

education: {
  title: "Construction",
  image: construction,

  minerals: [
    "Steel",
    "Aluminium",
    "Copper",
    "Gypsum",
  ],

  fact:
    "Average home uses 2-5 tons of steel.",

  connection:
    "Construction is the world's largest consumer of iron ore.",

  color: "#F97316",
}
  },

{
  id: 9,

  name: {
    en: "Mahsa",
    fa: "مهسا",
  },

  role: {
    en: "Process Engineer",
    fa: "مهندس فرآوری",
  },

  phase: {
    en: "Processing - Phase 3",
    fa: "فرآوری - فاز ۳",
  },

  level: 1,
  currentXP: 20,
  maxXP: 600,

  color: "#22C55E",

  avatar: mahsa,
  avatardetail: mahsadetail,

  quote: {
    en: "Raw ore is the input — pure product is my art",
    fa: "سنگ معدن خام، ماده اولیه است؛ محصول خالص، هنر من است.",
  },

  tools: [
    {
      icon: "⚗️",
      name: {
        en: "Mineral Concentrate Flask",
        fa: "فلاسک کنسانتره معدنی",
      },
    },

    {
      icon: "📋",
      name: {
        en: "Clipboard",
        fa: "تخته یادداشت",
      },
    },

    {
      icon: "🥼",
      name: {
        en: "Lab Coat",
        fa: "روپوش آزمایشگاهی",
      },
    },

    {
      icon: "🪖",
      name: {
        en: "Green Safety Helmet",
        fa: "کلاه ایمنی سبز",
      },
    },
  ],

  education: {
    title: {
      en: "Solar Cells",
      fa: "سلول‌های خورشیدی",
    },

    image: solarCells,

    minerals: {
      en: [
        "Silicon",
        "Silver",
        "Copper",
      ],

      fa: [
        "سیلیکون",
        "نقره",
        "مس",
      ],
    },

    fact: {
      en: "95% of solar panels use pure silicon.",
      fa: "۹۵٪ پنل‌های خورشیدی از سیلیکون خالص استفاده می‌کنند.",
    },

    connection: {
      en: "BARIN supports the clean energy supply chain upstream.",
      fa: "BARIN از بخش بالادستی زنجیره تأمین انرژی پاک پشتیبانی می‌کند.",
    },

    color: "#22C55E",
  },
}, 

{
  id: 10,

  name: {
    en: "Layla",
    fa: "لیلا",
  },

  role: {
    en: "Commerce Director",
    fa: "مدیر بازرگانی",
  },

  phase: {
    en: "Sales & Export - Phase 4",
    fa: "فروش و صادرات - فاز ۴",
  },

  level: 1,
  currentXP: 50,
  maxXP: 800,

  color: "#A855F7",

  avatar: layla,
  avatardetail: layladetail,

  quote: {
    en: "Every shipment is a covenant — every blockchain a proof",
    fa: "هر محموله یک تعهد است و هر بلاکچین گواهی بر آن.",
  },

  tools: [
    {
      icon: "💼",
      name: {
        en: "Briefcase",
        fa: "کیف مدیریتی",
      },
    },

    {
      icon: "🌍",
      name: {
        en: "World Map",
        fa: "نقشه جهانی تجارت",
      },
    },

    {
      icon: "🚢",
      name: {
        en: "Cargo Ships",
        fa: "کشتی‌های باری",
      },
    },

    {
      icon: "📈",
      name: {
        en: "Global Market Analysis",
        fa: "تحلیل بازارهای جهانی",
      },
    },
  ],

  education: {
    title: {
      en: "EV Batteries",
      fa: "باتری خودروهای برقی",
    },

    image: evBatteries,

    minerals: {
      en: [
        "Lithium",
        "Nickel",
        "Cobalt",
        "Copper",
      ],

      fa: [
        "لیتیوم",
        "نیکل",
        "کبالت",
        "مس",
      ],
    },

    fact: {
      en: "By 2030 the world will need 40x more lithium.",
      fa: "تا سال ۲۰۳۰ جهان به ۴۰ برابر لیتیوم بیشتری نیاز خواهد داشت.",
    },

    connection: {
      en: "BARIN sits directly in the EV manufacturer supply chain.",
      fa: "BARIN به‌طور مستقیم در زنجیره تأمین تولیدکنندگان خودروهای برقی قرار دارد.",
    },

    color: "#A855F7",
  },
},
];