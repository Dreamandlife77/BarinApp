import hematite from "../assets/minerals/Fe.png";
import copper from "../assets/minerals/Cu.png";
import lithium from "../assets/minerals/Li.png";
import nickel from "../assets/minerals/Ni.png";
import gold from "../assets/minerals/Au.png";

import Fe from "../assets/minerals/Fe.png";
import Fe1 from "../assets/minerals/Fe1.png";
import Fe2 from "../assets/minerals/Fe2.png";
import Fe3 from "../assets/minerals/Fe3.png";

import Au from "../assets/minerals/Au.png";
import Au1 from "../assets/minerals/Au1.png";
import Au2 from "../assets/minerals/Au2.png";
import Au3 from "../assets/minerals/Au3.png";

import Li from "../assets/minerals/Li.png";
import Li1 from "../assets/minerals/Li1.png";
import Li2 from "../assets/minerals/Li2.png";
import Li3 from "../assets/minerals/Li3.png";

import Ni from "../assets/minerals/Ni.png";
import Ni1 from "../assets/minerals/Ni1.png";
import Ni2 from "../assets/minerals/Ni2.png";
import Ni3 from "../assets/minerals/Ni3.png";

import Cu from "../assets/minerals/Cu.png";
import Cu1 from "../assets/minerals/Cu1.png";
import Cu2 from "../assets/minerals/Cu2.png";
import Cu3 from "../assets/minerals/Cu3.png";

export const minerals = [
  {
    id: 1,
    name: {
      en: "Iron / Hematite",
      fa: "آهن / هماتیت",
    },
    rarity: {
      en: "Common",
      fa: "رایج",
    },
    symbol: "Fe",
    color: "#EF4444",
    reward: 10,
    hp: 300,
    images: [
      Fe,
      Fe1,
      Fe2,
      Fe3,
    ],
  },

  {
    id: 2,
    name: {
      en: "Copper",
      fa: "مس",
    },
    rarity: {
      en: "Common",
      fa: "رایج",
    },
    symbol: "Cu",
    color: "#F97316",
    reward: 15,
    hp: 400,
    images: [
      Cu,
      Cu1,
      Cu2,
      Cu3,
    ],
  },

  {
    id: 3,
    name: {
      en: "Lithium",
      fa: "لیتیوم",
    },
    rarity: {
      en: "Uncommon",
      fa: "غیرمعمول",
    },
    symbol: "Li",
    color: "#22C55E",
    reward: 25,
    hp: 600,
    images: [
      Li,
      Li1,
      Li2,
      Li3,
    ],
  },

  {
    id: 4,
    name: {
      en: "Nickel",
      fa: "نیکل",
    },
    rarity: {
      en: "Uncommon",
      fa: "غیرمعمول",
    },
    symbol: "Ni",
    color: "#A855F7",
    reward: 20,
    hp: 500,
    images: [
      Ni,
      Ni1,
      Ni2,
      Ni3,
    ],
  },

  {
    id: 5,
    name: {
      en: "Gold",
      fa: "طلا",
    },
    rarity: {
      en: "Rare",
      fa: "کمیاب",
    },
    symbol: "Au",
    color: "#EAB308",
    reward: 50,
    hp: 800,
    images: [
      Au,
      Au1,
      Au2,
      Au3,
    ],
  },
];