import { create } from "zustand";

export const useStakingStore = create((set) => ({
  stakedAmount: 0,
  multiplier: 1,
  isStaked: false,

  stake: (amount) =>
    set(() => ({
      stakedAmount: amount,
      isStaked: true,
      multiplier: amount >= 1000 ? 2 : 1.5,
    })),

  unstake: () =>
    set(() => ({
      stakedAmount: 0,
      isStaked: false,
      multiplier: 1,
    })),
}));