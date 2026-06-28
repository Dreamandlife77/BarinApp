import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect, useReconnect } from "wagmi";
import { useState } from "react";

export default function Wallet() {

    const { open } = useAppKit();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const { reconnect } = useReconnect();
    const [refreshing, setRefreshing] = useState(false);

    const handleRefresh = () => {
        setRefreshing(true);
        reconnect();
        // Give WalletConnect WebSocket time to reconnect
        setTimeout(() => reconnect(), 1000);
        setTimeout(() => {
            reconnect();
            setRefreshing(false);
        }, 2500);
    };

    return (
        <div style={{ padding: "10px" }}>

            {
                isConnected ? (

                    <div>

                        <p>Connected</p>

                        <p style={{ fontSize: "12px" }}>
                            {address}
                        </p>

                        <button
                            onClick={() => disconnect()}
                            style={{
                                marginTop: "10px",
                                padding: "10px",
                                background: "red",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer"
                            }}
                        >
                            Disconnect Wallet
                        </button>

                    </div>

                ) : (

                    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

                        <button
                            onClick={() => open({ view: "Connect" })}
                            style={{
                                padding: "10px",
                                background: "green",
                                color: "white",
                                border: "none",
                                borderRadius: "6px",
                                cursor: "pointer"
                            }}
                        >
                            Connect Wallet1
                        </button>

                        <button
                            onClick={handleRefresh}
                            disabled={refreshing}
                            style={{
                                padding: "10px",
                                background: refreshing ? "#555" : "#334155",
                                color: "white",
                                border: "1px solid #475569",
                                borderRadius: "6px",
                                cursor: refreshing ? "not-allowed" : "pointer"
                            }}
                        >
                            {refreshing ? "Checking..." : "Refresh Connection"}
                        </button>

                    </div>

                )
            }

        </div>
    );
}