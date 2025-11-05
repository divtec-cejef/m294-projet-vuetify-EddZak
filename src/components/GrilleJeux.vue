<template>
  <v-row>
    <v-col
      v-for="jeu in jeux"
      :key="jeu.dealID"
      cols="12"
      lg="3"
      md="4"
      sm="6"
    >
      <CarteJeu :jeu="jeu" />
    </v-col>
  </v-row>
</template>

<script setup>
  defineProps({
    jeux: Array,
  })
</script>
