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

// 🔥 SINGLE ADAPTER
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
    analytics: false,

    // ✅ KEEP EMAIL LOGIN
    email: true,

    // ❌ REMOVE SOCIAL LOGIN (Google, Apple, etc.)
    socials: false
  },

  // 🔥 IMPORTANT: force UI to NOT show social auth section
  enableEmail: true,
  enableSocials: false,

  // 🔥 IMPORTANT SAFETY FLAGS
  enableWalletConnect: true,
  enableInjected: true,

  storage: "localStorage"
});