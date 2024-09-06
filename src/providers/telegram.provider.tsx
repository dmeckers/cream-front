import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { ITelegramUser, IWebApp } from "../types/types";

export interface ITelegramContext {
  webApp?: IWebApp;
  user?: ITelegramUser;
}

export const TelegramContext = createContext<ITelegramContext>({});

export const TelegramProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [webApp, setWebApp] = useState<IWebApp | null>(null);
  const [initData, setInitData] = useState<any>(null);

  useEffect(() => {
    // Function to load the Telegram Web App script
    const loadTelegramScript = () => {
      const script = document.createElement("script");
      script.src = "https://telegram.org/js/telegram-web-app.js";
      script.async = true;
      script.onload = () => {
        const app = (window as any).Telegram?.WebApp;
        if (app) {
          app.ready();
          setWebApp(app);
          console.log("Telegram Web App loaded");
          console.log(app.initDataUnsafe);
          setInitData(app.initDataUnsafe);
        }
      };
      document.body.appendChild(script);
    };

    // Load the script if it hasn't been loaded already
    if (!(window as any).Telegram?.WebApp) {
      loadTelegramScript();
    } else {
      const app = (window as any).Telegram?.WebApp;
      if (app) {
        app.ready();
        setWebApp(app);
      }
    }
  }, []);

  const value = useMemo(() => {
    return webApp
      ? {
          webApp,
          unsafeData: webApp.initDataUnsafe,
          user: webApp.initDataUnsafe.user,
        }
      : {};
  }, [webApp]);

  return (
    <TelegramContext.Provider value={value}>
      {children}
    </TelegramContext.Provider>
  );
};

export const useTelegram = () => useContext(TelegramContext);
