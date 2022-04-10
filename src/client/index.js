import axios from "axios";

const axi = axios.create({
  baseURL: import.meta.env.VITE_BASE,
});

axi.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);
axi.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

export const client = {
  // Misc
  getLocations: () => axi.get(`resources/data/locations.json`),
  getIcons: () => axi.get(`resources/data/icons.json`),
  // Details
  getDetails: (slug) => axi.get(`resources/data/details/${slug}.json`),
};

export const getMapUrl = (mapImage) => `${import.meta.env.VITE_BASE}resources/maps/${mapImage}`;

export const getMarkerUrl = (markerImage) =>
  `${import.meta.env.VITE_BASE}resources/markers/${markerImage}`;
