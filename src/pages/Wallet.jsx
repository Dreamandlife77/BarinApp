import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Wallet() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [status, setStatus] = useState("Not Connected");
  const lock = useRef(false);

  // 🔥 FIX 1: FORCE SESSION RECOVERY LOOP
  useEffect(() => {
    const interval = setInterval(() => {
      // forces wagmi to re-check stored session
      window.dispatchEvent(new Event("focus"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 FIX 2: REAL STATE DETECTION (THIS FIXES YOUR STUCK LOADING)
  useEffect(() => {
    if (isConnected && address) {
      setStatus("Connected ✅");
    } else {
      setStatus("Not Connected");
    }
  }, [isConnected, address]);

  // 🔥 FIX 3: SAFE CONNECT (NO WAITING FOR RETURN EVENT)
  const handleConnect = (id) => {
    if (lock.current) return;
    lock.current = true;

    const connector = connectors.find((c) => c.id === id);
    if (!connector) return;

    setStatus("Opening wallet...");

    connect({ connector });

    setStatus("Approve wallet → then return here");

    setTimeout(() => {
      lock.current = false;
    }, 2000);
  };

  // 🔥 AUTO NEXT STEP (IMPORTANT)
  useEffect(() => {
    if (isConnected && address) {
      console.log("Wallet connected → move to next step");

      // 👉 HERE YOU GO NEXT PAGE
      // navigate("/game") OR whatever you need
    }
  }, [isConnected, address]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4">

      {/* STATUS */}
      <div className="bg-slate-900 p-4 rounded-xl mb-4">
        <h2 className="text-yellow-400 font-bold">
          Wallet Status
        </h2>

        <p className="text-gray-300 break-all">
          {address || "No wallet"}
        </p>

        <p className="text-cyan-400 mt-2">
          {status}
        </p>

        {isConnected && (
          <button
            className="mt-3 bg-red-500 px-4 py-2 rounded"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
        )}
      </div>

      {/* BUTTONS */}
      <div className="grid grid-cols-3 gap-3">

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