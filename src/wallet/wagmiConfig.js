import { createConfig, http } from "wagmi";
import { polygon } from "wagmi/chains";
import { metaMask, walletConnect, coinbaseWallet } from "wagmi/connectors";

const projectId = "beb23aec824ef375771f0418bffcfd14";

export const wagmiConfig = createConfig({
  chains: [polygon],

  // 🔥 IMPORTANT FIX: forces session restore
  autoConnect: true,

  connectors: [
    metaMask(),

    walletConnect({
      projectId,
      showQrModal: true,

      // 🔥 CRITICAL FOR TELEGRAM WEBVIEW
      metadata: {
        name: "BARIN Game",
        description: "Telegram Mini App",
        url: "https://barin-app.vercel.app",
        icons: []
      }
    }),

    coinbaseWallet({
      appName: "BARIN Game",
    }),
  ],

  transports: {
    [polygon.id]: http(),
  },
});