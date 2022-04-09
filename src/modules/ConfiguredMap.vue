<script setup>
import L from "leaflet";
import { computed, inject, reactive, ref, watch } from "vue";

import LeafletMap from "~/components/LeafletMap.vue";
import { appIcon, appMarker } from "~/utils/leaflet";
import { createPopupForMarker } from "~/utils/markers";

const icons = inject("icons");

const emit = defineEmits(["click", "selectMarker"]);

const props = defineProps({
  mapImage: String,
  markers: {
    type: Array,
    default: () => [],
  },
  mapSize: {
    type: Object,
    default: () => ({
      width: 100,
      height: 100,
    }),
  },
  tempMarker: {
    type: [null, Object],
    default: null,
  },
  additionalMarkers: {
    type: Array,
    default: () => [],
  },
});

// eslint-disable-next-line no-undef
const imageFullPath = computed(() => `${BASE}resources/maps/${props.mapImage}`);
const mapBounds = computed(() => [
  [0, 0],
  [props.mapSize.height, props.mapSize.width],
]);

const mapConfig = {
  preferCanvas: true,
  crs: L.CRS.Simple,
  minZoom: -0.5,
  maxZoom: 2,
  zoomDelta: 0.5,
  zoomSnap: 0.5,
  maxBounds: mapBounds.value,
};

const markers = ref([...props.markers, ...props.additionalMarkers]);

const state = reactive({
  tempMarker: null,
});

const handleMapClick = (data) => {
  emit("click", data);
};

const createMarker = (marker) => {
  const { lat, lng } = marker.position;

  return appMarker([lat, lng], {
    selectHandler: () => emit("selectMarker", marker),
    title: marker.title,
    icon: appIcon({ iconSrc: icons.value[marker.type].image }),
  }).bindPopup(createPopupForMarker(marker));
};

const mapMarkers = computed(() => {
  return markers.value.map(createMarker);
});

watch([() => props.markers, () => [...props.additionalMarkers]], () => {
  markers.value = [...props.markers, ...props.additionalMarkers];
});

watch(
  () => props.tempMarker,
  (newMarker, oldMarker) => {
    if (newMarker) {
      const { position, type } = newMarker;
      const { lat, lng } = position;

      if (state.tempMarker === null) {
        state.tempMarker = L.marker([lat, lng], {
          icon: appIcon({ iconSrc: icons.value[type].image }),
        });
      } else {
        if (type !== oldMarker.type) {
          state.tempMarker.setIcon(appIcon({ iconSrc: icons.value[type].image }));
        }

        if (position !== oldMarker.position) {
          state.tempMarker.setLatLng([lat, lng]);
        }
      }
    } else {
      state.tempMarker.remove();
      state.tempMarker = null;
    }
  }
);
</script>

<template>
  <leaflet-map
    class="interactive-map"
    :new-marker="state.tempMarker"
    :markers="mapMarkers"
    :map-config="mapConfig"
    :image="imageFullPath"
    :bounds="mapBounds"
    @click="handleMapClick"
  />
</template>
