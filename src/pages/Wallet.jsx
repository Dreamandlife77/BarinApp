import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ArrowLeft, Wallet } from "lucide-react";

import BottomNav from "../components/BottomNav";
import StakingPanel from "../components/StakingPanel";

// icons
import MetaMaskIcon from "../assets/Wallet/MetaMask.png";
import CoinbaseIcon from "../assets/Wallet/Coinbase.png";
import WalletConnectIcon from "../assets/Wallet/WalletConnect.png";

export default function WalletPage() {
  const navigate = useNavigate();

  useEffect(() => {
  const wcKeys = Object.keys(localStorage).filter((k) =>
    k.includes("walletconnect")
  );

  if (wcKeys.length > 1) {
    console.log("🧹 Cleaning duplicate WalletConnect sessions");
    wcKeys.forEach((k) => localStorage.removeItem(k));
  }
}, []);

  const { address, isConnected, status } = useAccount();
  const { connectAsync, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const isConnectingRef = useRef(false);
  const [log, setLog] = useState("");

  // ----------------------------
  // Detect Telegram
  // ----------------------------
  const isTelegram =
    typeof window !== "undefined" &&
    window.Telegram?.WebApp;

    const connectorsToUse = isTelegram
  ? connectors.filter((c) => c.id === "walletConnect")
  : connectors;

  // ----------------------------
  // DEBUG: connection state
  // ----------------------------
  useEffect(() => {
    console.log("Wallet status:", status);
  }, [status]);

  // ----------------------------
  // CLEAN OLD WALLET SESSIONS
  // IMPORTANT for stuck WalletConnect
  // ----------------------------
  useEffect(() => {
    Object.keys(localStorage).forEach((key) => {
      if (
        key.toLowerCase().includes("walletconnect") ||
        key.toLowerCase().includes("wc@") ||
        key.toLowerCase().includes("wagmi")
      ) {
        localStorage.removeItem(key);
      }
    });

    sessionStorage.clear();
  }, []);

  // ----------------------------
  // DEBUG TIME (fix WebSocket/JWT confusion)
  // ----------------------------
  useEffect(() => {
    const now = new Date();

    console.log("LOCAL:", now.toString());
    console.log("UTC:", now.toUTCString());
    console.log("ISO:", now.toISOString());
    console.log("UNIX:", Math.floor(Date.now() / 1000));
  }, []);

  // ----------------------------
  // SAFE CONNECT HANDLER
  // ----------------------------
  const handleConnect = async (id) => {
  const connector = connectors.find((c) => c.id === id);

  if (!connector) return;

  try {
    console.log("🔗 Opening wallet...");

    await connectAsync({
      connector,
    });

    console.log("✅ Wallet connected");

  } catch (err) {
    console.log("❌ Failed:", err);
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

      {/* STATUS */}
      <div className="px-4">
        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4">

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-yellow-500 flex items-center justify-center">
              <Wallet className="text-black" />
            </div>

            <div>
              <div className="text-slate-400 text-sm">
                Connected Wawllet
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
              className="mt-4 w-full py-2 rounded-lg bg-red-500 font-bold"
            >
              Disconnect
            </button>
          )}

          {/* DEBUG LOG */}
          {log && (
            <div className="text-xs text-yellow-400 mt-2">
              {log}
            </div>
          )}
        </div>
      </div>

      {/* WALLET OPTIONS */}
      <div className="px-4 mt-5">

        <div className="grid grid-cols-3 gap-3">

          {/* META MASK */}
          <button
            disabled={isTelegram}
            onClick={() => handleConnect("metaMaskSDK")}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center opacity-40"
          >
            <img src={MetaMaskIcon} className="w-12 h-12 mb-2" />
            <span className="text-sm">MetaMask</span>
          </button>

          {/* WALLETCONNECT (ONLY SAFE ONE IN TELEGRAM) */}
          <button
            onClick={() => handleConnect("walletConnect")}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center hover:border-purple-500"
          >
            <img src={WalletConnectIcon} className="w-12 h-12 mb-2" />
            <span className="text-sm">WalletConnect</span>
          </button>

          {/* COINBASE */}
          <button
            disabled={isTelegram}
            onClick={() => handleConnect("coinbaseWalletSDK")}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center opacity-40"
          >
            <img src={CoinbaseIcon} className="w-12 h-12 mb-2" />
            <span className="text-sm">Coinbase</span>
          </button>

        </div>

        {isPending && (
          <div className="text-center text-yellow-400 mt-3">
            Waiting for wallet approval...
          </div>
        )}
      </div>

      {/* STAKING */}
      <div className="px-4 mt-6">
        <div className="text-lg font-bold mb-2">
          BARIN Stakinddwg
        </div>

        <StakingPanel />
      </div>

      <BottomNav />
    </div>
  );
}