import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgLoader from "vite-svg-loader";
import { resolve } from "path";
// https://vitejs.dev/config/

export default defineConfig({
  plugins: [vue(), VitePWA({}), svgLoader()],
  resolve: {
    extensions: [".vue", ".js", ".css"],
    alias: {
      "~": resolve(__dirname, "./src"),
    },
  },
});
