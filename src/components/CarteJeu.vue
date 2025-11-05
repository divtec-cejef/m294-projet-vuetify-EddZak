<template>
  <v-card class="d-flex flex-column h-100" elevation="2">
    <!-- Image du jeu avec hauteur fixe -->
    <v-img
      class="align-end"
      cover
      height="150"
      :src="jeu.thumb"
    >
      <!--réduction en overlay sur l'image -->
      <v-chip
        class="ma-2 font-weight-bold"
        color="green"
        location="top right"
        size="small"
        variant="flat"
      >
        -{{ Math.round(jeu.savings) }}%
      </v-chip>
    </v-img>

    <!-- Contenu de la carte -->
    <v-card-title class="text-subtitle-1">
      {{ jeu.title }}
    </v-card-title>

    <!-- Section des prix -->
    <v-card-text class="flex-grow-1">
      <!-- Prix actuel en vert -->
      <div class="text-h5 text-green font-weight-bold mb-1">
        {{ jeu.salePrice }}$
      </div>
      <!-- Prix normal barré -->
      <div class="text-body-2 text-grey text-decoration-line-through">
        {{ jeu.normalPrice }}$
      </div>
    </v-card-text>

    <!-- Boutons d'action -->
    <v-card-actions>
      <!-- Bouton pour aller sur Steam -->
      <v-btn
        color="blue"
        :href="`https://store.steampowered.com/app/${jeu.steamAppID}`"
        size="small"
        target="_blank"
        variant="elevated"
      >
        <v-icon size="small" start>mdi-steam</v-icon>
        Steam
      </v-btn>

      <v-spacer />

      <!-- Bouton favori qui change selon l'état -->
      <v-btn
        :color="estFavori ? 'red' : 'grey'"
        :icon="estFavori ? 'mdi-heart' : 'mdi-heart-outline'"
        variant="text"
        @click="toggleFavori"
      />
    </v-card-actions>
  </v-card>
</template>

<script setup>
  import { computed } from 'vue'
  import { useAppStore } from '@/stores/app'

  // Réception des props depuis le parent
  const props = defineProps({
    jeu: Object,
  })

  // Accès au store Pinia
  const store = useAppStore()

  // Computed pour savoir si le jeu est dans les favoris
  const estFavori = computed(() => {
    return store.estFavori(props.jeu.dealID)
  })

  // Fonction pour ajouter/retirer des favoris
  function toggleFavori () {
    store.toggleFavori(props.jeu)
  }
</script>
