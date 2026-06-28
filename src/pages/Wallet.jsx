import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Wallet() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [status, setStatus] = useState("Not Connected");
  const connectingRef = useRef(false);

  // 🔥 CRITICAL FIX: FORCE SESSION RECHECK AFTER RETURN
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        window.dispatchEvent(new Event("focus"));
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // 🔥 UPDATE UI FROM REAL STATE
  useEffect(() => {
    if (isConnected && address) {
      setStatus("Connected ✅");
    } else {
      setStatus("Not Connected");
    }
  }, [isConnected, address]);

  // 🔥 CLEAN WALLET SESSIONS (PREVENT STUCK STATE)
  useEffect(() => {
    Object.keys(localStorage).forEach((key) => {
      if (key.includes("walletconnect") || key.includes("wc@")) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  // 🔥 CONNECT HANDLER
  const handleConnect = (id) => {
    if (connectingRef.current) return;
    connectingRef.current = true;

    const connector = connectors.find((c) => c.id === id);
    if (!connector) return;

    setStatus("Opening wallet...");

    connect({ connector });

    setStatus("Approve in wallet and return to app");

    connectingRef.current = false;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4">

      {/* STATUS CARD */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6">

        <h2 className="text-yellow-400 font-bold text-lg">
          Wallet Status
        </h2>

        <p className="text-gray-300">
          {address
            ? `${address.slice(0, 6)}...${address.slice(-4)}`
            : "Not Connected"}
        </p>

        <p className="text-cyan-400 text-sm mt-2">
          {status}
        </p>

        {isConnected && (
          <button
            onClick={() => disconnect()}
            className="mt-3 bg-red-500 px-4 py-2 rounded-lg"
          >
            Disconnect
          </button>
        )}
      </div>

      {/* WALLET BUTTONS */}
      <div className="grid grid-cols-3 gap-3">

        <button
          onClick={() => handleConnect("metaMaskSDK")}
          className="bg-slate-900 border border-slate-700 rounded-xl p-4 hover:border-orange-500"
        >
          MetaMask
        </button>

        <button
          onClick={() => handleConnect("walletConnect")}
          className="bg-slate-900 border border-slate-700 rounded-xl p-4 hover:border-purple-500"
        >
          WalletConnect
        </button>

        <button
          onClick={() => handleConnect("coinbaseWalletSDK")}
          className="bg-slate-900 border border-slate-700 rounded-xl p-4 hover:border-blue-500"
        >
          Coinbase
        </button>

      </div>
    </div>
  );
}