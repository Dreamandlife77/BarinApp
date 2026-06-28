import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { WagmiProvider, reconnect } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { wagmiAdapter } from "./config/wallet";

const queryClient = new QueryClient();

function Root() {

    useEffect(() => {
        // 🔥 THIS FIXES MOBILE RETURN STUCK ISSUE
        reconnect(wagmiAdapter.wagmiConfig);
    }, []);

    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <App />
            </QueryClientProvider>
        </WagmiProvider>
    );
}

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);