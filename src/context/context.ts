import { createContext, useContext } from "react";
import type { Settings } from "./type";

type ContextTypes = {
  AppTheme: "light" | "dark";
  toggleTheme: () => void;
  textSettings: Settings;
  handleSettingChange: (changes: Settings) => void;
};

export const GlobalContext = createContext<ContextTypes | null>(null);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("Provider missing");
  }

  return context;
};
