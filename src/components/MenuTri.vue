<template>
  <v-select
    density="comfortable"
    :items="options"
    label="Trier par"
    :model-value="modelValue"
    variant="outlined"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>

<script setup>
  defineProps({
    modelValue: String,
  })

  defineEmits(['update:modelValue'])

  const options = [
    { title: 'Par défaut', value: 'defaut' },
    { title: 'Nom A→Z', value: 'nom-asc' },
    { title: 'Nom Z→A', value: 'nom-desc' },
    { title: 'Prix croissant', value: 'prix-asc' },
    { title: 'Prix décroissant', value: 'prix-desc' },
    { title: 'Économie croissante', value: 'economie-asc' },
    { title: 'Économie décroissante', value: 'economie-desc' },
  ]
</script>
