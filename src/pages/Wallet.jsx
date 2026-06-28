import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect } from "react";

export default function Wallet() {

    const { open } = useAppKit();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    

    useEffect(() => {

    const interval = setInterval(() => {

        // 🔥 FORCE wagmi to re-evaluate connection state
        if (document.visibilityState === "visible") {
            console.log("checking wallet state...");
        }

    }, 1500);

    return () => clearInterval(interval);

}, [isConnected]);

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
                        onClick={() => {
    open({
        view: "Connect"
    });
}}
                        style={{
                            padding: "10px",
                            background: "green",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        Connectds Wallet
                    </button>

                )
            }

        </div>
    );
}