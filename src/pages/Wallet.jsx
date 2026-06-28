import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";

export default function Wallet() {

    const { open } = useAppKit();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const [checking, setChecking] = useState(false);

    // 🔥 FORCE CHECK AFTER RETURN (critical fix)
    useEffect(() => {

        if (!isConnected && checking) {

            const timer = setTimeout(() => {
                window.location.reload();
            }, 1500);

            return () => clearTimeout(timer);
        }

    }, [isConnected, checking]);

    const connectWallet = async () => {

        setChecking(true);

        open({ view: "Connect" });

        // fallback safety check
        setTimeout(() => {
            if (!isConnected) {
                console.log("Retrying connection...");
            }
        }, 5000);

    };

    return (
        <div>

            {!isConnected ? (

                <button onClick={connectWallet}>
                    Connect Walletss
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