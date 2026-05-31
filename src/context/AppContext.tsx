import { useState, useEffect, type ReactNode } from "react";
import { GlobalContext } from "./context";
import type { Settings } from "./type";

type Props = {
  children: ReactNode;
};

export default function ContextWrapper({ children }: Props) {
  // Theme state
  const [AppTheme, setAppTheme] = useState<"dark" | "light">(() => {
    try {
      const savedTheme = localStorage.getItem("theme");
      return savedTheme ? JSON.parse(savedTheme) : "light";
    } catch {
      return "light";
    }
  });

  const [textSettings, setTextSettings] = useState<Settings>(() => {
    const setting = {
      ayatTranslation: "en",
      secondTranslation: "bn",
      ayatSize: 26,
      translationSize: 16,
      ayatFont: "Amiri",
    };
    try {
      const settingsTheme = localStorage.getItem("settings");
      return settingsTheme ? JSON.parse(settingsTheme) : setting;
    } catch {
      return setting;
    }
  });

  // Changing theme value in ls
  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(AppTheme));
  }, [AppTheme]);

  // Changing setting value in ls
  useEffect(() => {
    localStorage.setItem("settings", JSON.stringify(textSettings));
  }, [textSettings]);

  // Changing theme value in state
  const toggleTheme = () => {
    setAppTheme((prev) => (prev == "light" ? "dark" : "light"));
  };

  const handleSettingChange = (changes: Settings) => {
    setTextSettings((prev) => ({ ...prev, ...changes }));
  };

  return (
    <GlobalContext.Provider
      value={{ AppTheme, toggleTheme, textSettings, handleSettingChange }}
    >
      {children}
    </GlobalContext.Provider>
  );
}
