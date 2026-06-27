import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ArrowLeft, Wallet } from "lucide-react";

import BottomNav from "../components/BottomNav";
import StakingPanel from "../components/StakingPanel";

import MetaMaskIcon from "../assets/Wallet/MetaMask.png";
import CoinbaseIcon from "../assets/Wallet/Coinbase.png";
import WalletConnectIcon from "../assets/Wallet/WalletConnect.png";

export default function WalletPage() {
  const navigate = useNavigate();

  const { address, isConnected, status } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const isConnecting = useRef(false);
  const [statusText, setStatusText] = useState("");

  // -----------------------------
  // Detect Telegram
  // -----------------------------
  const isTelegram =
    typeof window !== "undefined" &&
    window.Telegram?.WebApp;

  // -----------------------------
  // CLEAN WALLETCONNECT SESSIONS (CRITICAL FIX)
  // -----------------------------
  const clearWalletSessions = () => {
    Object.keys(localStorage).forEach((key) => {
      if (
        key.includes("walletconnect") ||
        key.includes("wc@") ||
        key.includes("WAGMI")
      ) {
        localStorage.removeItem(key);
      }
    });

    sessionStorage.clear();
  };

  useEffect(() => {
    clearWalletSessions();
  }, []);

  // -----------------------------
  // AUTO DETECT CONNECTION (FIX TELEGRAM CALLBACK LOSS)
  // -----------------------------
  useEffect(() => {
    if (!isTelegram) return;

    const interval = setInterval(() => {
      if (isConnected && address) {
        setStatusText("Wallet connected successfully ✅");
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isConnected, address, isTelegram]);

  // -----------------------------
  // DEBUG STATUS
  // -----------------------------
  useEffect(() => {
    console.log("Wallet status:", status);
  }, [status]);

  // -----------------------------
  // CONNECT HANDLER (FIXED + SAFE)
  // -----------------------------
  const handleConnect = async (id) => {
    if (isConnecting.current) return;
    isConnecting.current = true;

    try {
      const connector = connectors.find((c) => c.id === id);

      if (!connector) {
        console.error("Connector not found:", id);
        return;
      }

      setStatusText(`Opening ${connector.name}...`);

      await connectAsync({ connector });

      setStatusText("Waiting for wallet approval...");

    } catch (err) {
      console.error(err);
      setStatusText("Connection failed or rejected");
    } finally {
      isConnecting.current = false;
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
                Connected Wallet
              </div>

              <div className="text-white font-bold">
                {isConnected
                  ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
                  : "Not Connected"}
              </div>
            </div>
          </div>

          {statusText && (
            <div className="text-xs text-yellow-400 mt-2">
              {statusText}
            </div>
          )}

          {isConnected && (
            <button
              onClick={() => disconnect()}
              className="mt-4 w-full py-2 rounded-lg bg-red-500 font-bold"
            >
              Disconnect
            </button>
          )}
        </div>
      </div>

      {/* WALLET OPTIONS */}
      <div className="px-4 mt-5">

        <div className="grid grid-cols-3 gap-3">

          {/* MetaMask (disabled in Telegram) */}
          <button
            disabled={isTelegram}
            onClick={() => handleConnect("metaMaskSDK")}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center opacity-40"
          >
            <img src={MetaMaskIcon} className="w-12 h-12 mb-2" />
            MetaMask
          </button>

          {/* WalletConnect (MAIN FIX) */}
          <button
            onClick={() => handleConnect("walletConnect")}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center hover:border-purple-500"
          >
            <img src={WalletConnectIcon} className="w-12 h-12 mb-2" />
            WalletConnect
          </button>

          {/* Coinbase (disabled in Telegram) */}
          <button
            disabled={isTelegram}
            onClick={() => handleConnect("coinbaseWalletSDK")}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center opacity-40"
          >
            <img src={CoinbaseIcon} className="w-12 h-12 mb-2" />
            Coinbase
          </button>

        </div>
      </div>

      {/* STAKING */}
      <div className="px-4 mt-6">
        <div className="text-lg font-bold mb-2">
          BARIN Staking
        </div>

        <StakingPanel />
      </div>

      <BottomNav />
    </div>
  );
}