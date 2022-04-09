import { inject } from "vue";

export const createPopupForMarker = (marker) => {
  const icons = inject("icons");

  const icon = icons.value[marker.type] ?? icons.value.default;

  return `<div class="app-popup-content">
    ${marker.title ? `<h3>${marker.title}</h3>` : "<h4>Безымянный маркер</h4>"}
    ${icon ? `<h4>${icon.title}</h4>` : ""}
    ${marker.description && marker.description.length ? `<p>${marker.description}</p>` : ""}
  </div>`;
};

export const validateMarker = (marker) => {
  return (
    typeof marker.title === "string" &&
    marker.title.length > 0 &&
    typeof marker.slug === "string" &&
    marker.slug === makeSlug(marker.title)
  );
};

const translitMap = Object.freeze({
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "yo",
  ж: "g",
  з: "z",
  и: "i",
  й: "i",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "c",
  ч: "ch",
  ш: "sh",
  щ: "sh",
  ъ: "",
  ы: "i",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
  a: "a",
  b: "b",
  c: "c",
  d: "d",
  e: "e",
  f: "f",
  g: "g",
  h: "h",
  i: "i",
  j: "j",
  k: "k",
  l: "l",
  m: "m",
  n: "n",
  o: "o",
  p: "p",
  q: "q",
  r: "r",
  s: "s",
  t: "t",
  u: "u",
  v: "v",
  w: "w",
  x: "x",
  y: "y",
  z: "z",
  " ": "_",
  "-": "-",
});

export const makeSlug = (text) => {
  return text
    .toLowerCase()
    .split("")
    .map((char) => translitMap[char] ?? translitMap["-"])
    .join("");
};
