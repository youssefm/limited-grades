import { useEffect, useState } from "react";

const DARK_MODE_CLASS = "dark";

const useDarkMode = (): [boolean, (value: boolean) => void] => {
  const [mounted, setMounted] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (
      typeof document !== "undefined" &&
      document.body.classList.contains(DARK_MODE_CLASS)
    ) {
      setEnabled(true);
    }
    setMounted(true);
  }, [setEnabled]);

  useEffect(() => {
    if (mounted) {
      const bodyClasses = window.document.body.classList;

      if (enabled) {
        bodyClasses.add(DARK_MODE_CLASS);
      } else {
        bodyClasses.remove(DARK_MODE_CLASS);
      }
    }
  }, [mounted, enabled]);

  return [enabled, setEnabled];
};

export default useDarkMode;
