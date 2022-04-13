<script setup>
import { onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";

import Chevron from "~/assets/chevron.svg";
import { client } from "~/client/index";
import NewMarkerForm from "~/components/NewMarkerForm.vue";
import ConfiguredMap from "~/modules/ConfiguredMap.vue";
import LocationSelect from "~/modules/LocationSelect.vue";
import { validateMarker } from "~/utils/markers";

const APP_VERSION = window.__APP__VERSION__;

const props = defineProps({
  location: {
    type: String,
  },
});

const state = reactive({
  locationDetails: null,
  lsMarkers: [],
  tempMarker: null,
  selectedMarker: null,
});

const loadDetails = () => {
  client.getDetails(props.location).then((details) => {
    state.locationDetails = details;
    state.lsMarkers = loadUserMarkers();
  });
};

const loadUserMarkers = () => {
  state.tempMarker = null;

  const markers = localStorage.getItem(lsKey());

  if (markers) {
    return JSON.parse(markers);
  }

  return [];
};

onMounted(() => {
  loadDetails();
});

watch(
  () => props.location,
  () => {
    loadDetails();
  }
);

const handleMapClick = (position) => {
  if (state.selectedMarker) {
    state.selectedMarker = null;
  }

  if (state.tempMarker === null) {
    state.tempMarker = newMarker(position);
  } else {
    state.tempMarker = {
      ...state.tempMarker,
      position: position,
    };
  }
};

const handleDecline = () => {
  state.tempMarker = null;
};

const handleRemoveLsMarkers = () => {
  localStorage.removeItem(lsKey());
  state.lsMarkers = [];
  syncLsMarkers();
};

const handleExportLsMarkers = () => {
  const data = `text/json:charset=utf-8,${encodeURIComponent(
    JSON.stringify(state.lsMarkers, null, 2)
  )}`;
  const downloadLink = document.createElement("a");
  downloadLink.download = `${props.location}.json`;
  downloadLink.href = `data:${data}`;

  downloadLink.click();
};

const handleCreateMarker = (markerData) => {
  if (validateMarker(markerData)) {
    state.lsMarkers.push(markerData);
    state.tempMarker = null;
    syncLsMarkers();
  } else {
    // Error message
  }
};

const lsKey = () => `markers_${props.location}`;
const syncLsMarkers = () => {
  localStorage.setItem(lsKey(), JSON.stringify(state.lsMarkers));
};

const newMarker = (position) => {
  return {
    title: "",
    slug: "",
    description: "",
    type: "default",
    position,
  };
};

const handleSelectMarker = (marker) => {
  state.selectedMarker = marker;
};
const handleDeleteSelectedMarker = () => {
  if (state.selectedMarker) {
    state.lsMarkers = state.lsMarkers.filter((m) => m.slug !== state.selectedMarker.slug);
  }
};

const scrolled = ref(false);
const handleScroll = () => {
  scrolled.value = window.scrollY > 32;
};

onMounted(() => {
  window.addEventListener("scroll", () => {
    scrolled.value = window.scrollY > 32;
  });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});

const handleButtonScroll = () => {
  if (scrolled.value) {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  } else {
    window.scrollTo({
      top: document.body.offsetHeight,
      behavior: "smooth",
    });
  }
};
</script>

<template>
  <div class="scrollButton" @click="handleButtonScroll">
    <Chevron :class="{ arrow: true, arrow__up: scrolled }" />
  </div>

  <main class="grid">
    <configured-map
      v-if="state.locationDetails"
      class="map"
      v-bind="state.locationDetails"
      :temp-marker="state.tempMarker"
      :additional-markers="state.lsMarkers"
      @click="handleMapClick"
      @select-marker="handleSelectMarker"
    />

    <div class="sidebar">
      <div class="app-form-control">
        <label class="app-label">Локация</label>
        <location-select :value="props.location" />
      </div>

      <div class="controls">
        <new-marker-form
          v-if="state.tempMarker"
          v-model="state.tempMarker"
          @decline="handleDecline"
          @submit="handleCreateMarker"
        />

        <div v-if="state.lsMarkers && state.lsMarkers.length > 0">
          <hr />
          <button
            v-if="state.selectedMarker"
            class="app-button"
            @click="handleDeleteSelectedMarker"
          >
            Удалить выбранный маркер
          </button>

          <button class="app-button app-button__primary" @click="handleExportLsMarkers">
            Экспорт маркеров
          </button>

          <button class="app-button app-button__danger" @click="handleRemoveLsMarkers">
            Удалить мои меркеры
          </button>
        </div>
      </div>

      <div class="info">
        <span>Версия: {{ APP_VERSION }}</span>
      </div>
    </div>
  </main>
</template>

<style scoped>
.arrow {
  fill: var(--white);
  transform: rotate(180deg);
  transition: transform 0.1s ease-out;
}
.arrow__up {
  transform: rotate(0deg);
}
.scrollButton {
  display: none;
  position: fixed;
  align-items: center;
  justify-content: center;
  bottom: 8px;
  left: calc(50% - 32px);
  width: 64px;
  height: 64px;
  background-color: var(--bg-transparent);
  color: var(--white);
  cursor: pointer;
  border-radius: 50%;
  padding: 8px;
  z-index: 1000;
  text-align: center;
  color: var(--white);
}
.grid {
  display: grid;
  grid-template-columns: minmax(800px, 3fr) minmax(250px, 1fr);
  grid-template-rows: 100vh;
  grid-template-areas: "main sidebar";
  margin-left: auto;
  margin-right: auto;
  position: relative;
}

.map {
  grid-area: main;
}

.sidebar {
  grid-area: sidebar;
  padding: 8px 16px;
  display: flex;
  flex-direction: column;
}

.interactive-map {
  position: absolute;
  height: 100%;
  width: 100%;
}

.info {
  margin-top: auto;
  text-align: left;
  color: var(--secondary);
  font-size: var(--font-sm);
}
@media screen and (max-width: 1265px) {
  .grid {
    grid-template-columns: 2fr minmax(250px, 1fr);
  }
}
@media screen and (max-width: 765px) {
  .scrollButton {
    display: flex;
  }
  .grid {
    grid-template-columns: 100%;
    grid-template-rows: 100vh 100vh;
    grid-template-areas:
      "main"
      "sidebar";
  }
}
</style>
