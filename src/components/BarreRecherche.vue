<template>
  <v-text-field
    clearable
    density="comfortable"
    label="Rechercher un jeu..."
    :model-value="modelValue"
    prepend-inner-icon="mdi-magnify"
    variant="outlined"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup>
  defineProps({
    modelValue: String,
  })

  defineEmits(['update:modelValue'])
</script>
