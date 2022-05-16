import constate from "constate";
import { useEffect, useState } from "react";

export const DARK_MODE_CLASS = "dark";
export const LOCAL_STORAGE_THEME_KEY = "theme";
export const LOCAL_STORAGE_DARK_VALUE = "dark";
export const LOCAL_STORAGE_LIGHT_VALUE = "light";

const useDarkModeValue = (): [boolean, () => void] => {
  const [enabled, setEnabled] = useState(false);

  // Read initial value off the body element
  // as set by the `DarkModeInitializer` script
  useEffect(() => {
    if (
      typeof document !== "undefined" &&
      document.documentElement.classList.contains(DARK_MODE_CLASS)
    ) {
      setEnabled(true);
    }
  }, []);

  const toggle = () => {
    const documentElementClasses = window.document.documentElement.classList;
    const newValue = !enabled;
    if (newValue) {
      documentElementClasses.add(DARK_MODE_CLASS);
    } else {
      documentElementClasses.remove(DARK_MODE_CLASS);
    }
    if (typeof localStorage !== "undefined") {
      localStorage.setItem(
        LOCAL_STORAGE_THEME_KEY,
        newValue ? LOCAL_STORAGE_DARK_VALUE : LOCAL_STORAGE_LIGHT_VALUE
      );
    }
    setEnabled(newValue);
  };

  return [enabled, toggle];
};

const [DarkModeProvider, useDarkMode] = constate(useDarkModeValue);
export { DarkModeProvider };
export default useDarkMode;
