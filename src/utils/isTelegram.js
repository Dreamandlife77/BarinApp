export const isTelegram = () => {
  return Boolean(window.Telegram?.WebApp);
};