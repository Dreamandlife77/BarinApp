import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Wallet() {
  const { address, isConnected, status } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [ui, setUi] = useState("Not Connected");
  const lock = useRef(false);

  // 🔥 CRITICAL FIX 1: FORCE REHYDRATION LOOP
  useEffect(() => {
    const interval = setInterval(() => {
      // this forces wagmi internal re-check
      window.dispatchEvent(new Event("focus"));
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // 🔥 CRITICAL FIX 2: HARD SESSION CHECK
  useEffect(() => {
    const checkConnection = () => {
      if (isConnected && address) {
        setUi("Connected ✅");
      } else {
        setUi("Not Connected");
      }
    };

    checkConnection();
  }, [isConnected, address]);

  // 🔥 CRITICAL FIX 3: CONNECT
  const handleConnect = (id) => {
    if (lock.current) return;
    lock.current = true;

    const connector = connectors.find((c) => c.id === id);
    if (!connector) return;

    setUi("Opening wallet...");

    connect({ connector });

    setUi("Approve in wallet → then return");

    setTimeout(() => {
      lock.current = false;
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4">

      {/* STATUS */}
      <div className="bg-slate-900 p-4 rounded-xl mb-4">
        <h2 className="text-yellow-400 font-bold">Wallet Status</h2>

        <p className="break-all text-gray-300">
          {address || "No address"}
        </p>

        <p className="text-cyan-400 mt-2">
          {ui}
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
          WalletConssnect
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