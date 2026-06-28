import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";

export default function Wallet() {

    const { open } = useAppKit();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const [loading, setLoading] = useState(false);

    // 🔥 SAFE SESSION RECOVERY (ONLY ON LOAD)
    useEffect(() => {

        const session = localStorage.getItem("wc@2:client");

        if (session && !isConnected) {
            console.log("🔄 Found session, waiting for restore...");
        }

    }, []);

    // 🔥 SAFE CONNECT FUNCTION
    const connectWallet = async () => {

        try {

            setLoading(true);

            console.log("📲 Opening wallet...");

            await open({ view: "Connect" });

            // DO NOT WAIT FOR RETURN (Telegram breaks return)
            setTimeout(() => {
                console.log("⏳ Waiting for wallet state sync...");
                setLoading(false);
            }, 5000);

        } catch (err) {
            console.log("❌ Wallet open error:", err);
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 20 }}>

            {/* NOT CONNECTED */}
            {!isConnected ? (

                <button
                    onClick={connectWallet}
                    disabled={loading}
                    style={{
                        padding: "10px 20px",
                        background: loading ? "gray" : "green",
                        color: "white",
                        border: "none",
                        borderRadius: 8
                    }}
                >
                    {loading ? "Connecting..." : "Connect Wallet"}
                </button>

            ) : (

                /* CONNECTED STATE */
                <div>

                    <h3>✅ Wallet Connected</h3>

                    <p style={{ fontSize: 12 }}>
                        {address}
                    </p>

                    <button
                        onClick={() => disconnect()}
                        style={{
                            marginTop: 10,
                            padding: "8px 16px",
                            background: "red",
                            color: "white",
                            border: "none",
                            borderRadius: 8
                        }}
                    >
                        Disconnect
                    </button>

                </div>

            )}

        </div>
    );
}