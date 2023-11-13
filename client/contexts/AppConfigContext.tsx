"use client";

import { ReactNode, createContext, useContext } from "react";

type AppConfigs = {
  APP_NAME: string;
  APP_DESCRIPTION: string;
  APP_VERSION: string;
  APP_MODE: string;
  CLIENT_URI: string;
  SERVER_URI: string;
};

// Set App Configs
export const APP_NAME = "Varta";
export const APP_DESCRIPTION =
  "Elevate your online conversations with Varta, a real-time chat application powered by Next.js and Express.js. Experience instant messaging, group chats, and more in a user-friendly interface. Join the future of communication today.";
export const APP_MODE = "development";
export const APP_VERSION = "1.0.0";
export const CLIENT_URI = "http://localhost:3000";
export const SERVER_URI = "http://localhost:8000";

export const AppConfigsContext = createContext<AppConfigs>({} as AppConfigs);
export const useAppConfigs = () => useContext(AppConfigsContext);

export const AppConfigsProvider = ({ children }: { children: ReactNode }) => {
  return (
    <AppConfigsContext.Provider
      value={{
        APP_NAME,
        APP_DESCRIPTION,
        APP_VERSION,
        APP_MODE,
        CLIENT_URI,
        SERVER_URI,
      }}
    >
      {children}
    </AppConfigsContext.Provider>
  );
};

export default AppConfigsProvider;
