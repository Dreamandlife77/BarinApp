import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Wallet() {
  const { address, isConnected, status } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const [ui, setUi] = useState("Not Connected");

  // -------------------------
  // FORCE RECHECK SESSION (KEY FIX)
  // -------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      window.dispatchEvent(new Event("focus"));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // -------------------------
  // UPDATE UI FROM REAL STATE
  // -------------------------
  useEffect(() => {
    if (isConnected && address) {
      setUi("Connected ✅");
    } else {
      setUi("Not Connected");
    }
  }, [isConnected, address]);

  // -------------------------
  // CONNECT WALLET
  // -------------------------
  const handleConnect = (id) => {
    const connector = connectors.find((c) => c.id === id);
    if (!connector) return;

    setUi("Opening wallet...");

    connect({ connector });

    setUi("Approve in wallet and return here");
  };

  return (
    <div style={{ padding: 20, color: "white" }}>

      <h2>Wallet Status</h2>

      <p>
        {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "None"}
      </p>

      <p style={{ color: "orange" }}>{ui}</p>

      {isConnected && (
        <button onClick={() => disconnect()}>
          Disconnect
        </button>
      )}

      <hr />

      <button onClick={() => handleConnect("metaMaskSDK")}>
        MetaMask
      </button>

      <button onClick={() => handleConnect("walletConnect")}>
        WalletConnect
      </button>

      <button onClick={() => handleConnect("coinbaseWalletSDK")}>
        Coinbase
      </button>

    </div>
  );
}