import { useEffect } from "react";
import {
  useAppKit,
  useAppKitAccount,
  useDisconnect,
} from "@reown/appkit/react";

export default function Wallet() {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { disconnect } = useDisconnect();

  // --------------------------
  // DEBUG: CONNECTION STATE
  // --------------------------
  useEffect(() => {
    console.log("Wallet State:", {
      address,
      isConnected,
    });

    if (isConnected && address) {
      alert(
        "🔥 WALLET CONNECTED\n\n" +
        address
      );
    }
  }, [address, isConnected]);

  // --------------------------
  // CONNECT WALLET
  // --------------------------
  const connectWallet = () => {
    alert("STEP 1: Opening AppKit Modal");

    open(); // ✅ THIS IS CORRECT

    alert("STEP 2: Modal Opened");
  };

  // --------------------------
  // DISCONNECT
  // --------------------------
  const handleDisconnect = async () => {
    await disconnect();
    alert("Disconnected");
  };

  return (
    <div className="min-h-screen bg-black text-white p-4">

      <h1 className="text-xl font-bold">
        BARIN Wallet (AppKit v1.8.21)
      </h1>

      <p className="mt-3 text-cyan-400">
        Status: {isConnected ? "Connected" : "Not Connected"}
      </p>

      <p className="mt-2 text-gray-300 break-all">
        {address || "No wallet"}
      </p>

      <button
        onClick={connectWallet}
        className="mt-6 bg-yellow-500 text-black px-4 py-2 rounded"
      >
        Connect Wallet
      </button>

      {isConnected && (
        <button
          onClick={handleDisconnect}
          className="mt-3 bg-red-500 px-4 py-2 rounded block"
        >
          Disconnect
        </button>
      )}

    </div>
  );
}