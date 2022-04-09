import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "normalize.css"
import "leaflet/dist/leaflet.css";
import "leaflet-search/dist/leaflet-search.min.css";
import "./app.css";

createApp(App).use(router).mount("#app");
