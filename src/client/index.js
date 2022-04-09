import axios from "axios";

const axi = axios.create({
  // eslint-disable-next-line no-undef
  baseURL: BASE
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
