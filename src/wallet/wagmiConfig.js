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
    // 🧠 universal injected wallet (browser wallets)
    injected(),

    // 🦊 MetaMask (desktop + mobile deep link)
    metaMask({
      dappMetadata: {
        name: "BARIN Game",
        url: "https://barin-app.vercel.app",
      },
    }),

    // 🌐 WalletConnect (MAIN for Telegram + mobile)
    walletConnect({
      projectId,

      metadata: {
        name: "BARIN Game",
        description: "BARIN Mining Quest",
        url: "https://barin-app.vercel.app",
        icons: ["https://barin-app.vercel.app/icon.png"],
      },

      showQrModal: true,
    }),

    // 💙 Coinbase Wallet
    coinbaseWallet({
      appName: "BARIN Game",
      appLogoUrl: "https://barin-app.vercel.app/icon.png",
    }),
  ],

  transports: {
    [polygon.id]: http(),
  },
});