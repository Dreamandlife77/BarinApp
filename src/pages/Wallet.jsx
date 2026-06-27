import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ArrowLeft, Wallet } from "lucide-react";

import BottomNav from "../components/BottomNav";
import StakingPanel from "../components/StakingPanel";

import MetaMaskIcon from "../assets/Wallet/MetaMask.png";
import CoinbaseIcon from "../assets/Wallet/Coinbase.png";

export default function WalletPage() {
  const navigate = useNavigate();

  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const [loading, setLoading] = useState(false);

  // -----------------------------
  // DIRECT CONNECT (NO QR)
  // -----------------------------
  const handleConnect = async (type) => {
    try {
      const connector =
        connectors.find((c) =>
          c.name.toLowerCase().includes(type)
        );

      if (!connector) {
        console.error("Connector not found:", type);
        return;
      }

      console.log("Connecting:", connector.name);

      await connect({ connector });

    } catch (err) {
      console.error("Connect error:", err);
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
              className="mt-4 w-full py-2 rounded-lg bg-red-500 font-bold"
            >
              Disconnect
            </button>
          )}

        </div>
      </div>

      {/* WALLET BUTTONS */}
      <div className="px-4 mt-5 grid grid-cols-2 gap-3">

        {/* METAMASK */}
        <button
          onClick={() => handleConnect("metamask")}
          className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center hover:border-orange-500"
        >
          <img src={MetaMaskIcon} className="w-12 h-12 mb-2" />
          <span>MetaMask</span>
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