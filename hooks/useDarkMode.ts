import { useEffect, useState } from "react";

import { windowMatchesMedia } from "lib/util";

const useDarkMode = (): [boolean, (value: boolean) => void] => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (windowMatchesMedia("(prefers-color-scheme: dark)")) {
      setEnabled(true);
    }
  }, [setEnabled]);

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
