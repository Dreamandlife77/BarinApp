import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import API from "../config/api";

export default function Wallet() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [status, setStatus] = useState("Not Connected");
  const lock = useRef(false);

  // 🔥 FORCE RECONNECT ON RETURN (TELEGRAM FIX)
  useEffect(() => {
    const forceRefresh = () => {
      window.dispatchEvent(new Event("focus"));
      window.dispatchEvent(new Event("visibilitychange"));
    };

    forceRefresh();

    const interval = setInterval(forceRefresh, 1500);

    return () => clearInterval(interval);
  }, []);

  // 🔥 SEND TO BACKEND ONLY WHEN ADDRESS EXISTS
  useEffect(() => {
    const login = async () => {
      if (!isConnected || !address) return;

      try {
        setStatus("Logging in...");

        const res = await API.post("/auth/wallet-login", {
          address,
        });

        localStorage.setItem("token", res.data.token);

        setStatus("Connected ✅");

        console.log("Backend login success:", res.data);

      } catch (err) {
        console.log("Backend error:", err);
        setStatus("Login failed");
      }
    };

    login();
  }, [isConnected, address]);

  // 🔥 CONNECT WALLET
  const handleConnect = (id) => {
    if (lock.current) return;
    lock.current = true;

    const connector = connectors.find((c) => c.id === id);

    if (!connector) return;

    setStatus("Opening wallet...");

    connect({ connector });

    setStatus("Approve in wallet & return to Telegram");

    setTimeout(() => {
      lock.current = false;
    }, 3000);
  };

  // 🔥 DISCONNECT
  const handleDisconnect = () => {
    disconnect();
    localStorage.removeItem("token");
    setStatus("Disconnected");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4">

      {/* STATUS */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
        <h2 className="text-yellow-400 font-bold">Wallet Status</h2>

        <p className="break-all text-gray-300 mt-2">
          {address || "No Wallet"}
        </p>

        <p className="text-cyan-400 mt-2">
          {status}
        </p>

        {isConnected && (
          <button
            onClick={handleDisconnect}
            className="mt-3 bg-red-500 px-4 py-2 rounded"
          >
            Disconnect
          </button>
        )}
      </div>

      {/* BUTTONS */}
      <div className="grid grid-cols-3 gap-3 mt-4">

        <button
          className="bg-slate-800 p-3 rounded"
          onClick={() => handleConnect("metaMaskSDK")}
        >
          MetaMask
        </button>

        <button
          className="bg-slate-800 p-3 rounded"
          onClick={() => handleConnect("walletConnect")}
        >
          WalletConnect
        </button>

        <button
          className="bg-slate-800 p-3 rounded"
          onClick={() => handleConnect("coinbaseWalletSDK")}
        >
          Coinbase
        </button>

      </div>

    </div>
  );
}