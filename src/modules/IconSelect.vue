<script setup>
import { inject, reactive, watch } from "vue";

import { getMarkerUrl } from "~/client";
import BaseSelect from "~/components/BaseSelect.vue";

const emit = defineEmits(["change"]);

const props = defineProps({
  default: {
    type: String,
    default: "default",
  },
});

const icons = inject("icons");

const state = reactive({
  current: icons.value[props.default],
  icons: Object.values(icons.value),
});

const imageFullPath = (image) => getMarkerUrl(image);

watch(
  () => state.current,
  (icon) => emit("change", icon)
);
</script>

<template>
  <base-select v-model="state.current" :items="state.icons" key-value="type">
    <template #selected="{ item }">
      <div class="icon-select__item icon-select__item__selected">
        <img :src="imageFullPath(item.image)" :alt="item.title" class="icon-select__item-image" />
        <span class="icon-select__item-text" v-text="item.title"></span>
      </div>
    </template>

    <template #default="{ item }">
      <div class="icon-select__item">
        <img :src="imageFullPath(item.image)" :alt="item.title" class="icon-select__item-image" />
        <span class="icon-select__item-text" v-text="item.title"></span>
      </div>
    </template>
  </base-select>
</template>

<style scoped>
.icon-select__item {
  display: flex;
  align-items: center;
}
.icon-select__item-image {
  width: 32px;
  display: inline-block;
  margin-right: 4px;
}
</style>
