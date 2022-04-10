<script setup>
import L from "leaflet";
// eslint-disable-next-line no-unused-vars
import * as ControlSearch from "leaflet-search";
import { onMounted, ref, watch } from "vue";

const emit = defineEmits(["click"]);

const props = defineProps({
  mapConfig: {
    type: Object,
    default: () => ({
      preferCanvas: true,
      crs: L.CRS.Simple,
      minZoom: -1,
      maxZoom: 2,
      zoomDelta: 0.5,
      zoomSnap: 0.5,
    }),
  },
  markers: {
    type: Array,
    default: () => [],
  },
  newMarker: {
    type: [Object, null],
    default: null,
  },
  image: {
    type: String,
    default: "",
  },
  bounds: {
    type: Array,
    default: () => [
      [0, 0],
      [100, 100],
    ],
  },
});

const map = ref(null);
const mapRef = ref(null);
const markersLayer = L.layerGroup();
const imageLayer = L.imageOverlay(props.image, props.bounds);

onMounted(() => {
  map.value = L.map(mapRef.value, {
    ...props.mapConfig,
    layers: [markersLayer, imageLayer],
  })
    .setView([50, 50], -0.5)
    .on("click", (e) => {
      emit("click", map.value.mouseEventToLatLng(e.originalEvent));
    });

  props.markers.forEach((marker) => markersLayer.addLayer(marker));

  const localData = (t, callResponse) => {
    callResponse(
      props.markers.map((m) => ({ loc: [m.position.lat, m.position.lng], title: m.title }))
    );

    return {
      abort: function () {
        console.log("aborted for", t);
      },
    };
  };

  map.value.addControl(
    L.control.search({
      sourceData: localData,
      layer: markersLayer,
      initial: false,
      markerLocation: true,
      text: "Название",
      marker: false,
      zoom: 1,
      collapsed: false,
      position: "topright",
      textErr: "Маркер не найден", //error message
      textCancel: "Отмена", //title in cancel button
      textPlaceholder: "Поиск...",
    })
  );
});

const updateMap = () => {
  const [, bounds] = props.bounds;

  map.value.setView([bounds[0] / 2, bounds[1] / 2], -1).setMaxBounds(bounds);
};

watch([() => props.image, () => props.bounds], () => {
  imageLayer.setUrl(props.image).setBounds(props.bounds);
  updateMap;
});
watch(
  () => [...props.markers],
  () => {
    markersLayer.clearLayers();
    props.markers.forEach((marker) => markersLayer.addLayer(marker));
  }
);
watch(
  () => props.newMarker,
  (to, from) => {
    if (to && from === null) {
      markersLayer.addLayer(to);
    }
  }
);
</script>

<template>
  <div id="map" ref="mapRef"></div>
</template>
