import { createConfig, http } from "wagmi";
import { polygon } from "wagmi/chains";
import {
  metaMask,
  walletConnect,
  coinbaseWallet,
} from "wagmi/connectors";

const projectId = "beb23aec824ef375771f0418bffcfd14";

export const wagmiConfig = createConfig({
  chains: [polygon],
  connectors: [
    metaMask({
      dappMetadata: {
        name: "BARIN Game",
      },
    }),
    walletConnect({
      projectId,
      showQrModal: true,
      qrModalOptions: {
        themeMode: 'dark',
        themeVariables: {
          '--wcm-z-index': '9999',
          '--wcm-background-color': '#0f172a',
          '--wcm-accent-color': '#8b5cf6',
        }
      },
      metadata: {
        name: "BARIN Game",
        description: "BARIN Game Mini App",
        url: "https://barin-app.vercel.app",
        icons: ["https://barin-app.vercel.app/icon.png"],
      },
    }),
    coinbaseWallet({
      appName: "BARIN Game",
      appLogoUrl: "https://barin-app.vercel.app/icon.png",
    }),
  ],
  transports: {
    [polygon.id]: http(),
  },
});