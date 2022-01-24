import { minify } from "uglify-js";

const DarkModeInitializer = () => (
  <script
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: minify(`
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.body.classList.add("dark")
        }
      `).code,
    }}
  />
);

export default DarkModeInitializer;
