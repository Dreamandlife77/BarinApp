import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ArrowLeft, Wallet } from "lucide-react";

import BottomNav from "../components/BottomNav";
import StakingPanel from "../components/StakingPanel";

import MetaMaskIcon from "../assets/Wallet/MetaMask.png";
import CoinbaseIcon from "../assets/Wallet/Coinbase.png";
import WalletConnectIcon from "../assets/Wallet/WalletConnect.png";

export default function WalletPage() {
  const navigate = useNavigate();

  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const isConnectingRef = useRef(false);

  const [statusText, setStatusText] = useState("Not Connected");

  const isTelegram =
    typeof window !== "undefined" &&
    window.Telegram?.WebApp;

  // ----------------------------
  // CLEAN OLD SESSIONS (IMPORTANT)
  // ----------------------------
  useEffect(() => {
    Object.keys(localStorage).forEach((key) => {
      if (
        key.includes("walletconnect") ||
        key.includes("wagmi") ||
        key.includes("wc@")
      ) {
        localStorage.removeItem(key);
      }
    });
    sessionStorage.clear();
  }, []);

  // ----------------------------
  // REAL CONNECTION DETECTION
  // ----------------------------
  useEffect(() => {
    if (isConnected && address) {
      setStatusText("Wallet Connected ✅");
      console.log("Wallet connected:", address);
    }
  }, [isConnected, address]);

  // ----------------------------
  // SAFE CONNECT HANDLER
  // ----------------------------
  const handleConnect = async (connectorId) => {
    if (isConnectingRef.current) return;

    isConnectingRef.current = true;

    try {
      const connector = connectors.find((c) => c.id === connectorId);

      if (!connector) {
        console.log("Connector not found:", connectorId);
        return;
      }

      setStatusText("Opening wallet...");

      await connectAsync({ connector });

      // IMPORTANT: DO NOT assume success here
      setStatusText("Approve in wallet and return manually");

    } catch (err) {
      console.log("Connect attempt finished:", err);

      // IMPORTANT: DO NOT show fake error
      setStatusText("If wallet opened, return back to Telegram");

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

      {/* STATUS CARD */}
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

          <div className="text-yellow-400 text-xs mt-2">
            {statusText}
          </div>

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
      <div className="px-4 mt-5 grid grid-cols-3 gap-3">

        {/* METAMASK */}
        <button
          onClick={() => handleConnect("metaMaskSDK")}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center"
        >
          <img src={MetaMaskIcon} className="w-12 h-12 mb-2" />
          MetaMask
        </button>

        {/* WALLETCONNECT */}
        <button
          onClick={() => handleConnect("walletConnect")}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center"
        >
          <img src={WalletConnectIcon} className="w-12 h-12 mb-2" />
          WalletConnect
        </button>

        {/* COINBASE */}
        <button
          onClick={() => handleConnect("coinbaseWalletSDK")}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center"
        >
          <img src={CoinbaseIcon} className="w-12 h-12 mb-2" />
          Coinbase
        </button>

      </div>

      {/* HELP TEXT */}
      {!isConnected && (
        <div className="px-4 mt-4 text-sm text-yellow-400">
          If wallet opens, approve it and return back to Telegram manually.
        </div>
      )}

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