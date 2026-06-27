import { createConfig, http } from "wagmi";
import { polygon } from "wagmi/chains";
import { metaMask, walletConnect, coinbaseWallet } from "wagmi/connectors";

const projectId = "beb23aec824ef375771f0418bffcfd14";

export const wagmiConfig = createConfig({
  chains: [polygon],

  connectors: [
    metaMask(),

    walletConnect({
      projectId,

      // 🔥 IMPORTANT FIX FOR TELEGRAM + WEBVIEW
      showQrModal: true,
      metadata: {
        name: "BARIN Game",
        description: "Mining Quest",
        url: window.location.origin,
        icons: [],
      },
    }),

    coinbaseWallet({
      appName: "BARIN Game",
      // 🔥 prevent smart-wallet auto redirect issues
      preference: "smartWalletOnly",
    }),
  ],

  transports: {
    [polygon.id]: http(),
  },
});