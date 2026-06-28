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
        },
      },
      metadata: {
        name: "BARIN Game",
        description: "BARIN Game Mini App",
        url: "https://barin-app.vercel.app", // Your actual URL
        icons: ["https://barin-app.vercel.app/icon.png"], // Optional
      },
    }),
    coinbaseWallet({
      appName: "BARIN Game",
      appLogoUrl: "https://barin-app.vercel.app/icon.png", // Optional
    }),
  ],
  transports: {
    [polygon.id]: http(),
  },
});