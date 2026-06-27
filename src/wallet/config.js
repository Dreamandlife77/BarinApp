import { createConfig, http } from "wagmi";

import {
  mainnet,
  polygon,
  bsc,
} from "wagmi/chains";

import {
  injected,
  walletConnect,
  coinbaseWallet,
} from "wagmi/connectors";

export const config = createConfig({
  chains: [mainnet, polygon, bsc],

  connectors: [
    injected(),

    walletConnect({
      projectId: "YOUR_PROJECT_ID",
      showQrModal: true, // 🔥 IMPORTANT for Telegram + mobile
    }),

    coinbaseWallet({
      appName: "BARIN Mining Quest",
      darkMode: true,
    }),
  ],

  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [bsc.id]: http(),
  },
});