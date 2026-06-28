import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";

export default function Wallet() {

    const { open } = useAppKit();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const [loading, setLoading] = useState(false);

    // 🔥 detect state
    useEffect(() => {
        console.log("Wallet state:", { isConnected, address });
    }, [isConnected, address]);

    const connectWallet = async () => {

        try {

            setLoading(true);

            console.log("Opening wallet...");

            // IMPORTANT: DO NOT WAIT FOR RETURN
            open({ view: "Connect" });

            // fallback UI unlock (Telegram fix)
            setTimeout(() => {
                setLoading(false);
                console.log("Waiting for wallet sync...");
            }, 4000);

        } catch (err) {

            console.log("Wallet error:", err);
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: 20 }}>

            {!isConnected ? (

                <button
                    onClick={connectWallet}
                    disabled={loading}
                    style={{
                        padding: "10px 20px",
                        background: loading ? "gray" : "green",
                        color: "white",
                        borderRadius: 8,
                        border: "none"
                    }}
                >
                    {loading ? "Connecting..." : "Connedct Wallet"}
                </button>

            ) : (

                <div>

                    <h3>✅ Connected</h3>
                    <p style={{ fontSize: 12 }}>{address}</p>

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