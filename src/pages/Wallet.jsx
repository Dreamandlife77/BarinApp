import { useAccount, useConnect } from "wagmi";
import API from "../config/api";
import { useEffect, useState } from "react";

export default function Wallet() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();

  const [status, setStatus] = useState("Not Connected");

  const loginBackend = async (addr) => {
    try {
      console.log("Sending address:", addr);

      const res = await API.post("/auth/wallet-login", {
        address: addr,
      });

      console.log("Backend response:", res.data);

      localStorage.setItem("token", res.data.token);

      setStatus("Connected ✅");
    } catch (err) {
      console.log(err);
      setStatus("Backend error");
    }
  };

  useEffect(() => {
    if (isConnected && address) {
      loginBackend(address);
    }
  }, [isConnected, address]);

  const handleConnect = (id) => {
    const connector = connectors.find(c => c.id === id);
    if (!connector) return;

    connect({ connector });

    setStatus("Opening wallet...");
  };

  return (
    <div className="p-4 text-white bg-black min-h-screen">

      <h2>Wallet</h2>

      <p>{address || "No wallet"}</p>
      <p>{status}</p>

      <button onClick={() => handleConnect("metaMaskSDK")}>
        MetaMask
      </button>

      <button onClick={() => handleConnect("walletConnect")}>
        WalletConnesssssct
      </button>

      <button onClick={() => handleConnect("coinbaseWalletSDK")}>
        Coinbase
      </button>

    </div>
  );
}