import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Wallet() {
  const { address, isConnected, status } = useAccount();
  const { connectors, connect, error } = useConnect();
  const { disconnect } = useDisconnect();

  const [uiStatus, setUiStatus] = useState("Not Connected");
  const [isLoading, setIsLoading] = useState(false);
  const [showRetry, setShowRetry] = useState(false);
  const connectingRef = useRef(false);
  const timeoutRef = useRef(null);
  const pollIntervalRef = useRef(null);

  // -------------------------
  // CLEAN WALLET SESSIONS
  // -------------------------
  const cleanupSessions = () => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.includes("walletconnect") || key.includes("wc@") || key.includes("WALLETCONNECT")) {
          localStorage.removeItem(key);
          console.log("Removed session:", key);
        }
      });
    } catch (e) {
      console.log("Cleanup error:", e);
    }
  };

  // Run cleanup on mount
  useEffect(() => {
    cleanupSessions();
  }, []);

  // -------------------------
  // FORCE STATE SYNC AFTER RETURN
  // -------------------------
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("App became visible - checking connection...");
        
        // Dispatch events to wake up the connection
        window.dispatchEvent(new Event("focus"));
        window.dispatchEvent(new Event("resize"));
        
        // If we were in a connecting state, actively poll for connection
        if (connectingRef.current) {
          setUiStatus("Checking connection status...");
          startPollingForConnection();
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
    };
  }, []);

  // -------------------------
  // POLL FOR CONNECTION
  // -------------------------
  const startPollingForConnection = () => {
    // Clear any existing poll
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }

    let pollCount = 0;
    const maxPolls = 15; // Poll for 15 seconds max

    pollIntervalRef.current = setInterval(() => {
      pollCount++;
      console.log(`Polling for connection... (${pollCount}/${maxPolls})`);
      
      // Force a status check
      window.dispatchEvent(new Event("focus"));
      
      // If connected, stop polling
      if (isConnected) {
        console.log("Connection detected!");
        setUiStatus("Connected ✅");
        setIsLoading(false);
        connectingRef.current = false;
        setShowRetry(false);
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;
        }
        return;
      }
      
      // If max polls reached, show retry option
      if (pollCount >= maxPolls) {
        console.log("Polling timeout - showing retry");
        setUiStatus("Connection timeout. Please try again.");
        setIsLoading(false);
        connectingRef.current = false;
        setShowRetry(true);
        if (pollIntervalRef.current) {
          clearInterval(pollIntervalRef.current);
          pollIntervalRef.current = null;
        }
      }
    }, 1000);
  };

  // -------------------------
  // MONITOR CONNECTION STATUS
  // -------------------------
  useEffect(() => {
    console.log("Status update:", { status, isConnected, address });
    
    if (isConnected && address) {
      setUiStatus(`Connected ✅ ${address.slice(0, 6)}...${address.slice(-4)}`);
      setIsLoading(false);
      connectingRef.current = false;
      setShowRetry(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
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
  // HANDLE CONNECTION ERROR
  // -------------------------
  useEffect(() => {
    if (error) {
      console.error("Connection error:", error);
      setIsLoading(false);
      connectingRef.current = false;
      setShowRetry(true);
      
      // Stop any polling
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
      }
      
      let errorMessage = "Connection failed";
      if (error.message?.toLowerCase().includes("reject") || 
          error.message?.toLowerCase().includes("deny") ||
          error.message?.toLowerCase().includes("user rejected")) {
        errorMessage = "Connection rejected in wallet ❌";
      } else if (error.message?.toLowerCase().includes("timeout")) {
        errorMessage = "Connection timed out ⏱️";
      } else if (error.message) {
        errorMessage = error.message.slice(0, 60);
      }
      
      setUiStatus(errorMessage);
      
      // Auto clear after 5 seconds
      const timer = setTimeout(() => {
        if (!isConnected) {
          setUiStatus("Not Connected");
          setShowRetry(false);
        }
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error, isConnected]);

  // -------------------------
  // CONNECT HANDLER
  // -------------------------
  const handleConnect = async (id) => {
    // Prevent multiple attempts
    if (connectingRef.current || isLoading) {
      console.log("Connection already in progress");
      return;
    }

    // Clean up existing connection
    if (isConnected) {
      await disconnect();
      await new Promise(resolve => setTimeout(resolve, 500));
      cleanupSessions();
    }

    // Reset states
    connectingRef.current = true;
    setIsLoading(true);
    setShowRetry(false);
    setUiStatus("Opening wallet...");

    // Clear any existing timeouts/intervals
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }

    try {
      const connector = connectors.find((c) => c.id === id);
      if (!connector) {
        throw new Error("Connector not found");
      }

      console.log(`Connecting with: ${connector.id}`);

      // Special handling for WalletConnect
      if (id === "walletConnect") {
        setUiStatus("Opening Trust Wallet...");
        
        // Initiate connection
        await connect({ connector });
        
        // After connection attempt, start polling
        setUiStatus("📱 Approve in Trust Wallet & return to Telegram");
        
        // Start polling for connection after 2 seconds
        setTimeout(() => {
          if (!isConnected && connectingRef.current) {
            startPollingForConnection();
          }
        }, 2000);
        
        // Set a timeout for overall connection
        timeoutRef.current = setTimeout(() => {
          if (!isConnected && connectingRef.current) {
            setUiStatus("⏱️ Connection taking too long. Try again.");
            setIsLoading(false);
            connectingRef.current = false;
            setShowRetry(true);
            if (pollIntervalRef.current) {
              clearInterval(pollIntervalRef.current);
              pollIntervalRef.current = null;
            }
          }
        }, 30000); // 30 second timeout
        
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
      setShowRetry(true);
    }
  };

  // -------------------------
  // RETRY CONNECTION
  // -------------------------
  const handleRetry = () => {
    setShowRetry(false);
    handleConnect("walletConnect");
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
      setShowRetry(false);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
        pollIntervalRef.current = null;
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
          uiStatus.includes("Error") || uiStatus.includes("❌") ? "text-red-400" :
          uiStatus.includes("📱") ? "text-blue-400" :
          uiStatus.includes("⏱️") ? "text-orange-400" :
          "text-cyan-400"
        }`}>
          {isLoading && uiStatus.includes("...") ? "⏳ " : ""}
          {uiStatus}
        </p>
        
        {showRetry && !isConnected && (
          <button
            onClick={handleRetry}
            className="mt-3 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors text-sm"
          >
            🔄 Retry Connection
          </button>
        )}
        
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
            <span className="text-sm font-medium">Trust Wallet</span>
            <span className="text-xs text-gray-500 mt-1">via WalletConnect</span>
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
      
      {/* DETAILED INSTRUCTIONS */}
      <div className="mt-6 text-xs text-gray-500 text-center space-y-1 bg-slate-900/50 rounded-lg p-4 border border-slate-800">
        <p className="text-gray-400 font-medium mb-2">📋 How to Connect Trust Wallet:</p>
        <p>1️⃣ Tap <span className="text-purple-400">Trust Wallet</span> button above</p>
        <p>2️⃣ Trust Wallet will open sssssautomatically</p>
        <p>3️⃣ Enter your password and unlock</p>
        <p>4️⃣ Tap <span className="text-green-400">"Connect"</span> or <span className="text-green-400">"Approve"</span></p>
        <p>5️⃣ <span className="text-yellow-400 font-medium">Manually return to Telegram</span></p>
        <p className="text-blue-400 mt-2">⏳ The app will auto-detect your return</p>
        {uiStatus.includes("Error") && (
          <p className="text-red-400 mt-2">❌ If it fails, tap "Retry Connection"</p>
        )}
      </div>
    </div>
  );
}