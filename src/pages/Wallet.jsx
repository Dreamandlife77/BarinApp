import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Wallet() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [status, setStatus] = useState("Not Connected");
  const lock = useRef(false);

  // -----------------------------
  // 🔥 ALERT DEBUG FUNCTION
  // -----------------------------
  const debugAlert = (title, data) => {
    alert(
      `${title}\n\n` +
      JSON.stringify(data, null, 2)
    );
  };

  // -----------------------------
  // 🔥 CHECK SESSION EVERY 2s
  // -----------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      const wcKeys = Object.keys(localStorage).filter(k =>
        k.includes("wc") || k.includes("walletconnect")
      );

      const wagmiKeys = Object.keys(localStorage).filter(k =>
        k.includes("wagmi")
      );

      debugAlert("SESSION CHECK", {
        isConnected,
        address,
        wcKeys,
        wagmiKeys
      });

    }, 5000); // every 5 sec (not too spammy)

    return () => clearInterval(interval);
  }, [isConnected, address]);

  // -----------------------------
  // 🔥 CONNECT WALLET
  // -----------------------------
  const handleConnect = (id) => {
    if (lock.current) return;
    lock.current = true;

    const connector = connectors.find(c => c.id === id);

    if (!connector) {
      alert("Connector not found: " + id);
      return;
    }

    alert("STEP 1: Opening wallet...");

    connect({ connector });

    alert("STEP 2: Approve in wallet then return");

    setTimeout(() => {
      lock.current = false;
    }, 3000);
  };

  // -----------------------------
  // 🔥 STATE TRACKING
  // -----------------------------
  useEffect(() => {
    debugAlert("STATE UPDATE", {
      isConnected,
      address,
      status
    });

    if (isConnected && address) {
      setStatus("Connected ✅");
    } else {
      setStatus("Not Connected");
    }
  }, [isConnected, address]);

  // -----------------------------
  // UI
  // -----------------------------
  return (
    <div className="min-h-screen bg-black text-white p-4">

      <div className="bg-gray-900 p-4 rounded">
        <h2>Wallet Debug Panel</h2>

        <p>{address || "No Address"}</p>
        <p>{status}</p>

        {isConnected && (
          <button onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-2 mt-4">

        <button onClick={() => handleConnect("metaMaskSDK")}>
          MetaMask
        </button>

        <button onClick={() => handleConnect("walletConnect")}>
          WalletConnect1
        </button>

        <button onClick={() => handleConnect("coinbaseWalletSDK")}>
          Coinbase
        </button>

      </div>
    </div>
  );
}