import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";

export default function Wallet() {

    const { open } = useAppKit();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const [loading, setLoading] = useState(false);

    const connectWallet = async () => {

        setLoading(true);

        try {

            // 🔥 DO NOT WAIT FOR RETURN
            open({ view: "Connect" });

            // 🔥 force UI check loop (important)
            setTimeout(() => {
                setLoading(false);
            }, 5000);

        } catch (e) {
            console.log(e);
            setLoading(false);
        }
    };

    return (
        <div>

            {!isConnected ? (

                <button onClick={connectWallet} disabled={loading}>
                    {loading ? "Connecting..." : "Connect Wallet"}
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