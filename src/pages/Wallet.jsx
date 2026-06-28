import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import API from "../config/api";

export default function Wallet() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();

  useEffect(() => {
    alert(
        connectors.map(c => c.id).join("\n")
    );
}, []);
  const { disconnect } = useDisconnect();

  const [status, setStatus] = useState("Not Connected");

  // prevents duplicate backend calls
  const sentRef = useRef(false);

  // -----------------------------
  // CONNECT WALLET
  // -----------------------------
  const handleConnect = (id) => {
    const connector = connectors.find((c) => c.id === id);
    if (!connector) return;

    setStatus("Opening wallet...");

    connect(
  { connector },
  {
    onSuccess(data) {
      alert("SUCCESS");
      console.log(data);
    },
    onError(error) {
      alert(error.message);
      console.log(error);
    },
  }
);

    setStatus("Approve wallet and return...");
  };

  // -----------------------------
  // MAIN FIX: RELIABLE BACKEND SYNC
  // -----------------------------
  useEffect(() => {
    const interval = setInterval(async () => {
      console.log("CHECK STATE:", {
        address,
        isConnected,
      });

      // wait until wallet is truly ready
      if (!address || !isConnected) return;

      // prevent duplicate calls
      if (sentRef.current) return;

      sentRef.current = true;

      try {
        setStatus("Logging into backend...");

        console.log("🚀 Sending address to backend:", address);

        const res = await API.post("/auth/wallet-login", {
          address,
        });

        alert("CALLING BACKEND");
        console.log("CALLING BACKEND");

        console.log("✅ Backend response:", res.data);

        localStorage.setItem("token", res.data.token);

        setStatus("Connected ✅");
      } catch (err) {
        console.log("❌ Backend error:", err);
        setStatus("Backend failed");
      }
    }, 1000); // polling fixes Telegram return issue

    return () => clearInterval(interval);
  }, [address, isConnected]);

  // -----------------------------
  // DISCONNECT
  // -----------------------------
  const handleDisconnect = () => {
    disconnect();
    localStorage.removeItem("token");
    sentRef.current = false;
    setStatus("Not Connected");
  };

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-white p-4">

      {/* STATUS BOX */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
        <h2 className="text-yellow-400 font-bold">
          Wallet Status
        </h2>

        <p className="text-gray-300 break-all mt-2">
          {address || "No wallet connected"}
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
          WalletConnectt
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