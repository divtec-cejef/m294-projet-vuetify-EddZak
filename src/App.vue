<template>
  <v-app>
    <v-app-bar color="primary" prominent>
      <v-app-bar-title>
        <v-icon start>mdi-steam</v-icon>
        Offres Steam
      </v-app-bar-title>

      <v-spacer />

      <!-- AJOUT : Bouton pour basculer entre tous les jeux et favoris -->
      <v-btn
        class="mr-3"
        color="white"
        :variant="store.afficherFavoris ? 'flat' : 'outlined'"
        @click="store.toggleAffichage"
      >
        <v-icon start>
          {{ store.afficherFavoris ? 'mdi-view-grid' : 'mdi-heart' }}
        </v-icon>
        {{ store.afficherFavoris ? 'Tous les jeux' : 'Mes favoris' }}
      </v-btn>

      <!-- Compteur de favoris -->
      <v-chip
        color="red"
        prepend-icon="mdi-heart"
        variant="flat"
      >
        {{ store.nombreFavoris }}
      </v-chip>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
  import { onMounted } from 'vue'
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()

  onMounted(() => {
    store.init()
  })
</script>
