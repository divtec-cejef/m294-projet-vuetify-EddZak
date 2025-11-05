<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3 mb-4">Meilleures Offres Steam</h1>
      </v-col>
    </v-row>

    <!-- Barre de recherche et tri -->
    <v-row>
      <v-col cols="12" md="8">
        <BarreRecherche v-model="recherche" />
      </v-col>
      <v-col cols="12" md="4">
        <MenuTri v-model="store.triActuel" />
      </v-col>
    </v-row>

    <!-- État de chargement -->
    <v-row v-if="store.chargement">
      <v-col class="text-center" cols="12">
        <v-progress-circular
          color="primary"
          indeterminate
          size="64"
        />
        <p class="mt-4">Chargement...</p>
      </v-col>
    </v-row>

    <!-- Grille des jeux -->
    <GrilleJeux v-else :jeux="jeuxFiltres" />

    <!-- Message si aucun résultat -->
    <v-row v-if="!store.chargement && jeuxFiltres.length === 0">
      <v-col cols="12">
        <v-alert type="info" variant="tonal">
          Aucun jeu trouvé
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { computed, ref } from 'vue'
  import { useAppStore } from '@/stores/app'

  // Accès au store Pinia
  const store = useAppStore()

  // Variable pour la recherche
  const recherche = ref('')

  // Filtre les jeux selon la recherche
  const jeuxFiltres = computed(() => {
    const liste = store.jeuxTries

    if (!recherche.value) {
      return liste
    }

    return liste.filter(jeu =>
      jeu.title.toLowerCase().includes(recherche.value.toLowerCase()),
    )
  })
</script>
