import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Wallet() {
  const { address, isConnected, status } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [uiStatus, setUiStatus] = useState("Not Connected");
  const connectingRef = useRef(false);

  // -------------------------
  // FORCE STATE SYNC AFTER RETURN
  // -------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        window.dispatchEvent(new Event("focus"));
      }
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // -------------------------
  // REAL CONNECTION TRACKING
  // -------------------------
  useEffect(() => {
    if (isConnected && address) {
      setUiStatus("Connected ✅");
    } else {
      setUiStatus("Not Connected");
    }
  }, [isConnected, address]);

  // -------------------------
  // CLEAN WALLET SESSIONS
  // -------------------------
  useEffect(() => {
    Object.keys(localStorage).forEach((key) => {
      if (key.includes("walletconnect") || key.includes("wc@")) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  // -------------------------
  // CONNECT HANDLER
  // -------------------------
  const handleConnect = async (id) => {
    if (connectingRef.current) return;
    connectingRef.current = true;

    try {
      const connector = connectors.find((c) => c.id === id);
      if (!connector) return;

      setUiStatus("Opening wallet...");

      connect({ connector });

      setUiStatus("Approve in wallet & return");

    } catch (err) {
      console.log(err);
      setUiStatus("Wallet opened — finish in app");
    } finally {
      connectingRef.current = false;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4">

      {/* STATUS CARD */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6">

        <h2 className="text-yellow-400 text-lg font-bold">
          Wallet Status
        </h2>

        <p className="text-gray-300 mt-1">
          {address
            ? `${address.slice(0, 6)}...${address.slice(-4)}`
            : "Not Connected"}
        </p>

        <p className="text-cyan-400 mt-2 text-sm">
          {uiStatus}
        </p>

        {isConnected && (
          <button
            onClick={() => disconnect()}
            className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
          >
            Disconnect
          </button>
        )}
      </div>

      {/* WALLET BUTTONS */}
      <div className="grid grid-cols-3 gap-3">

        {/* META MASK */}
        <button
          onClick={() => handleConnect("metaMaskSDK")}
          className="bg-slate-900 border border-slate-700 rounded-xl p-4 hover:border-orange-500"
        >
          MetaMask
        </button>

        {/* WALLETCONNECT */}
        <button
          onClick={() => handleConnect("walletConnect")}
          className="bg-slate-900 border border-slate-700 rounded-xl p-4 hover:border-purple-500"
        >
          WalletConnect
        </button>

        {/* COINBASE */}
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