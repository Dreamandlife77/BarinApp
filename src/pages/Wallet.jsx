import { useAppKit } from "@reown/appkit/react";
import { useAccount, useDisconnect, useReconnect } from "wagmi";
import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import BottomNav from "../components/BottomNav";

export default function Wallet() {

    const { open } = useAppKit();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const { reconnect } = useReconnect();
    const [refreshing, setRefreshing] = useState(false);

    const navigate = useNavigate();

    const handleRefresh = () => {
        setRefreshing(true);
        reconnect();
        setTimeout(() => reconnect(), 1000);
        setTimeout(() => {
            reconnect();
            setRefreshing(false);
        }, 2500);
    };

    return (
        <div className="min-h-screen bg-[#020617] text-white pb-24">

            {/* HEADER (LIKE YOUR EXPERTS PAGE) */}
            <div className="p-4 text-center relative">

                <button
                    onClick={() => navigate(-1)}
                    className="absolute top-3 left-3 w-10 h-10 rounded-full bg-yellow-500/20 backdrop-blur flex items-center justify-center"
                >
                    <ArrowLeft />
                </button>

                <h1 className="text-white text-2xl font-bold flex items-center justify-center gap-2">
                
                    Wallet
                </h1>

            </div>

            {/* MAIN CONTENT */}
            <div className="px-4">

                <div className="bg-[#0f172a] border border-white/10 rounded-2xl p-5 shadow-lg">

                    {isConnected ? (

                        <div className="text-center">

                            <p className="text-green-400 font-semibold">
                                Connected
                            </p>

                            <p className="text-xs text-gray-400 break-all mt-2">
                                {address}
                            </p>

                            <button
                                onClick={() => disconnect()}
                                className="mt-5 w-full bg-red-500 hover:bg-red-600 transition py-3 rounded-xl font-semibold"
                            >
                                Disconnect Wallet
                            </button>

                        </div>

                    ) : (

                        <div className="flex flex-col gap-3">

                            <button
                                onClick={() => open({ view: "Connect" })}
                                className="w-full bg-green-500 hover:bg-green-600 transition py-3 rounded-xl font-semibold"
                            >
                                Connect Wallet
                            </button>

                            <button
                                onClick={handleRefresh}
                                disabled={refreshing}
                                className={`w-full py-3 rounded-xl border border-white/10 flex items-center justify-center gap-2
                                ${refreshing ? "bg-gray-700 cursor-not-allowed" : "bg-[#1e293b] hover:bg-[#334155]"}`}
                            >
                                {refreshing ? "Checking..." : "Refresh Connection"}
                            </button>

                        </div>

                    )}

                </div>

            </div>
            
            <BottomNav />
        </div>
    );
}