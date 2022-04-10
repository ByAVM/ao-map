<script setup>
import { computed, reactive, ref } from "vue";

import { useClickOutside } from "~/hooks/useClickOutside";

const emit = defineEmits(["update:modelValue"]);

const props = defineProps({
  items: {
    type: Array,
    default: () => [],
  },
  filter: {
    type: Function,
    default: null,
  },
  groupBy: {
    type: Function,
    default: null,
  },
  keyValue: {
    type: String,
    default: "slug",
  },
  modelValue: {
    type: Object,
    default: null,
  },
});

const state = reactive({
  expanded: false,
  filterValue: "",
});

const filteredItems = computed(() => {
  if (props.filter && state.filterValue.length > 2) {
    return props.items.filter((item) => {
      return props.filter(item, state.filterValue);
    });
  } else {
    return props.items;
  }
});

const groupedItems = computed(() => {
  if (props.groupBy) {
    const groupMap = filteredItems.value.reduce(props.groupBy, {});
    return Object.entries(groupMap);
  } else {
    return filteredItems.value;
  }
});

const handleSelect = (item) => {
  emit("update:modelValue", item);
  state.expanded = false;
};

const handleExpand = () => {
  if (state.expanded === false) {
    state.expanded = true;
  }
};

const handleCollapse = () => {
  if (state.expanded === true) {
    state.expanded = false;
  }
};

const selectRef = ref(null);
useClickOutside(selectRef, handleCollapse);
</script>

<template>
  <div ref="selectRef" class="app-select">
    <div class="app-select__current" @click="handleExpand">
      <slot v-if="props.modelValue" name="selected" :item="props.modelValue"></slot>
    </div>

    <div
      :class="{
        'app-select__dropdown': true,
        'app-select__dropdown__expanded': state.expanded,
      }"
    >
      <div v-if="props.filter" class="app-select__filter">
        <input
          v-model="state.filterValue"
          class="app-input app-select__filter-input"
          type="text"
          placeholder="Поиск локации"
        />
      </div>

      <div class="app-select__dropdown-scroll">
        <div v-if="props.groupBy" class="app-select__dropdown-groups">
          <div
            v-for="[group, groupItems] in groupedItems"
            :key="group"
            class="app-select__dropdown-group"
          >
            <div class="app-select__dropdown-group-title" v-text="group" />

            <div class="app-select__dropdown-items">
              <div
                v-for="item in groupItems"
                :key="item[props.keyValue]"
                class="app-select__dropdown-item"
                @click="handleSelect(item)"
              >
                <slot :item="item" />
              </div>
            </div>
          </div>
        </div>
        <div v-else class="app-select__dropdown-items">
          <div
            v-for="item in groupedItems"
            :key="item[props.keyValue]"
            class="app-select__dropdown-item"
            @click="handleSelect(item)"
          >
            <slot :item="item" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.app-select {
  position: relative;
}
.app-select__current {
  padding: var(--input-padding);
  border-radius: var(--border-radius);
  border: solid 1px var(--border-color);
  cursor: pointer;
}
.app-select__dropdown {
  display: none;
  position: absolute;
  background-color: var(--bg-main);
  box-shadow: var(--shadow);
  min-width: 80%;
  z-index: 5;
}
.app-select__dropdown__expanded {
  display: block;
}
.app-select__dropdown-scroll {
  position: relative;
  height: auto;
  max-height: 250px;
  overflow-y: auto;
  z-index: 1;
  background-color: var(--bg-main);
}
.app-select__dropdown-groups {
  padding-bottom: 8px;
}
.app-select__dropdown-group-title {
  padding: 4px 8px;
  margin-top: 8px;
  font-weight: bold;
}
.app-select__filter {
  position: relative;
  padding: 8px 4px;
  z-index: 2;
}
.app-select__filter-input {
  display: block;
  width: 100%;
  padding: var(--input-padding);
}
.app-select__dropdown-item {
  cursor: pointer;
  padding: 4px 8px;
  background-color: var(--bg-main);
  color: #151515;
  transition: all 0.3s ease;
}
.app-select__dropdown-item:hover {
  background-color: var(--bg-dropdown);
  color: #111;
}
</style>
