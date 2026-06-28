import { createConfig, http } from "wagmi";
import { polygon } from "wagmi/chains";
import {
  metaMask,
  walletConnect,
  coinbaseWallet,
  injected,
} from "wagmi/connectors";

const projectId = "beb23aec824ef375771f0418bffcfd14";

export const wagmiConfig = createConfig({
  chains: [polygon],

  connectors: [
    injected(),

    metaMask({
      dappMetadata: {
        name: "BARIN Game",
        url: "https://barin-app.vercel.app",
      },
    }),

    walletConnect({
      projectId,
      metadata: {
        name: "BARIN Game",
        description: "Mining Quest",
        url: "https://barin-app.vercel.app",
        icons: ["https://barin-app.vercel.app/icon.png"],
      },
      showQrModal: true,
    }),

    coinbaseWallet({
      appName: "BARIN Game",
    }),
  ],

  transports: {
    [polygon.id]: http(),
  },
});