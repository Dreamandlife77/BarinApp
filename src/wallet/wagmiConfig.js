import { createConfig, http } from "wagmi";
import { polygon } from "wagmi/chains";
import { metaMask, coinbaseWallet } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [polygon],

  connectors: [
    metaMask({
      shimDisconnect: true,
    }),

    coinbaseWallet({
      appName: "BARIN Game",
      jsonRpcUrl: "https://polygon-rpc.com",
      enableMobileWalletLink: false,
    }),
  ],

  transports: {
    [polygon.id]: http(),
  },
});