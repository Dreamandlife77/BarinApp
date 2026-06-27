import { experts } from "./experts";

export const expertPairs = [
  {
    male: experts.find(e => e.id === 1),
    female: experts.find(e => e.id === 6),
  },

  {
    male: experts.find(e => e.id === 2),
    female: experts.find(e => e.id === 7),
  },

  {
    male: experts.find(e => e.id === 3),
    female: experts.find(e => e.id === 8),
  },

  {
    male: experts.find(e => e.id === 4),
    female: experts.find(e => e.id === 9),
  },

  {
    male: experts.find(e => e.id === 5),
    female: experts.find(e => e.id === 10),
  },
];