import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { polygon } from "@reown/appkit/networks";

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

const metadata = {
  name: "BARIN Mining Quest",
  description: "Telegram Mini App",
  url: window.location.origin,
  icons: [
    "https://barin-app.vercel.app/logo.png"
  ]
};

// Export ONE adapter instance
export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [polygon]
});

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  metadata,
  networks: [polygon],
  defaultNetwork: polygon,

  features: {
    analytics: false
  },

  // 🔥 ADD THIS (CRITICAL FOR MOBILE DEEP LINK RECOVERY)
  enableWalletConnect: true,

  // 🔥 IMPORTANT: force session persistence
  enableInjected: true,

  // 🔥 ADD THIS (VERY IMPORTANT)
  storage: "localStorage"
});