import { useAppKit } from "@reown/appkit/react";
import { useAccount } from "wagmi";
import { useEffect } from "react";

export default function Wallet() {

    const { open } = useAppKit();


    const { address, isConnected } = useAccount();

    useEffect(() => {

    console.log("Connected:", isConnected);

    console.log("Address:", address);

}, [isConnected, address]);

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