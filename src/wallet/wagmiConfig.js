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
    metaMask(),

    walletConnect({
      projectId,
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