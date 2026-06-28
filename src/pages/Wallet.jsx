import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useQueryClient } from "@tanstack/react-query";

export default function Wallet() {

  // ✅ MUST be inside component
  const queryClient = useQueryClient();

  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [status, setStatus] = useState("Not Connected");
  const lock = useRef(false);

  // ----------------------------
  // FIX 1: FORCE RETURN DETECTION
  // ----------------------------
  useEffect(() => {
    const onReturn = () => {
      console.log("🔄 User returned from wallet");

      // force wagmi + react-query refresh
      queryClient.invalidateQueries();
    };

    window.addEventListener("focus", onReturn);
    window.addEventListener("visibilitychange", onReturn);

    return () => {
      window.removeEventListener("focus", onReturn);
      window.removeEventListener("visibilitychange", onReturn);
    };
  }, [queryClient]);

  // ----------------------------
  // FIX 2: REAL CONNECTION STATE
  // ----------------------------
  useEffect(() => {
    if (isConnected && address) {
      setStatus("Connected ✅");
    } else {
      setStatus("Not Connected");
    }
  }, [isConnected, address]);

  // ----------------------------
  // FIX 3: CONNECT WALLET SAFELY
  // ----------------------------
  const handleConnect = (id) => {
    if (lock.current) return;
    lock.current = true;

    const connector = connectors.find((c) => c.id === id);
    if (!connector) return;

    setStatus("Opening wallet...");

    connect({ connector });

    setStatus("Approve in wallet and return");

    setTimeout(() => {
      lock.current = false;
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4">

      {/* STATUS CARD */}
      <div className="bg-slate-900 p-4 rounded-xl mb-4 border border-slate-800">

        <h2 className="text-yellow-400 font-bold">
          Wallet Status
        </h2>

        <p className="text-gray-300 break-all">
          {address ? address : "Not Connected"}
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
          className="bg-slate-800 p-3 rounded hover:bg-slate-700"
          onClick={() => handleConnect("metaMaskSDK")}
        >
          MetaMask
        </button>

        <button
          className="bg-slate-800 p-3 rounded hover:bg-slate-700"
          onClick={() => handleConnect("walletConnect")}
        >
          WalletConnect
        </button>

        <button
          className="bg-slate-800 p-3 rounded hover:bg-slate-700"
          onClick={() => handleConnect("coinbaseWalletSDK")}
        >
          Coinbase
        </button>

      </div>

    </div>
  );
}