import { onBeforeUnmount, onMounted } from "vue";

export const useClickOutside = (ref, callback) => {
  if (!ref) return;

  const listener = (e) => {
    if (e.target === ref.value || e.composedPath().includes(ref.value)) {
      return;
    }

    if (typeof callback === "function") {
      callback();
    }
  };

  onMounted(() => document.addEventListener("click", listener));

  onBeforeUnmount(() => document.removeEventListener("click", listener));

  return {
    listener,
  };
};
