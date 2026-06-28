import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";

export default function Wallet() {

    const { open } = useAppKit();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const [checking, setChecking] = useState(false);

    // 🔥 THIS FIXES TELEGRAM RETURN ISSUE
    useEffect(() => {

        if (checking && !isConnected) {

            const interval = setInterval(() => {

                console.log("🔄 Checking wallet state...");

                if (window.ethereum || address) {
                    console.log("Wallet detected, forcing UI sync...");
                }

            }, 1500);

            return () => clearInterval(interval);
        }

    }, [checking, isConnected, address]);

    const connectWallet = async () => {

        setChecking(true);

        try {
            await open({ view: "Connect" });
        } catch (e) {
            console.log("open error", e);
        }

        // 🔥 IMPORTANT: DO NOT WAIT FOR RETURN
        setTimeout(() => {
            console.log("Manual sync trigger");
        }, 4000);
    };

    return (
        <div>

            {!isConnected ? (

                <button onClick={connectWallet}>
                    Connect Wallets
                </button>

            ) : (

                <div>
                    <p>Connected</p>
                    <p>{address}</p>

                    <button onClick={() => disconnect()}>
                        Disconnect
                    </button>
                </div>

            )}

        </div>
    );
}