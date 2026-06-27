export function getTier(barin) {

  if (barin >= 5000) {
    return {
      name: "Gold",
      color: "text-yellow-400",
      boost: 3
    };
  }

  if (barin >= 1000) {
    return {
      name: "Silver",
      color: "text-slate-300",
      boost: 2
    };
  }

  return {
    name: "Bronze",
    color: "text-orange-400",
    boost: 1
  };
}