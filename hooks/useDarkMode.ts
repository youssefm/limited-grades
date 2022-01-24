import { useEffect, useState } from "react";

const useDarkMode = (): [boolean, (value: boolean) => void] => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const className = "dark";
    const bodyClasses = window.document.body.classList;

    if (enabled) {
      bodyClasses.add(className);
    } else {
      bodyClasses.remove(className);
    }
  }, [enabled]);

  return [enabled, setEnabled];
};

export default useDarkMode;
