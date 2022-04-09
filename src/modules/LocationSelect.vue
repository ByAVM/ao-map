<script setup>
import { onMounted, reactive, inject, watch } from "vue";
import { useRouter } from "vue-router";
import BaseSelect from "~/components/BaseSelect.vue";

const props = defineProps({
  value: {
    type: String,
    required: true
  },
})

const router = useRouter();

const state = reactive({
  current: null,
});

const locations = inject("locations");

onMounted(() => {
  const currentLocation = locations.value.find((loc) => loc.slug === props.value);

  if (currentLocation) {
    state.current = currentLocation;
  } else {
    router.replace({ name: "map", params: { location: "svetolesye" } });
  }
});

const formatTitle = (location) => {
  if (location.levels.length) {
    return `[${location.levels}] ${location.title}`;
  } else {
    return location.title;
  }
};

watch(
  () => state.current,
  (location) => router.push({name: 'map', params: {location: location.slug}})
);

const filter = (item, filterValue) => {
  return item.title.search(new RegExp(filterValue, "i")) >= 0;
};
const grouper = (groups, item) => {
  if (groups[item.groupName]) {
    groups[item.groupName].push(item);
  } else {
    groups[item.groupName] = [item];
  }
  return groups;
};
</script>

<template>
  <base-select v-model="state.current" :items="locations" :group-by="grouper" :filter="filter">
    <template #selected="{ item }">
      <div class="location-select__item location-select__item__selected">
        <span class="location-select__item-text" v-text="formatTitle(item)"></span>
      </div>
    </template>
    <template v-slot="{ item }">
      <div class="location-select__item">
        <span class="location-select__item-text" v-text="formatTitle(item)"></span>
      </div>
    </template>
  </base-select>
</template>

<style scoped>
.location-select__item {
}
.location-select__item__selected {
}

.location-select__item-text {
}
</style>
