import { useEffect, useState } from "react";

export const DARK_MODE_CLASS = "dark";
export const LOCAL_STORAGE_THEME_KEY = "theme";
export const LOCAL_STORAGE_DARK_VALUE = "dark";
export const LOCAL_STORAGE_LIGHT_VALUE = "light";

const useDarkMode = (): [boolean, () => void] => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (
      typeof document !== "undefined" &&
      document.body.classList.contains(DARK_MODE_CLASS)
    ) {
      setEnabled(true);
    }
  }, [setEnabled]);

  const toggle = () => {
    const bodyClasses = window.document.body.classList;
    const newValue = !enabled;
    if (newValue) {
      bodyClasses.add(DARK_MODE_CLASS);
    } else {
      bodyClasses.remove(DARK_MODE_CLASS);
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

export default useDarkMode;
