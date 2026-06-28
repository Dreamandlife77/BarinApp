import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ArrowLeft, Wallet } from "lucide-react";

import MetaMaskIcon from "../assets/Wallet/MetaMask.png";
import CoinbaseIcon from "../assets/Wallet/Coinbase.png";
import WalletConnectIcon from "../assets/Wallet/WalletConnect.png";

export default function WalletPage() {
  const navigate = useNavigate();

  const { address, isConnected } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const isConnecting = useRef(false);
  const [status, setStatus] = useState("Not Connected");

  // -----------------------------
  // CLEAN OLD WALLET SESSIONS
  // -----------------------------
  useEffect(() => {
    Object.keys(localStorage).forEach((key) => {
      if (key.includes("walletconnect") || key.includes("wc@")) {
        localStorage.removeItem(key);
      }
    });
    sessionStorage.clear();
  }, []);

  // -----------------------------
  // REAL CONNECTION DETECTION
  // -----------------------------
  useEffect(() => {
    if (isConnected && address) {
      setStatus("Wallet Connected ✅");
      console.log("CONNECTED:", address);
    }
  }, [isConnected, address]);

  // -----------------------------
  // CONNECT HANDLER (SAFE)
  // -----------------------------
  const handleConnect = async (id) => {
    if (isConnecting.current) return;
    isConnecting.current = true;

    try {
      const connector = connectors.find((c) => c.id === id);

      if (!connector) {
        console.log("Connector not found:", id);
        return;
      }

      setStatus("Opening wallet...");

      await connectAsync({ connector });

      // IMPORTANT: DO NOT assume success immediately
      setStatus("Approve in wallet and return to Telegram");

    } catch (err) {
      console.log("Wallet flow (NOT real error):", err);

      // NEVER show fake failure in Telegram
      setStatus("If wallet opened, approve and return manually");
    } finally {
      isConnecting.current = false;
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white pb-24">

      {/* HEADER */}
      <div className="p-4 flex justify-between items-center">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft />
        </button>

        <h1 className="font-bold text-lg">Wallet</h1>
        <div />
      </div>

      {/* STATUS CARD */}
      <div className="px-4">
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
              <Wallet className="text-black" />
            </div>

            <div>
              <div className="text-sm text-gray-400">
                Connected Wallet
              </div>

              <div className="font-bold">
                {isConnected
                  ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
                  : "Not Connected"}
              </div>
            </div>
          </div>

          <div className="text-yellow-400 text-xs mt-2">
            {status}
          </div>

          {isConnected && (
            <button
              onClick={() => disconnect()}
              className="mt-4 w-full bg-red-500 py-2 rounded-lg"
            >
              Disconnect
            </button>
          )}
        </div>
      </div>

      {/* WALLET BUTTONS */}
      <div className="grid grid-cols-3 gap-3 px-4 mt-5">

        {/* METAMASK */}
        <button
          onClick={() => handleConnect("metaMaskSDK")}
          className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col items-center"
        >
          <img src={MetaMaskIcon} className="w-12 mb-2" />
          MetaMask
        </button>

        {/* WALLETCONNECT */}
        <button
          onClick={() => handleConnect("walletConnect")}
          className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col items-center"
        >
          <img src={WalletConnectIcon} className="w-12 mb-2" />
          WalletConnect
        </button>

        {/* COINBASE */}
        <button
          onClick={() => handleConnect("coinbaseWalletSDK")}
          className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex flex-col items-center"
        >
          <img src={CoinbaseIcon} className="w-12 mb-2" />
          Coinbasse
        </button>

      </div>

      {/* HELP TEXT */}
      {!isConnected && (
        <div className="px-4 mt-4 text-sm text-yellow-400">
          If wallet opens, approve it and return manually to Telegram.
        </div>
      )}

    </div>
  );
}