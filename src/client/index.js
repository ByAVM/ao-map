/* eslint-disable no-undef */
import axios from "axios";

const axi = axios.create();

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
  getLocations: () => axi.get(`${BASE}resources/data/locations.json`),
  getIcons: () => axi.get(`${BASE}resources/data/icons.json`),
  // Details
  getDetails: (slug) => axi.get(`${BASE}resources/data/details/${slug}.json`),
};
