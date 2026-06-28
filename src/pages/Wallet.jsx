import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import API from "../config/api";

export default function Wallet() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [status, setStatus] = useState("Not Connected");
  const lock = useRef(false);

  // ----------------------------
  // 🔥 DEBUG ALERT SYSTEM
  // ----------------------------
  const debug = (title, data) => {
    alert(
      title +
        "\n\n" +
        JSON.stringify(data, null, 2)
    );
  };

  // ----------------------------
  // 🔥 AUTO WALLET SESSION CHECK
  // ----------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      const wcKeys = Object.keys(localStorage).filter(k =>
        k.includes("wc") || k.includes("walletconnect")
      );

      const wagmiKeys = Object.keys(localStorage).filter(k =>
        k.includes("wagmi")
      );

      debug("SESSION CHECK", {
        isConnected,
        address,
        wcKeys,
        wagmiKeys
      });
    }, 6000);

    return () => clearInterval(interval);
  }, [isConnected, address]);

  // ----------------------------
  // 🔥 BACKEND LOGIN (IMPORTANT FIX)
  // ----------------------------
  useEffect(() => {
    const login = async () => {
      if (isConnected && address) {
        try {
          setStatus("Logging into backend...");

          const res = await API.post("/auth/wallet-login", {
            address,
          });

          localStorage.setItem("token", res.data.token);

          setStatus("Connected ✅");

          debug("LOGIN SUCCESS", res.data);

        } catch (err) {
          console.log(err);
          setStatus("Backend login failed");
        }
      }
    };

    login();
  }, [isConnected, address]);

  // ----------------------------
  // 🔥 FORCE STATE REFRESH LOOP
  // ----------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      window.dispatchEvent(new Event("focus"));
      window.dispatchEvent(new Event("visibilitychange"));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // ----------------------------
  // 🔥 CONNECT WALLET
  // ----------------------------
  const handleConnect = (id) => {
    if (lock.current) return;
    lock.current = true;

    const connector = connectors.find(c => c.id === id);

    if (!connector) {
      debug("ERROR", { message: "Connector not found", id });
      return;
    }

    setStatus("Opening wallet...");

    connect({ connector });

    setStatus("Approve wallet → return to Telegram");

    setTimeout(() => {
      lock.current = false;
    }, 3000);
  };

  // ----------------------------
  // 🔥 DISCONNECT
  // ----------------------------
  const handleDisconnect = () => {
    disconnect();
    localStorage.removeItem("token");
    setStatus("Disconnected");
  };

  // ----------------------------
  // UI
  // ----------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-white p-4">

      {/* STATUS CARD */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">

        <h2 className="text-yellow-400 font-bold">
          Wallet Debug Panel
        </h2>

        <p className="text-gray-300 break-all mt-2">
          {address || "No Address"}
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

      {/* WALLET BUTTONS */}
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
          WalletConnectaa
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