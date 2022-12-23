import { minify } from "uglify-js";

import {
  LOCAL_STORAGE_HIDE_BANNER_KEY,
  LOCAL_STORAGE_HIDE_BANNER_VALUE,
} from "lib/constants";

const HideBannerInitializer = (): JSX.Element => (
  <script
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: minify(`
        let hideBanner;
        try {
          hideBanner = localStorage.getItem("${LOCAL_STORAGE_HIDE_BANNER_KEY}");
        } catch (error) {}
        if (hideBanner === "${LOCAL_STORAGE_HIDE_BANNER_VALUE}") {
          document.documentElement.classList.add("hide-banner");
        }
      `).code,
    }}
  />
);

export default HideBannerInitializer;
