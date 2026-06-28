import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

export default function Wallet() {
  const { address, isConnected, status } = useAccount();
  const { connectors, connect, error } = useConnect();
  const { disconnect } = useDisconnect();

  const [uiStatus, setUiStatus] = useState("Not Connected");
  const [isLoading, setIsLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [wcUri, setWcUri] = useState("");
  const connectingRef = useRef(false);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  // -------------------------
  // CLEANUP FUNCTION
  // -------------------------
  const cleanupSessions = () => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.includes("walletconnect") || key.includes("wc@") || key.includes("WALLETCONNECT")) {
          localStorage.removeItem(key);
          console.log("Removed:", key);
        }
      });
      sessionStorage.clear();
    } catch (e) {
      console.log("Cleanup error:", e);
    }
  };

  // Run cleanup on mount
  useEffect(() => {
    cleanupSessions();
  }, []);

  // -------------------------
  // GENERATE QR CODE URI
  // -------------------------
  const generateWalletConnectURI = async () => {
    try {
      setUiStatus("🔗 Generating connection...");
      setIsLoading(true);
      
      // Get the WalletConnect connector
      const wcConnector = connectors.find(c => c.id === "walletConnect");
      if (!wcConnector) {
        throw new Error("WalletConnect connector not found");
      }

      // Get the URI from the connector
      // @ts-ignore - getProvider might not be typed
      const provider = await wcConnector.getProvider();
      
      // @ts-ignore - getUri might not be typed
      const uri = await provider.connector?.uri || provider.uri;
      
      if (!uri) {
        throw new Error("Failed to generate URI");
      }

      console.log("Generated URI:", uri);
      setWcUri(uri);
      setShowQR(true);
      setUiStatus("📱 Scan QR code with Trust Wallet");
      
      // Start polling for connection
      startPollingForConnection();
      
      return uri;
    } catch (err) {
      console.error("URI generation error:", err);
      setUiStatus("❌ Failed to generate QR. Try again.");
      setIsLoading(false);
      return null;
    }
  };

  // -------------------------
  // POLL FOR CONNECTION
  // -------------------------
  const startPollingForConnection = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    let attempts = 0;
    const maxAttempts = 30;

    intervalRef.current = setInterval(() => {
      attempts++;
      console.log(`Polling for connection... ${attempts}/${maxAttempts}`);

      // Check if already connected
      if (isConnected) {
        console.log("Connected!");
        setUiStatus("✅ Connected!");
        setIsLoading(false);
        connectingRef.current = false;
        setShowQR(false);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        return;
      }

      // Check localStorage for WalletConnect session
      const hasSession = Object.keys(localStorage).some(key => 
        key.includes("walletconnect") && localStorage.getItem(key)
      );

      if (hasSession && !isConnected) {
        console.log("Found session, trying to connect...");
        const wcConnector = connectors.find(c => c.id === "walletConnect");
        if (wcConnector) {
          connect({ connector: wcConnector })
            .then(() => {
              console.log("Connection successful!");
            })
            .catch(err => {
              console.log("Connection attempt failed:", err);
            });
        }
      }

      // Timeout
      if (attempts >= maxAttempts) {
        console.log("Polling timeout");
        setUiStatus("⏱️ Connection timeout. Try again.");
        setIsLoading(false);
        connectingRef.current = false;
        setShowQR(false);
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 1000);
  };

  // -------------------------
  // CONNECT WITH DEEP LINK (Alternative)
  // -------------------------
  const connectWithDeepLink = async () => {
    if (connectingRef.current || isLoading) return;
    
    cleanupSessions();
    if (isConnected) {
      await disconnect();
    }

    connectingRef.current = true;
    setIsLoading(true);
    setShowQR(false);
    setUiStatus("🔗 Opening Trust Wallet...");

    try {
      const wcConnector = connectors.find(c => c.id === "walletConnect");
      if (!wcConnector) {
        throw new Error("WalletConnect connector not found");
      }

      // Try to connect with deep link
      await connect({ connector: wcConnector });
      
      setUiStatus("📱 Approve in Trust Wallet");
      
      // Start polling after a delay
      setTimeout(() => {
        if (!isConnected && connectingRef.current) {
          startPollingForConnection();
        }
      }, 2000);

      // Timeout
      timeoutRef.current = setTimeout(() => {
        if (!isConnected && connectingRef.current) {
          setUiStatus("⏱️ Timeout. Try QR code.");
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
      setUiStatus("❌ Connection failed. Try QR code.");
      setIsLoading(false);
      connectingRef.current = false;
    }
  };

  // -------------------------
  // COPY URI TO CLIPBOARD
  // -------------------------
  const copyUriToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(wcUri);
      setUiStatus("✅ URI copied! Open Trust Wallet manually");
      setTimeout(() => {
        setUiStatus("📱 Scan QR or paste URI in Trust Wallet");
      }, 2000);
    } catch (err) {
      console.error("Copy failed:", err);
      setUiStatus("❌ Copy failed. Try QR code.");
    }
  };

  // -------------------------
  // MONITOR CONNECTION STATUS
  // -------------------------
  useEffect(() => {
    console.log("Status:", { status, isConnected, address });
    
    if (isConnected && address) {
      setUiStatus(`✅ Connected ${address.slice(0, 6)}...${address.slice(-4)}`);
      setIsLoading(false);
      connectingRef.current = false;
      setShowQR(false);
      
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
        
        if (connectingRef.current && !isConnected) {
          setUiStatus("🔄 Checking connection...");
          
          // Force a status check
          const wcConnector = connectors.find(c => c.id === "walletConnect");
          if (wcConnector) {
            const hasSession = Object.keys(localStorage).some(key => 
              key.includes("walletconnect") && localStorage.getItem(key)
            );
            
            if (hasSession) {
              console.log("Found session, finalizing connection");
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
  // HANDLE DISCONNECT
  // -------------------------
  const handleDisconnect = async () => {
    try {
      await disconnect();
      cleanupSessions();
      setUiStatus("Disconnected");
      setIsLoading(false);
      connectingRef.current = false;
      setShowQR(false);
      
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

      {/* QR CODE SECTION */}
      {showQR && wcUri && (
        <div className="bg-slate-900 border border-purple-500/30 rounded-xl p-6 mb-6 text-center">
          <h3 className="text-lg font-bold text-purple-400 mb-4">Scan QR Code</h3>
          <div className="bg-white p-4 rounded-lg inline-block mx-auto mb-4">
            <img 
              src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(wcUri)}`}
              alt="WalletConnect QR Code"
              className="w-48 h-48 mx-auto"
            />
          </div>
          <p className="text-sm text-gray-400 mb-4">
            Open Trust Wallet → Scan QR code → Approve connection
          </p>
          <button
            onClick={copyUriToClipboard}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            📋 Copy URI Instead
          </button>
          <p className="text-xs text-gray-500 mt-3">
            After scanning, return to Telegram. The app will auto-detect.
          </p>
        </div>
      )}

      {/* ACTION BUTTONS */}
      <div className="space-y-3">
        <button
          onClick={generateWalletConnectURI}
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl p-4 transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-lg font-bold">📱 Connect with QR</span>
          </div>
        </button>

        <button
          onClick={connectWithDeepLink}
          disabled={isLoading}
          className={`w-full bg-slate-900 border border-slate-700 hover:border-blue-500 rounded-xl p-4 transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-lg">🔗 Try Deep Link</span>
          </div>
        </button>

        <button
          onClick={() => {
            const connector = connectors.find(c => c.id === "metaMaskSDK");
            if (connector) connect({ connector });
          }}
          disabled={isLoading}
          className={`w-full bg-slate-900 border border-slate-700 hover:border-orange-500 rounded-xl p-4 transition-colors ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <div className="flex items-center justify-center gap-3">
            <span className="text-lg">🦊 MetaMask</span>
          </div>
        </button>
      </div>
      
      {/* INSTRUCTIONS */}
      <div className="mt-6 text-xs text-gray-500 text-center bg-slate-900/50 rounded-lg p-4 border border-slate-800">
        <p className="text-gray-400 font-medium mb-2">📋 How to Connect with QR:</p>
        <p>1️⃣ Tap <span className="text-purple-400 font-medium">"Connect with QR"</span></p>
        <p>2️⃣ QR code will appear on screen</p>
        <p>3️⃣ Open Trust Wallet → Scan QR code</p>
        <p>4️⃣ Tap <span className="text-green-400">"Connect"</span> or <span className="text-green-400">"Approve"</span></p>
        <p>5️⃣ <span className="text-yellow-400 font-medium">Return to Telegram</span></p>
        <p className="text-blue-400 mt-2">⏳ The app will auto-detect your return</p>
        <p className="text-gray-600 mt-2">If deep link doesn't work, use QR code method</p>
      </div>
    </div>
  );
}