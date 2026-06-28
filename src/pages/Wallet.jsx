import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Wallet() {
  const { address, isConnected, status } = useAccount();
  const { connectors, connect, error } = useConnect();
  const { disconnect } = useDisconnect();

  const [uiStatus, setUiStatus] = useState("Not Connected");
  const [isLoading, setIsLoading] = useState(false);
  const connectingRef = useRef(false);
  const timeoutRef = useRef(null);

  // -------------------------
  // FORCE STATE SYNC AFTER RETURN
  // -------------------------
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        // When user returns to Telegram, trigger events to wake up the connection
        window.dispatchEvent(new Event("focus"));
        window.dispatchEvent(new Event("resize"));
        
        // If we were connecting, check the status after a moment
        if (connectingRef.current) {
          setUiStatus("Checking connection...");
          setTimeout(() => {
            if (!isConnected && connectingRef.current) {
              setUiStatus("Still waiting for approval...");
            }
          }, 2000);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    // Also check periodically when visible
    const interval = setInterval(() => {
      if (document.visibilityState === "visible" && connectingRef.current) {
        window.dispatchEvent(new Event("focus"));
      }
    }, 2000);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      clearInterval(interval);
    };
  }, [isConnected]);

  // -------------------------
  // MONITOR CONNECTION STATUS
  // -------------------------
  useEffect(() => {
    console.log("Status update:", { status, isConnected, address });
    
    if (isConnected && address) {
      setUiStatus(`Connected ✅ ${address.slice(0, 6)}...${address.slice(-4)}`);
      setIsLoading(false);
      connectingRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    } else if (status === "connecting") {
      setUiStatus("Connecting...");
      setIsLoading(true);
    } else if (status === "disconnected") {
      setUiStatus("Not Connected");
      setIsLoading(false);
      connectingRef.current = false;
    }
  }, [status, isConnected, address]);

  // -------------------------
  // CLEAN WALLET SESSIONS
  // -------------------------
  const cleanupSessions = () => {
    try {
      Object.keys(localStorage).forEach((key) => {
        if (key.includes("walletconnect") || key.includes("wc@") || key.includes("WALLETCONNECT")) {
          localStorage.removeItem(key);
          console.log("Removed stored session:", key);
        }
      });
    } catch (e) {
      console.log("Error cleaning up sessions:", e);
    }
  };

  // Run cleanup on mount
  useEffect(() => {
    cleanupSessions();
  }, []);

  // -------------------------
  // HANDLE CONNECTION ERROR
  // -------------------------
  useEffect(() => {
    if (error) {
      console.error("Connection error:", error);
      setIsLoading(false);
      connectingRef.current = false;
      
      let errorMessage = "Connection failed";
      if (error.message?.includes("rejected") || error.message?.includes("denied")) {
        errorMessage = "Connection rejected in wallet";
      } else if (error.message?.includes("timeout")) {
        errorMessage = "Connection timed out. Try again.";
      } else if (error.message) {
        errorMessage = error.message.slice(0, 60);
      }
      
      setUiStatus(`Error: ${errorMessage}`);
      
      // Auto-clear error after 5 seconds
      const timer = setTimeout(() => {
        if (!isConnected) setUiStatus("Not Connected");
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error, isConnected]);

  // -------------------------
  // CONNECT HANDLER
  // -------------------------
  const handleConnect = async (id) => {
    if (connectingRef.current || isLoading) {
      console.log("Connection already in progress");
      return;
    }

    // If connected, disconnect first
    if (isConnected) {
      await disconnect();
      await new Promise(resolve => setTimeout(resolve, 500));
      cleanupSessions();
    }

    connectingRef.current = true;
    setIsLoading(true);
    setUiStatus("Opening wallet...");

    // Clear any old timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    try {
      const connector = connectors.find((c) => c.id === id);
      if (!connector) {
        throw new Error("Connector not found");
      }

      console.log(`Connecting with: ${connector.id}`, connector);

      // Special handling for WalletConnect
      if (id === "walletConnect") {
        setUiStatus("Preparing WalletConnect...");
        
        // For Trust Wallet, we need to ensure the connection is initiated properly
        // The connector.ready flag might be false, but we can still try to connect
        await connect({ connector });
        
        // After initiating connection, update status
        setUiStatus("Approve in Trust Wallet");
        
        // Set a timeout to remind user to return
        timeoutRef.current = setTimeout(() => {
          if (!isConnected && connectingRef.current) {
            setUiStatus("📱 Check Trust Wallet & return to Telegram");
          }
        }, 5000);
      } else {
        // MetaMask or Coinbase
        if (!connector.ready) {
          throw new Error(`${connector.name || 'Wallet'} is not ready`);
        }
        await connect({ connector });
        setUiStatus("Connected!");
      }

    } catch (err) {
      console.error("Connection error:", err);
      setUiStatus(`Error: ${err.message?.slice(0, 50) || "Connection failed"}`);
      setIsLoading(false);
      connectingRef.current = false;
    }
  };

  // -------------------------
  // DISCONNECT HANDLER
  // -------------------------
  const handleDisconnect = async () => {
    try {
      await disconnect();
      cleanupSessions();
      setUiStatus("Disconnected");
      setIsLoading(false);
      connectingRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setTimeout(() => setUiStatus("Not Connected"), 500);
    } catch (err) {
      console.error("Disconnect error:", err);
    }
  };

  // -------------------------
  // RENDER
  // -------------------------
  return (
    <div className="min-h-screen bg-slate-950 text-white p-4">
      {/* STATUS CARD */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-6">
        <h2 className="text-yellow-400 text-lg font-bold">Wallet Status</h2>
        
        <p className="text-gray-300 mt-1">
          {address
            ? `${address.slice(0, 6)}...${address.slice(-4)}`
            : "Not Connected"}
        </p>
        
        <p className={`mt-2 text-sm ${
          uiStatus.includes("✅") ? "text-green-400" :
          uiStatus.includes("...") ? "text-yellow-400" :
          uiStatus.includes("Error") ? "text-red-400" :
          uiStatus.includes("📱") ? "text-blue-400" :
          "text-cyan-400"
        }`}>
          {isLoading && uiStatus.includes("...") ? "⏳ " : ""}
          {uiStatus}
        </p>
        
        {isConnected && (
          <button
            onClick={handleDisconnect}
            className="mt-4 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition-colors"
          >
            Disconnect
          </button>
        )}
        
        {isLoading && (
          <div className="mt-3 w-full h-1 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 animate-pulse w-1/2 rounded-full"></div>
          </div>
        )}
      </div>

      {/* WALLET BUTTONS */}
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => handleConnect("metaMaskSDK")}
          disabled={isLoading}
          className={`bg-slate-900 border border-slate-700 rounded-xl p-4 hover:border-orange-500 transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm">MetaMask</span>
          </div>
        </button>

        <button
          onClick={() => handleConnect("walletConnect")}
          disabled={isLoading}
          className={`bg-slate-900 border border-slate-700 rounded-xl p-4 hover:border-purple-500 transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          } relative`}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm font-medium">WalletConnect</span>
            <span className="text-xs text-gray-500 mt-1">Trust Wallet</span>
          </div>
          {isLoading && (
            <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          )}
        </button>

        <button
          onClick={() => handleConnect("coinbaseWalletSDK")}
          disabled={isLoading}
          className={`bg-slate-900 border border-slate-700 rounded-xl p-4 hover:border-blue-500 transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm">Coinbase</span>
          </div>
        </button>
      </div>
      
      {/* INSTRUCTIONS */}
      <div className="mt-6 text-xs text-gray-500 text-center space-y-1">
        <p className="text-gray-400 font-medium">For Trust Wallet:</p>
        <p>1️⃣ Tap WalletConnect</p>
        <p>2️⃣ Select Trust Wallet</p>
        <p>3️⃣ Approve the connection in Trust Wallet</p>
        <p>4️⃣ <span className="text-yellow-500">Manually return to Telegram</span></p>
        <p className="text-gray-600 mt-2">⚠️ If stuck, disconnect and try again</p>
      </div>
    </div>
  );
}