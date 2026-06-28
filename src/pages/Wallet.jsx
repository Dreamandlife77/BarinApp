import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect } from "wagmi";
import { useEffect, useState } from "react";

export default function Wallet() {

    const { open } = useAppKit();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();

    const [loading, setLoading] = useState(false);

    // 🔥 STEP 1: CHECK IF COMPONENT LOADS
    useEffect(() => {
        alert("Wallet component loaded");
        console.log("Wallet component loaded");
    }, []);

    // 🔥 STEP 2: WATCH CONNECTION STATE
    useEffect(() => {
        alert("State changed: isConnected = " + isConnected + " address = " + address);
        console.log("STATE:", { isConnected, address });
    }, [isConnected, address]);

    // 🔥 STEP 3: CONNECT WALLET
    const connectWallet = async () => {

        try {

            alert("STEP 1: open() called");

            setLoading(true);

            await open({ view: "Connect" });

            alert("STEP 2: open() returned");

            setTimeout(() => {
                alert("STEP 3: waiting for wagmi state update");
                setLoading(false);
            }, 5000);

        } catch (err) {

            alert("ERROR in open(): " + err?.message);

            console.log(err);

            setLoading(false);
        }
    };

    // 🔥 STEP 4: UI
    return (
        <div style={{ padding: 20 }}>

            {!isConnected ? (

                <button onClick={connectWallet} disabled={loading}>
                    {loading ? "Connecdting..." : "Connect Wallet"}
                </button>

            ) : (

                <div>

                    <h3>Connected</h3>

                    <p>{address}</p>

                    <button onClick={() => {
                        alert("Disconnect clicked");
                        disconnect();
                    }}>
                        Disconnect
                    </button>

                </div>

            )}

        </div>
    );
}