import { useAccount, useDisconnect } from "wagmi";
import { useEffect } from "react";

export default function useWallet() {
  const { address, isConnected, chainId } = useAccount();
  const { disconnect } = useDisconnect();

  // session persistence fallback
  useEffect(() => {
    if (isConnected && address) {
      localStorage.setItem("wallet", address);
    }
  }, [address, isConnected]);

  const logout = () => {
    localStorage.removeItem("wallet");
    disconnect();
  };

  return {
    address,
    isConnected,
    chainId,
    logout,
  };
}