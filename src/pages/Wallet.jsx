import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect } from "react";

export default function Wallet() {

    const { open } = useAppKit();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    useEffect(() => {
        console.log("Connected:", isConnected);
        console.log("Address:", address);
    }, [isConnected, address]);

    return (
        <div style={{ padding: "10px" }}>

            {
                isConnected ? (

                    <div>

                        <p>✅ Connected</p>

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

                    <button
                        onClick={() => open()}
                        style={{
                            padding: "10px",
                            background: "green",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        Connect Wallet
                    </button>

                )
            }

        </div>
    );
}