import { useEffect, useState } from "react";
import { appKit } from "../wallet/appkit";

export default function Wallet() {
  const [status, setStatus] = useState("Idle");

  // ---------------------------
  // OPEN WALLET
  // ---------------------------
  const connectWallet = async () => {
    alert("STEP 1: Opening AppKit");

    await appKit.open();

    alert("STEP 2: Wallet modal opened");
  };

  // ---------------------------
  // EVENTS
  // ---------------------------
  useEffect(() => {
    alert("Wallet Page Loaded");

    // WALLET CONNECTED
    appKit.subscribe("connect", (data) => {
      alert(
        "🔥 WALLET CONNECTED\n\n" +
        JSON.stringify(data, null, 2)
      );

      setStatus("Connected ✅");
    });

    // WALLET DISCONNECT
    appKit.subscribe("disconnect", () => {
      alert("❌ Wallet Disconnected");
      setStatus("Disconnected");
    });

  }, []);

  // ---------------------------
  // UI
  // ---------------------------
  return (
    <div className="min-h-screen bg-black text-white p-4">

      <h1 className="text-xl font-bold">
        BARIN Wallet (AppKit Test)
      </h1>

      <p className="mt-2 text-cyan-400">
        Status: {status}
      </p>

      <button
        onClick={connectWallet}
        className="mt-6 bg-yellow-500 text-black px-4 py-2 rounded"
      >
        Connect Wallet
      </button>

    </div>
  );
}