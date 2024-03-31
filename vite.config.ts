import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import { viteSingleFile } from "vite-plugin-singlefile";

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: true,
    }),
    viteSingleFile({
      removeViteModuleLoader: true,
    }),
  ],
  css: {
    transformer: "lightningcss",
  },
  build: {
    cssMinify: "lightningcss",
  },
});
