import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { ArrowLeft, Wallet } from "lucide-react";

import MetaMaskIcon from "../assets/Wallet/MetaMask.png";
import CoinbaseIcon from "../assets/Wallet/Coinbase.png";
import WalletConnectIcon from "../assets/Wallet/WalletConnect.png";

export default function WalletPage() {
  const navigate = useNavigate();

  const { address, isConnected, status } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [uiStatus, setUiStatus] = useState("Not Connected");
  const isConnecting = useRef(false);

  // -------------------------
  // AUTO UPDATE (IMPORTANT FIX)
  // -------------------------
  useEffect(() => {
    if (isConnected && address) {
      setUiStatus("Connected ✅");
      console.log("CONNECTED:", address);
    } else {
      setUiStatus("Not Connected");
    }
  }, [isConnected, address]);

  // -------------------------
  // CLEAN WALLET SESSION
  // -------------------------
  useEffect(() => {
    Object.keys(localStorage).forEach((key) => {
      if (key.includes("walletconnect") || key.includes("wc@")) {
        localStorage.removeItem(key);
      }
    });
    sessionStorage.clear();
  }, []);

  // -------------------------
  // CONNECT HANDLER (FIXED)
  // -------------------------
  const handleConnect = async (id) => {
    if (isConnecting.current) return;

    isConnecting.current = true;

    try {
      const connector = connectors.find((c) => c.id === id);

      if (!connector) {
        console.log("Connector not found:", id);
        return;
      }

      setUiStatus("Opening wallet...");

      // IMPORTANT: this only opens wallet
      connect({ connector });

      // DO NOT assume result here
      setUiStatus("Approve in wallet and return to Telegram");

    } catch (err) {
      console.log("Connect error:", err);
      setUiStatus("Wallet opened. Finish approval in app");
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
        <h1 className="font-bold">Wallet</h1>
        <div />
      </div>

      {/* STATUS */}
      <div className="px-4">
        <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
              <Wallet className="text-black" />
            </div>

            <div>
              <div className="text-gray-400 text-sm">Wallet Status</div>

              <div className="font-bold">
                {isConnected
                  ? `${address?.slice(0, 6)}...${address?.slice(-4)}`
                  : "Not Connected"}
              </div>
            </div>
          </div>

          <div className="text-yellow-400 text-xs mt-2">
            {uiStatus}
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

      {/* WALLETS */}
      <div className="grid grid-cols-3 gap-3 px-4 mt-5">

        <button onClick={() => handleConnect("metaMaskSDK")}
          className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <img src={MetaMaskIcon} className="w-12 mx-auto mb-2" />
          MetaMask
        </button>

        <button onClick={() => handleConnect("walletConnect")}
          className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <img src={WalletConnectIcon} className="w-12 mx-auto mb-2" />
          WalletConnect
        </button>

        <button onClick={() => handleConnect("coinbaseWalletSDK")}
          className="bg-slate-900 p-4 rounded-xl border border-slate-800">
          <img src={CoinbaseIcon} className="w-12 mx-auto mb-2" />
          Coinbase
        </button>

      </div>
    </div>
  );
}