import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";

export default function Wallet() {

    const { open } = useAppKit();

    const { address, isConnected } = useAccount();

    return (
        <div>

            {
                isConnected ?

                <div>

                    Connected

                    <br/>

                    {address}

                </div>

                :

                <button onClick={() => open()}>

                    Connect Wallet

                </button>

            }

        </div>
    );

}