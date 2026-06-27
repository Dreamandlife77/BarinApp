export const tg = window.Telegram?.WebApp;

export const initTelegram = () => {
  if (!tg) {
    console.log("Telegram WebApp not detected");
    return;
  }

  tg.ready();
  tg.expand();

  console.log("Telegram initialized");
};