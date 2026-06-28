import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import MetaMaskIcon from "../assets/Wallet/MetaMask.png";
import CoinbaseIcon from "../assets/Wallet/Coinbase.png";
import WalletConnectIcon from "../assets/Wallet/WalletConnect.png";

export default function Wallet() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const isConnecting = useRef(false);
  const [status, setStatus] = useState("Not Connected");

  // 🔥 AUTO DETECT REAL CONNECTION (MOST IMPORTANT FIX)
  useEffect(() => {
    if (isConnected && address) {
      setStatus("Connected ✅");
    } else {
      setStatus("Not Connected");
    }
  }, [isConnected, address]);

  // 🧹 CLEAN OLD WALLET SESSIONS
  useEffect(() => {
    Object.keys(localStorage).forEach((key) => {
      if (key.includes("walletconnect") || key.includes("wc@")) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  // 🔗 SAFE CONNECT
  const handleConnect = async (id) => {
    if (isConnecting.current) return;
    isConnecting.current = true;

    try {
      const connector = connectors.find((c) => c.id === id);
      if (!connector) return;

      setStatus("Opening wallet...");

      connect({ connector });

      // IMPORTANT: DO NOT WAIT FOR RESULT
      setStatus("Approve in wallet and return to app");

    } catch (err) {
      console.log("connect error (ignored):", err);
    } finally {
      isConnecting.current = false;
    }
  };

  return (
    <div className="p-4 text-white">

      {/* STATUS */}
      <div className="p-4 bg-slate-900 rounded-xl mb-4">
        <div className="text-sm text-gray-400">Wallet Status</div>
        <div className="font-bold">
          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not Connected"}
        </div>
        <div className="text-yellow-400 text-xs mt-2">
          {status}
        </div>

        {isConnected && (
          <button
            onClick={() => disconnect()}
            className="mt-3 bg-red-500 px-4 py-2 rounded-lg"
          >
            Disconnect
          </button>
        )}
      </div>

      {/* BUTTONS */}
      <div className="grid grid-cols-3 gap-3">

        <button onClick={() => handleConnect("metaMaskSDK")} className="bg-gray-800 p-3 rounded-xl">
          <img src={MetaMaskIcon} className="w-10 mx-auto" />
          MetaMask
        </button>

        <button onClick={() => handleConnect("walletConnect")} className="bg-gray-800 p-3 rounded-xl">
          <img src={WalletConnectIcon} className="w-10 mx-auto" />
          WalletConnect
        </button>

        <button onClick={() => handleConnect("coinbaseWalletSDK")} className="bg-gray-800 p-3 rounded-xl">
          <img src={CoinbaseIcon} className="w-10 mx-auto" />
          Coinbase
        </button>

      </div>
    </div>
  );
}