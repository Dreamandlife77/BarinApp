import { useEffect, useRef } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function WalletPage() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const connectingRef = useRef(false);

  // 🔥 FORCE RECONNECT DETECTION (THIS FIXES YOUR STUCK SCREEN)
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        window.dispatchEvent(new Event("focus"));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // 🔥 AUTO UPDATE UI
  useEffect(() => {
    console.log("Wallet state:", { address, isConnected });
  }, [address, isConnected]);

  const handleConnect = async (id) => {
    if (connectingRef.current) return;
    connectingRef.current = true;

    try {
      const connector = connectors.find((c) => c.id === id);
      if (!connector) return;

      console.log("Connecting:", connector.name);

      connect({ connector });

      // IMPORTANT: DO NOT WAIT FOR RETURN
      console.log("Wallet opened. wait for approval...");
    } catch (e) {
      console.log(e);
    } finally {
      connectingRef.current = false;
    }
  };

  return (
    <div className="bg-color: red">
      <h2>Wallet</h2>

      <p>
        {isConnected
          ? `Connected: ${address}`
          : "Not Connected"}
      </p>

      <button onClick={() => handleConnect("metaMaskSDK")}>
        MetaMask
      </button>

      <button onClick={() => handleConnect("walletConnect")}>
        WalletConnect
      </button>

      <button onClick={() => handleConnect("coinbaseWalletSDK")}>
        Coinbase
      </button>

      <button onClick={() => disconnect()}>
        Disconnect
      </button>
    </div>
  );
}