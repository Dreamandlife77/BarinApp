import { create } from "zustand";

export const useWalletStore = create((set) => ({
  address: null,
  chain: null,
  isConnected: false,

  setWallet: (data) =>
    set({
      ...data,
    }),

  resetWallet: () =>
    set({
      address: null,
      chain: null,
      isConnected: false,
    }),
}));