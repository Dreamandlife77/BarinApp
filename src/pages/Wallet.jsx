import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Wallet() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [status, setStatus] = useState("Not Connected");
  const lock = useRef(false);

  // 🔥 CRITICAL FIX 1: FORCE SESSION RECHECK AFTER RETURN
  useEffect(() => {
    const check = () => {
      window.dispatchEvent(new Event("focus"));
    };

    const interval = setInterval(check, 1200);

    window.addEventListener("visibilitychange", check);
    window.addEventListener("focus", check);

    return () => {
      clearInterval(interval);
      window.removeEventListener("visibilitychange", check);
      window.removeEventListener("focus", check);
    };
  }, []);

  // 🔥 CRITICAL FIX 2: REAL CONNECTION STATE
  useEffect(() => {
    if (isConnected && address) {
      setStatus("Connected ✅");
    } else {
      setStatus("Not Connected");
    }
  }, [isConnected, address]);

  // 🔥 CONNECT SAFE
  const handleConnect = (id) => {
    if (lock.current) return;
    lock.current = true;

    const connector = connectors.find((c) => c.id === id);
    if (!connector) return;

    setStatus("Opening wallet...");

    connect({ connector });

    // IMPORTANT: DO NOT WAIT OR EXPECT RETURN EVENT
    setStatus("Approve in wallet and return manually");

    setTimeout(() => {
      lock.current = false;
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4">

      <div className="bg-slate-900 p-4 rounded-xl mb-4">
        <h2 className="text-yellow-400 font-bold">Wallet Status</h2>

        <p className="text-gray-300">
          {address ? address : "Not Connected"}
        </p>

        <p className="text-cyan-400">{status}</p>

        {isConnected && (
          <button
            className="mt-3 bg-red-500 px-4 py-2 rounded"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
        )}
      </div>

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