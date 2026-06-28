import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { polygon } from "@reown/appkit/networks";

const projectId = "beb23aec824ef375771f0418bffcfd14";

// 🔥 CORRECT ADAPTER SETUP
const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [polygon],
});

export const appKit = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: [polygon],

  metadata: {
    name: "BARIN Game",
    description: "Telegram Mini App",
    url: "https://barin-app.vercel.app",
    icons: [],
  },

  features: {
    analytics: false,
  },
});