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
  getLocations: () => axi.get("/resources/data/locations.json"),
  getFilters: () => axi.get("/resources/data/filters.json"),
  getIcons: () => axi.get("/resources/data/icons.json"),
  // Details
  getDetails: (slug) => axi.get(`/resources/data/details/${slug}.json`),
};
