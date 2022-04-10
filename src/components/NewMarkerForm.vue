<script setup>
import IconSelect from "~/modules/IconSelect.vue";
import { makeSlug } from "~/utils/markers";

const emit = defineEmits(["update:modelValue", "submit", "decline"]);

const props = defineProps({
  modelValue: {
    type: Object,
  },
});

const handleUpdate = (field, payload) => {
  const newValue = { ...props.modelValue };

  if (field === "title") {
    newValue.slug = makeSlug(payload);
  }
  newValue[field] = payload;
  emit("update:modelValue", newValue);
};

const handleSubmit = () => {
  emit("submit", props.modelValue);
};
const handleDecline = () => {
  emit("decline");
};
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="app-form-control">
      <label class="app-label">Иконка маркера</label>
      <icon-select :default="props.modelValue.type" @change="(i) => handleUpdate('type', i.type)" />
    </div>

    <div class="app-form-control">
      <label class="app-label">Название</label>
      <input
        type="text"
        class="app-input"
        placeholder="Новая метка"
        :value="props.modelValue.title"
        @input="(e) => handleUpdate('title', e.target.value)"
      />
    </div>

    <div class="app-form-control">
      <label class="app-label">Описание</label>
      <textarea
        class="app-textarea"
        placeholder="Описание маркера"
        :value="props.modelValue.description"
        @input="(e) => handleUpdate('description', e.target.value)"
      ></textarea>
    </div>

    <button class="app-button app-button__primary" type="submit">Добавить</button>
    <button class="app-button app-button__secondary" type="button" @click="handleDecline">
      Отмена
    </button>
  </form>
</template>
