import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import svgLoader from "vite-svg-loader";

export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    base: mode === "production" ? process.env.VITE_BASE : "/",
    plugins: [vue(), VitePWA({}), svgLoader()],
    resolve: {
      extensions: [".vue", ".js", ".css"],
      alias: {
        "~": resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, "index.html"),
          notfound: resolve(__dirname, "404.html"),
        },
      },
    },
  };
});
