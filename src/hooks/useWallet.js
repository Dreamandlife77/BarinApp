import {
  useAccount,
  useConnect,
  useDisconnect,
  useBalance,
} from "wagmi";

import { useEffect } from "react";
import { useWalletStore } from "../store/walletStore";

export default function useWallet() {

  const setWallet = useWalletStore((s) => s.setWallet);
  const resetWallet = useWalletStore((s) => s.resetWallet);

  const {
    address,
    isConnected,
    chainId,   // ✅ FIX: use chainId instead of chain
  } = useAccount();

  const {
    connect,
    connectors,
    isPending,
  } = useConnect();

  const { disconnect } = useDisconnect();

  const { data: balance } = useBalance({
    address,
    watch: true, // 🔥 auto refresh balance
  });

  // =========================
  // SYNC WALLET STATE
  // =========================
  useEffect(() => {
    if (isConnected && address) {
      setWallet({
        address,
        chainId,
        isConnected: true,
      });

      localStorage.setItem("wallet", address);
    } else {
      resetWallet();
    }
  }, [isConnected, address, chainId]);

  // =========================
  // AUTO RESTORE SESSION
  // =========================
  useEffect(() => {
    const saved = localStorage.getItem("wallet");

    if (saved && !isConnected) {
      setWallet({
        address: saved,
        isConnected: false, // will reconnect when wagmi boots
      });
    }
  }, []);

  return {
    address,
    isConnected,
    chainId,   // ✅ FIXED
    connect,
    connectors,
    isPending,
    disconnect,
    balance,
  };
}

// =========================
// POLYGON GUARD
// =========================
export function useNetworkGuard(chainId) {
  useEffect(() => {
    if (chainId && chainId !== 137) {
      alert("⚠️ Please switch to Polygon network");
    }
  }, [chainId]);
}