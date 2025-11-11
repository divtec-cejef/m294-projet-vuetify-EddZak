<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <!-- Titre cliquable qui ramène à l'accueil -->
        <h1 class="text-h3 mb-4" style="cursor: pointer" @click="$router.push('/')">
          Meilleures Offres Steam
        </h1>
      </v-col>
    </v-row>

    <!-- Barre de recherche, filtre de prix et tri sur la même ligne -->
    <v-row>
      <!-- Barre de recherche -->
      <v-col cols="12" md="5">
        <BarreRecherche v-model="recherche" />
      </v-col>

      <!-- Filtre de prix -->
      <v-col cols="12" md="3">
        <v-select
          v-model="filtrePrix"
          density="comfortable"
          :items="optionsPrix"
          label="Tranche de prix"
          variant="outlined"
        />
      </v-col>

      <!-- Menu de tri -->
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

  // Variable pour le filtre de prix
  const filtrePrix = ref('Tous')

  // Options du filtre de prix
  const optionsPrix = [
    'Tous',
    'Gratuit',
    'Moins de $5',
    '$5 - $15',
    '$15 - $30',
    'Plus de $30',
  ]

  // Filtre les jeux selon la recherche ET le prix
  const jeuxFiltres = computed(() => {
    let liste = store.jeuxTries

    // Filtre par recherche
    if (recherche.value) {
      liste = liste.filter(jeu =>
        jeu.title.toLowerCase().includes(recherche.value.toLowerCase()),
      )
    }

    // Filtre par prix
    if (filtrePrix.value !== 'Tous') {
      liste = liste.filter(jeu => {
        const prix = Number.parseFloat(jeu.salePrice)

        switch (filtrePrix.value) {
          case 'Gratuit': {
            return prix === 0
          }
          case 'Moins de $5': {
            return prix > 0 && prix < 5
          }
          case '$5 - $15': {
            return prix >= 5 && prix < 15
          }
          case '$15 - $30': {
            return prix >= 15 && prix < 30
          }
          case 'Plus de $30': {
            return prix >= 30
          }
          default: {
            return true
          }
        }
      })
    }

    return liste
  })
</script>
