import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { walletConnect } from "wagmi/connectors";

export default function Wallet() {
  const { address, isConnected, status } = useAccount();
  const { connectors, connect, error } = useConnect();
  const { disconnect } = useDisconnect();

  const [uiStatus, setUiStatus] = useState("Not Connected");
  const [isLoading, setIsLoading] = useState(false);
  const [connectionAttempt, setConnectionAttempt] = useState(0);
  const connectingRef = useRef(false);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  const projectId = "beb23aec824ef375771f0418bffcfd14";

  // -------------------------
  // CLEANUP FUNCTION
  // -------------------------
  const cleanupSessions = () => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.includes("walletconnect") || key.includes("wc@") || key.includes("WALLETCONNECT")) {
          localStorage.removeItem(key);
        }
      });
      sessionStorage.clear();
    } catch (e) {
      console.log("Cleanup error:", e);
    }
  };

  // -------------------------
  // GET WALLETCONNECT CONNECTOR
  // -------------------------
  const getWCConnector = () => {
    return connectors.find(c => c.id === "walletConnect");
  };

  // -------------------------
  // POLL FOR CONNECTION STATUS
  // -------------------------
  const startPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    let attempts = 0;
    const maxAttempts = 20;

    intervalRef.current = setInterval(() => {
      attempts++;
      console.log(`Polling connection... attempt ${attempts}`);

      // Check if connected
      if (isConnected) {
        console.log("Connection detected!");
        setUiStatus("Connected ✅");
        setIsLoading(false);
        connectingRef.current = false;
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        return;
      }

      // Check for any WalletConnect session in localStorage
      const hasSession = Object.keys(localStorage).some(key => 
        key.includes("walletconnect") && localStorage.getItem(key)
      );

      if (hasSession && !isConnected) {
        console.log("Found WalletConnect session, trying to reconnect...");
        // Try to reconnect
        const wcConnector = getWCConnector();
        if (wcConnector) {
          connect({ connector: wcConnector }).then(() => {
            console.log("Reconnection attempt made");
          }).catch(err => {
            console.log("Reconnection failed:", err);
          });
        }
      }

      // Timeout after max attempts
      if (attempts >= maxAttempts) {
        console.log("Polling timeout");
        setUiStatus("⏱️ Connection timeout. Tap retry.");
        setIsLoading(false);
        connectingRef.current = false;
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 1000);
  };

  // -------------------------
  // CONNECT TO WALLETCONNECT
  // -------------------------
  const connectToWalletConnect = async () => {
    if (connectingRef.current || isLoading) {
      console.log("Already connecting...");
      return;
    }

    // Cleanup
    if (isConnected) {
      await disconnect();
      cleanupSessions();
    }

    // Clean any existing intervals
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    connectingRef.current = true;
    setIsLoading(true);
    setConnectionAttempt(prev => prev + 1);
    setUiStatus("🔄 Opening Trust Wallet...");

    try {
      const wcConnector = getWCConnector();
      if (!wcConnector) {
        throw new Error("WalletConnect connector not found");
      }

      console.log("Initiating WalletConnect connection...");

      // Start the connection
      await connect({ connector: wcConnector });

      // Update status
      setUiStatus("📱 Approve in Trust Wallet");

      // Wait a moment then start polling
      setTimeout(() => {
        if (!isConnected && connectingRef.current) {
          setUiStatus("📱 Approve in Trust Wallet & return to Telegram");
          startPolling();
        }
      }, 2000);

      // Overall timeout
      timeoutRef.current = setTimeout(() => {
        if (!isConnected && connectingRef.current) {
          setUiStatus("⏱️ Connection timeout. Tap retry.");
          setIsLoading(false);
          connectingRef.current = false;
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }, 30000);

    } catch (err) {
      console.error("Connection error:", err);
      
      // Check if it's a modal close/error
      if (err.message?.includes("closed") || err.message?.includes("reject")) {
        setUiStatus("❌ Connection rejected. Tap retry.");
      } else {
        setUiStatus(`❌ Error: ${err.message?.slice(0, 40) || "Connection failed"}`);
      }
      
      setIsLoading(false);
      connectingRef.current = false;
    }
  };

  // -------------------------
  // HANDLE CONNECTION WITH DIRECT DEEP LINK
  // -------------------------
  const connectWithDeepLink = async () => {
    if (connectingRef.current || isLoading) return;

    // Cleanup
    cleanupSessions();
    if (isConnected) {
      await disconnect();
    }

    connectingRef.current = true;
    setIsLoading(true);
    setUiStatus("🔗 Generating connection...");

    try {
      // Create a new WalletConnect connector with specific options
      const wcConnector = walletConnect({
        projectId: projectId,
        showQrModal: true,
        qrModalOptions: {
          themeMode: 'dark',
          themeVariables: {
            '--wcm-z-index': '9999',
          }
        },
        metadata: {
          name: "BARIN Game",
          description: "BARIN Game Mini App",
          url: "https://barin-app.vercel.app",
          icons: ["https://barin-app.vercel.app/icon.png"],
        },
      });

      // Connect using the new connector
      await connect({ connector: wcConnector });

      setUiStatus("📱 Check Trust Wallet");
      
      // Start polling
      setTimeout(() => {
        if (!isConnected && connectingRef.current) {
          setUiStatus("📱 Approve in Trust Wallet & return");
          startPolling();
        }
      }, 3000);

      // Timeout
      timeoutRef.current = setTimeout(() => {
        if (!isConnected && connectingRef.current) {
          setUiStatus("⏱️ Timeout. Try again.");
          setIsLoading(false);
          connectingRef.current = false;
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
        }
      }, 30000);

    } catch (err) {
      console.error("Deep link error:", err);
      setUiStatus("❌ Connection failed. Tap retry.");
      setIsLoading(false);
      connectingRef.current = false;
    }
  };

  // -------------------------
  // MONITOR CONNECTION STATUS
  // -------------------------
  useEffect(() => {
    console.log("Status changed:", { status, isConnected, address });
    
    if (isConnected && address) {
      setUiStatus(`✅ Connected ${address.slice(0, 6)}...${address.slice(-4)}`);
      setIsLoading(false);
      connectingRef.current = false;
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }, [status, isConnected, address]);

  // -------------------------
  // HANDLE VISIBILITY CHANGE
  // -------------------------
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        console.log("App returned to foreground");
        window.dispatchEvent(new Event("focus"));
        window.dispatchEvent(new Event("resize"));
        
        // If we were connecting, try to check status
        if (connectingRef.current && !isConnected) {
          setUiStatus("🔄 Checking connection...");
          
          // Force a status check
          const wcConnector = getWCConnector();
          if (wcConnector) {
            // Check if there's a session
            const hasSession = Object.keys(localStorage).some(key => 
              key.includes("walletconnect") && localStorage.getItem(key)
            );
            
            if (hasSession) {
              console.log("Found session, attempting to finalize connection");
              // Try to reconnect
              connect({ connector: wcConnector }).catch(console.log);
            }
          }
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [isConnected]);

  // -------------------------
  // DISCONNECT
  // -------------------------
  const handleDisconnect = async () => {
    try {
      await disconnect();
      cleanupSessions();
      setUiStatus("Disconnected");
      setIsLoading(false);
      connectingRef.current = false;
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
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
          uiStatus.includes("🔄") ? "text-yellow-400" :
          uiStatus.includes("❌") ? "text-red-400" :
          uiStatus.includes("📱") ? "text-blue-400" :
          uiStatus.includes("⏱️") ? "text-orange-400" :
          "text-cyan-400"
        }`}>
          {uiStatus}
        </p>
        
        {/* RETRY BUTTON */}
        {!isConnected && (uiStatus.includes("retry") || uiStatus.includes("Timeout") || uiStatus.includes("Error")) && (
          <div className="mt-3 flex gap-2 justify-center">
            <button
              onClick={connectToWalletConnect}
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              🔄 Retry Connection
            </button>
            <button
              onClick={connectWithDeepLink}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors text-sm"
            >
              🔗 Try Alternative
            </button>
          </div>
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
        
        {connectionAttempt > 0 && !isConnected && (
          <p className="mt-2 text-xs text-gray-500">Attempt #{connectionAttempt}</p>
        )}
      </div>

      {/* WALLET BUTTONS */}
      <div className="space-y-3">
        <button
          onClick={connectToWalletConnect}
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl p-4 transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-lg font-bold">Trust Wallet</span>
            <span className="text-sm bg-white/20 px-2 py-1 rounded">via WalletConnect</span>
          </div>
        </button>

        <button
          onClick={() => {
            // For MetaMask
            const connector = connectors.find(c => c.id === "metaMaskSDK");
            if (connector) connect({ connector });
          }}
          disabled={isLoading}
          className={`w-full bg-slate-900 border border-slate-700 hover:border-orange-500 rounded-xl p-4 transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-lg">MetaMask</span>
          </div>
        </button>

        <button
          onClick={() => {
            const connector = connectors.find(c => c.id === "coinbaseWalletSDK");
            if (connector) connect({ connector });
          }}
          disabled={isLoading}
          className={`w-full bg-slate-900 border border-slate-700 hover:border-blue-500 rounded-xl p-4 transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-lg">Coinbase Wallet</span>
          </div>
        </button>
      </div>
      
      {/* DETAILED INSTRUCTIONS */}
      <div className="mt-6 text-xs text-gray-500 text-center bg-slate-900/50 rounded-lg p-4 border border-slate-800">
        <p className="text-gray-400 font-medium mb-2">📋 How to Connect:</p>
        <p>1️⃣ Tap <span className="text-purple-400 font-medium">Trust Wallet</span> button above</p>
        <p>2️⃣ Trust Wallet will open automatically</p>
        <p>3️⃣ Enter your password and unlock</p>
        <p>4️⃣ Tap <span className="text-green-400">"Connect"</span> or <span className="text-green-400">"Approve"</span></p>
        <p>5️⃣ <span className="text-yellow-400 font-medium">Manually return to Telegram</span></p>
        <p className="text-blue-400 mt-2">⏳ The app will auto-detect your return</p>
        <p className="text-gray-600 mt-2">If it doesn't work, try the <span className="text-blue-400">"Try Alternative"</span> button</p>
      </div>
    </div>
  );
}