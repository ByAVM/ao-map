import "leaflet-search/dist/leaflet-search.min.css";
import "leaflet/dist/leaflet.css";
import "normalize.css";
import { createApp } from "vue";

import App from "./App.vue";
import "./app.css";
import { router } from "./router";

createApp(App).use(router).mount("#app");
