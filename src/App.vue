<script setup>
import { onMounted, provide, readonly, ref } from "vue";

import { client } from "./client";
import AppLoader from "./components/AppLoader.vue";

const iconsRef = ref(null);
const locationsRef = ref(null);

provide("icons", readonly(iconsRef));
provide("locations", readonly(locationsRef));

onMounted(() => {
  // Initialize app
  Promise.all([client.getIcons(), client.getLocations()])
    .then(([icons, locations]) => {
      iconsRef.value = icons;
      locationsRef.value = locations;
    })
    .catch(() => {});
});
</script>

<template>
  <router-view v-if="iconsRef && locationsRef" />
  <div v-else class="app-loading">
    <app-loader />
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app-loading {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-main);
}
</style>
