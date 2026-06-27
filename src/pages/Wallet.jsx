import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
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

  const { address, isConnected } = useAccount();
  const { connectAsync, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const isConnectingRef = useRef(false);

  // -----------------------------
  // Detect Telegram WebApp
  // -----------------------------
  const isTelegram =
    typeof window !== "undefined" &&
    window.Telegram?.WebApp;

  // -----------------------------
  // Filter connectors per environment
  // -----------------------------
  const allowedConnectors = connectors.filter((c) => {
    if (isTelegram) {
      return c.id === "walletConnect";
    }
    return true;
  });

  // -----------------------------
  // Clear WalletConnect cache (fix JWT + session issues)
  // -----------------------------
  useEffect(() => {
    localStorage.removeItem("walletconnect");
    localStorage.removeItem("WALLETCONNECT_DEEPLINK_CHOICE");
    sessionStorage.clear();
  }, []);

  // -----------------------------
  // Safe connect handler
  // -----------------------------
  const handleConnect = async (connectorId) => {
    if (isConnectingRef.current) return;

    // Telegram restriction
    if (isTelegram && connectorId !== "walletConnect") {
      alert("Only WalletConnect is supported in Telegram");
      return;
    }

    isConnectingRef.current = true;

    try {
      const connector = connectors.find(
        (c) => c.id === connectorId
      );

      if (!connector) {
        console.error("Connector not found:", connectorId);
        return;
      }

      console.log("🔗 Connecting:", connector.name);

      await connectAsync({ connector });

      console.log("✅ Connected:", address);

    } catch (err) {
      console.error("❌ Wallet error:", err);
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

          {/* MetaMask */}
          <button
            disabled={isTelegram}
            onClick={() => handleConnect("metaMaskSDK")}
            className={`bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center transition ${
              isTelegram
                ? "opacity-40 cursor-not-allowed"
                : "hover:border-orange-500"
            }`}
          >
            <img src={MetaMaskIcon} className="w-12 h-12 mb-2" />
            <span className="text-sm">MetaMask</span>
          </button>

          {/* WalletConnect */}
          <button
            onClick={() => handleConnect("walletConnect")}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center hover:border-purple-500 transition"
          >
            <img src={WalletConnectIcon} className="w-12 h-12 mb-2" />
            <span className="text-sm">WalletConnect</span>
          </button>

          {/* Coinbase */}
          <button
            disabled={isTelegram}
            onClick={() => handleConnect("coinbaseWalletSDK")}
            className={`bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center transition ${
              isTelegram
                ? "opacity-40 cursor-not-allowed"
                : "hover:border-blue-500"
            }`}
          >
            <img src={CoinbaseIcon} className="w-12 h-12 mb-2" />
            <span className="text-sm">Coinbase</span>
          </button>

        </div>

        {(isPending || isConnectingRef.current) && (
          <div className="text-center text-yellow-400 mt-3">
            Connecting wallet...
          </div>
        )}
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