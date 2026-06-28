import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

import MetaMaskIcon from "../assets/Wallet/MetaMask.png";
import CoinbaseIcon from "../assets/Wallet/Coinbase.png";
import WalletConnectIcon from "../assets/Wallet/WalletConnect.png";

export default function Wallet() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const [status, setStatus] = useState("Not Connected");
  const connectingRef = useRef(false);

  // ----------------------------
  // AUTO SYNC CONNECTION STATE (IMPORTANT FIX)
  // ----------------------------
  useEffect(() => {
    if (isConnected && address) {
      setStatus("Connected ✅");
    } else {
      setStatus("Not Connected");
    }
  }, [isConnected, address]);

  // ----------------------------
  // CLEAN OLD WALLET SESSIONS
  // ----------------------------
  useEffect(() => {
    Object.keys(localStorage).forEach((key) => {
      if (key.includes("walletconnect") || key.includes("wc@")) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  // ----------------------------
  // CONNECT HANDLER (SAFE)
  // ----------------------------
  const handleConnect = async (id) => {
    if (connectingRef.current) return;
    connectingRef.current = true;

    try {
      const connector = connectors.find((c) => c.id === id);
      if (!connector) return;

      setStatus("Opening wallet...");

      // IMPORTANT: do NOT await state here
      connect({ connector });

      setStatus("Approve in wallet and return manually");

    } catch (err) {
      console.log("Connect error (ignored):", err);
      setStatus("Wallet opened — complete approval in app");
    } finally {
      connectingRef.current = false;
    }
  };

  return (
    <div style={{ padding: 20, color: "white" }}>

      {/* STATUS */}
      <div style={{ marginBottom: 20 }}>
        <h3>Wallet Status</h3>

        <p>
          {address
            ? `${address.slice(0, 6)}...${address.slice(-4)}`
            : "Not Connected"}
        </p>

        <p style={{ color: "orange" }}>{status}</p>

        {isConnected && (
          <button onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      {/* BUTTONS */}
      <div style={{ display: "flex", gap: 10 }}>

        <button onClick={() => handleConnect("metaMaskSDK")}>
          <img src={MetaMaskIcon} width={40} />
          MetaMask
        </button>

        <button onClick={() => handleConnect("walletConnect")}>
          <img src={WalletConnectIcon} width={40} />
          WalletConnect
        </button>


      </div>
    </div>
  );
}