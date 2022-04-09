import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgLoader from "vite-svg-loader";

export default defineConfig(({ mode }) => ({
  base: mode === "production" ? "/ao-map/" : "/",
  plugins: [vue(), VitePWA({}), svgLoader()],
  define: {
    BASE: JSON.stringify(mode === "production" ? "/ao-map/" : "/"),
  },
  resolve: {
    extensions: [".vue", ".js", ".css"],
    alias: {
      "~": resolve(__dirname, "./src"),
    },
  },
}));
