import { initUtils } from "@telegram-apps/sdk";

export function initTelegramWalletFix() {
  if (typeof window === "undefined") return;

  const isTelegram =
    window.Telegram?.WebApp ||
    window.TelegramWebviewProxy;

  if (!isTelegram) return;

  const utils = initUtils();

  window.open = (url) => {
    try {
      if (!url) return;

      url = String(url);

      // FIX MetaMask deep link
      if (url.startsWith("metamask://")) {
        url = url.replace(
          "metamask://",
          "https://metamask.app.link/"
        );
      }

      // FIX WalletConnect links
      if (url.includes("trust") || url.includes("walletconnect")) {
        console.log("WalletConnect redirect:", url);
      }

      utils.openLink(url);
    } catch (e) {
      console.log("Telegram openLink error:", e);
    }

    return null;
  };
}