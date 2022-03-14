import clsx from "clsx";
import { FC } from "react";
import { FaMoon, FaSun } from "react-icons/fa";

import useDarkMode from "hooks/useDarkMode";
import { HOVER_CLASSES, TRANSITION_CLASSES } from "lib/styles";

const DarkModeToggle: FC = () => {
  const [, toggle] = useDarkMode();
  return (
    <button
      className={clsx("ml-4 text-2xl", HOVER_CLASSES, TRANSITION_CLASSES)}
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
    >
      <FaSun className="hidden dark:block" />
      <FaMoon className="dark:hidden" />
    </button>
  );
};

export default DarkModeToggle;
