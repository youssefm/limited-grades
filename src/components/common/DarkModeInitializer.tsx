import { minify } from "uglify-js";

import {
  DARK_MODE_CLASS,
  LOCAL_STORAGE_DARK_VALUE,
  LOCAL_STORAGE_THEME_KEY,
} from "hooks/useDarkMode";

// This script prevents the screen from flickering from light to dark when a user prefers dark mode
// Thorough explanation here: https://blog.maximeheckel.com/posts/switching-off-the-lights-part-2-fixing-dark-mode-flashing-on-servered-rendered-website/
const DarkModeInitializer = (): JSX.Element => (
  <script
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: minify(`
        let preferredTheme;
        try {
          preferredTheme = localStorage.getItem("${LOCAL_STORAGE_THEME_KEY}");
        } catch (error) {}
        if (
          preferredTheme === "${LOCAL_STORAGE_DARK_VALUE}" ||
          (!preferredTheme &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
        ) {
          document.documentElement.classList.add("${DARK_MODE_CLASS}");
        }
      `).code,
    }}
  />
);

export default DarkModeInitializer;
