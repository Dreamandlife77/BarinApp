import { useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
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
  const { connectAsync, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const isConnectingRef = useRef(false);

  // -----------------------------
  // CONNECT FIX (ALL 3 WORKING)
  // -----------------------------
  const handleConnect = async (walletName) => {
    if (isConnectingRef.current) return;

    try {
      isConnectingRef.current = true;

      console.log("Available connectors:", connectors);

      const connector = connectors.find((c) =>
        c.name.toLowerCase().includes(walletName.toLowerCase())
      );

      if (!connector) {
        console.error("Connector not found:", walletName);
        return;
      }

      console.log("Connecting to:", connector.name);

      const result = await connectAsync({
        connector,
      });

      console.log("Connected:", result);

    } catch (err) {
      console.error("Wallet connect error:", err);
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

          {isConnected && (
            <button
              onClick={() => disconnect()}
              className="mt-4 w-full py-2 bg-red-500 rounded-lg font-bold"
            >
              Disconnect
            </button>
          )}

        </div>
      </div>

      {/* WALLET BUTTONS (ALL WORKING) */}
      <div className="px-4 mt-5 grid grid-cols-3 gap-3">

        {/* META MASK */}
        <button
          onClick={() => handleConnect("metamask")}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center hover:border-orange-500"
        >
          <img src={MetaMaskIcon} className="w-12 h-12 mb-2" />
          <span>MetaMask</span>
        </button>

        {/* WALLETCONNECT */}
        <button
          onClick={() => handleConnect("walletconnect")}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center hover:border-purple-500"
        >
          <img src={WalletConnectIcon} className="w-12 h-12 mb-2" />
          <span>WalletConnect</span>
        </button>

        {/* COINBASE */}
        <button
          onClick={() => handleConnect("coinbase")}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center hover:border-blue-500"
        >
          <img src={CoinbaseIcon} className="w-12 h-12 mb-2" />
          <span>Coinbase</span>
        </button>

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