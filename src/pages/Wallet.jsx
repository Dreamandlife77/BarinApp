import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect } from "react";

export default function Wallet() {

    const { open } = useAppKit();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    useEffect(() => {
        console.log("Wallet state:", { isConnected, address });
    }, [isConnected, address]);

    return (
        <div>

            {!isConnected ? (

                <button
                    onClick={() => open({ view: "Connect" })}
                >
                    Connect Wallet
                </button>

            ) : (

                <div>

                    <p>Connected</p>
                    <p style={{ fontSize: 12 }}>{address}</p>

                    <button
                        onClick={() => disconnect()}
                    >
                        Disconnect
                    </button>

                </div>

            )}

        </div>
    );
}