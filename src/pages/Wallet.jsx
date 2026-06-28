import { useEffect, useState } from "react";
import { appKit } from "../wallet/appkit";

export default function Wallet() {
  const [status, setStatus] = useState("Idle");

  // -------------------------
  // STEP 1: OPEN WALLET
  // -------------------------
  const openWallet = async () => {
    alert("STEP 1: Opening AppKit");

    await appKit.open();

    alert("STEP 2: Wallet modal opened");
  };

  // -------------------------
  // STEP 2: LISTEN EVENTS
  // -------------------------
  useEffect(() => {
    alert("Wallet Page Loaded");

    // 🔥 WALLET SELECTED
    appKit.subscribe("modal_open", () => {
      alert("EVENT: modal opened");
      setStatus("Wallet modal opened");
    });

    // 🔥 WALLET CONNECTED
    appKit.subscribe("connect", (data) => {
      alert(
        "EVENT: wallet connected\n" +
        JSON.stringify(data, null, 2)
      );

      setStatus("Wallet connected ✅");
    });

    // 🔥 DISCONNECT
    appKit.subscribe("disconnect", () => {
      alert("EVENT: wallet disconnected");
      setStatus("Disconnected");
    });

  }, []);

  // -------------------------
  // UI
  // -------------------------
  return (
    <div className="min-h-screen bg-black text-white p-4">

      <h1 className="text-xl font-bold">
        AppKit Wallet Debug
      </h1>

      <p className="mt-2 text-cyan-400">
        Status: {status}
      </p>

      <button
        onClick={openWallet}
        className="mt-6 bg-yellow-500 text-black px-4 py-2 rounded"
      >
        Connect Wallet
      </button>

    </div>
  );
}