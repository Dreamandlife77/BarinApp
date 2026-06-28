import { createAppKit } from "@reown/appkit/react";
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi";
import { polygon } from "wagmi/chains";

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

const metadata = {
  name: "BARIN Mining Quest",
  description: "Telegram Mini App",
  url: window.location.origin,
  icons: [
    "https://barin-app.vercel.app/logo.png"
  ]
};

const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks: [polygon]
});

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  metadata,
  networks: [polygon],
  defaultNetwork: polygon,
  features: {
    analytics: false
  }
});

export default wagmiAdapter;