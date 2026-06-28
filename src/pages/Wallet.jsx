import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Wallet() {
  const { address, isConnected, status } = useAccount();
  const { connectors, connect, error } = useConnect();
  const { disconnect } = useDisconnect();

  const [uiStatus, setUiStatus] = useState("Not Connected");
  const [isLoading, setIsLoading] = useState(false);
  const connectingRef = useRef(false);

  // -------------------------
  // FORCE STATE SYNC AFTER RETURN
  // -------------------------
  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        window.dispatchEvent(new Event("focus"));
        // Also trigger a resize event which can help with reconnection
        window.dispatchEvent(new Event("resize"));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // -------------------------
  // REAL CONNECTION TRACKING
  // -------------------------
  useEffect(() => {
    if (isConnected && address) {
      setUiStatus("Connected ✅");
      setIsLoading(false);
      connectingRef.current = false;
    } else if (status === "connecting") {
      setUiStatus("Connecting...");
    } else {
      setUiStatus("Not Connected");
    }
  }, [isConnected, address, status]);

  // -------------------------
  // CLEAN WALLET SESSIONS
  // -------------------------
  useEffect(() => {
    // Clean up old sessions but keep current
    const keysToRemove = [];
    Object.keys(localStorage).forEach((key) => {
      if ((key.includes("walletconnect") || key.includes("wc@")) && !key.includes("current")) {
        keysToRemove.push(key);
      }
    });
    keysToRemove.forEach(key => localStorage.removeItem(key));
  }, []);

  // -------------------------
  // HANDLE CONNECTION ERROR
  // -------------------------
  useEffect(() => {
    if (error) {
      console.error("Connection error:", error);
      setIsLoading(false);
      connectingRef.current = false;
      setUiStatus("Connection failed. Try again.");
      
      // Reset after 3 seconds
      const timer = setTimeout(() => {
        setUiStatus("Not Connected");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [error]);

  // -------------------------
  // CONNECT HANDLER
  // -------------------------
  const handleConnect = async (id) => {
    if (connectingRef.current || isLoading) return;
    
    // Clean up any existing connections first
    if (isConnected) {
      await disconnect();
      // Wait a bit for disconnection to complete
      await new Promise(resolve => setTimeout(resolve, 500));
    }

    connectingRef.current = true;
    setIsLoading(true);
    setUiStatus("Opening wallet...");

    try {
      const connector = connectors.find((c) => c.id === id);
      if (!connector) {
        throw new Error("Connector not found");
      }

      // Check if connector is already connected
      if (connector.ready) {
        // For WalletConnect, we need to ensure we handle the deep link properly
        if (id === "walletConnect") {
          setUiStatus("Opening Trust Wallet...");
          
          // Connect with a timeout to handle the return
          const connectPromise = connect({ connector });
          
          // Set a timeout to show the user they need to return
          setTimeout(() => {
            if (!isConnected && !connectingRef.current) {
              setUiStatus("Return to Telegram after approving");
            }
          }, 3000);
          
          await connectPromise;
          setUiStatus("Approved! Finalizing...");
        } else {
          await connect({ connector });
        }
      } else {
        setUiStatus("Connector not ready. Please try again.");
        connectingRef.current = false;
        setIsLoading(false);
        return;
      }

    } catch (err) {
      console.error("Connection error:", err);
      setUiStatus("Error connecting. Please try again.");
      
      // If it's a user rejection, handle it gracefully
      if (err.message?.includes("rejected")) {
        setUiStatus("Connection rejected");
      }
      
      // Reset after 3 seconds
      setTimeout(() => {
        setUiStatus("Not Connected");
        connectingRef.current = false;
        setIsLoading(false);
      }, 3000);
    } finally {
      // Don't reset loading state here if connected
      if (!isConnected) {
        setTimeout(() => {
          connectingRef.current = false;
          setIsLoading(false);
        }, 2000);
      }
    }
  };

  // -------------------------
  // DISCONNECT HANDLER
  // -------------------------
  const handleDisconnect = async () => {
    try {
      await disconnect();
      setUiStatus("Disconnected");
      // Clear any lingering WalletConnect data
      Object.keys(localStorage).forEach((key) => {
        if (key.includes("walletconnect") || key.includes("wc@")) {
          localStorage.removeItem(key);
        }
      });
      setTimeout(() => setUiStatus("Not Connected"), 500);
    } catch (err) {
      console.error("Disconnect error:", err);
    }
  };

  // -------------------------
  // CHECK FOR EXISTING CONNECTION ON MOUNT
  // -------------------------
  useEffect(() => {
    const checkConnection = async () => {
      // If there's a stored session, try to reconnect
      const hasWCSession = Object.keys(localStorage).some(key => 
        key.includes("walletconnect") && localStorage.getItem(key)
      );
      
      if (hasWCSession && !isConnected) {
        setUiStatus("Reconnecting...");
        try {
          const wcConnector = connectors.find(c => c.id === "walletConnect");
          if (wcConnector) {
            await connect({ connector: wcConnector });
          }
        } catch (err) {
          console.log("Auto-reconnect failed:", err);
        }
      }
    };
    
    checkConnection();
  }, []);

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
          uiStatus.includes("failed") || uiStatus.includes("Error") ? "text-red-400" :
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
          <div className="mt-2 w-full h-1 bg-slate-700 rounded-full overflow-hidden">
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
          }`}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm">WalletConnect</span>
            <span className="text-xs text-gray-500 mt-1">Trust Wallet</span>
          </div>
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
      
      {/* Help text */}
      <div className="mt-6 text-xs text-gray-500 text-center">
        <p>After approving in Trust Wallet, return to Telegram manually</p>
        <p className="mt-1">The app will automatically detect the connection</p>
      </div>
    </div>
  );
}