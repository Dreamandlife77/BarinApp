import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ArrowLeft, Wallet } from "lucide-react";

import BottomNav from "../components/BottomNav";
import StakingPanel from "../components/StakingPanel";

// Wallet icons
import MetaMaskIcon from "../assets/Wallet/MetaMask.png";
import CoinbaseIcon from "../assets/Wallet/Coinbase.png";
import WalletConnectIcon from "../assets/Wallet/WalletConnect.png";

export default function WalletPage() {
  const navigate = useNavigate();
//
  const { address, isConnected } = useAccount();
  const { connectAsync, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const [loading, setLoading] = useState(false);
  const isConnectingRef = useRef(false);

  // -----------------------------
  // Detect Telegram environment Wallet
  // -----------------------------
  const isTelegram =
    typeof window !== "undefined" &&
    window.Telegram?.WebApp;

  const allowedConnectors = connectors.filter((c) => {
  if (isTelegram) {
    return c.id === "walletConnect";
  }
  return true;
});

  // -----------------------------
  // Clear stuck WalletConnect sessions
  // -----------------------------
  useEffect(() => {
    Object.keys(localStorage).forEach((key) => {
      if (key.toLowerCase().includes("walletconnect")) {
        localStorage.removeItem(key);
      }
    });

    sessionStorage.clear();
  }, []);

  // -----------------------------
  // Safe connect handler
  // -----------------------------
 const handleConnect = async (connectorId) => {
  if (isConnectingRef.current) return;

  isConnectingRef.current = true;

  try {
    const connector = connectors.find(
      (c) => c.id === connectorId
    );

    if (!connector) return;

    console.log("Connecting:", connector.name);

    await connectAsync({ connector });

  } catch (err) {
    console.error(err);
  } finally {
    isConnectingRef.current = false;
  }
};

  return (
    <div className="min-h-screen bg-[#020617] pb-24 text-white">

      {/* HEADER */}
      <div className="p-4 flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center"
        >
          <ArrowLeft />
        </button>

        <h1 className="text-xl font-bold">Wallet</h1>

        <div className="w-10" />
      </div>

      {/* WALLET STATUS */}
      <div className="px-4">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 rounded-2xl p-4">

          <div className="flex items-center gap-3">

            <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center">
              <Wallet className="text-black" />
            </div>

            <div>
              <div className="text-slate-400 text-sm">
                Connected Wallet
              </div>

              <div className="text-white font-bold">
                {isConnected
                  ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
                  : "Not Connected"}
              </div>
            </div>

          </div>

          {isConnected && (
            <button
              onClick={() => disconnect()}
              className="mt-4 w-full py-2 rounded-lg bg-red-500 text-white font-bold"
            >
              Disconnect
            </button>
          )}

        </div>
      </div>

      {/* WALLET OPTIONS */}
      <div className="px-4 mt-5">

        <div className="grid grid-cols-3 gap-3">

          {/* META MASK (disabled in Telegram for safety) */}
          <button
            disabled={isTelegram}
            onClick={() => handleConnect("metaMaskSDK")}
            className={`bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center transition ${
              isTelegram ? "opacity-40 cursor-not-allowed" : "hover:border-orange-500"
            }`}
          >
            <img src={MetaMaskIcon} className="w-12 h-12 mb-2" />
            <span className="text-sm">MetaMask</span>
          </button>

          {/* WALLETCONNECT (MAIN SAFE OPTION) */}
          <button
            onClick={() => handleConnect("walletConnect")}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center hover:border-purple-500 transition"
          >
            <img src={WalletConnectIcon} className="w-12 h-12 mb-2" />
            <span className="text-sm">WalletConnect</span>
          </button>

          {/* COINBASE (disabled in Telegram) */}
          <button
            disabled={isTelegram}
            onClick={() => handleConnect("coinbaseWalletSDK")}
            className={`bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center transition ${
              isTelegram ? "opacity-40 cursor-not-allowed" : "hover:border-blue-500"
            }`}
          >
            <img src={CoinbaseIcon} className="w-12 h-12 mb-2" />
            <span className="text-sm">Coinbase</span>
          </button>

        </div>

        {(loading || isPending) && (
          <div className="text-center text-yellow-400 mt-3">
            Connecting wallet...
          </div>
        )}

      </div>

      {/* STAKING */}
      <div className="px-4 mt-6">

        <div className="mb-2 text-lg font-bold">
          BARIN Staking
        </div>

        <StakingPanel />
      </div>

      <BottomNav />
    </div>
  );
}