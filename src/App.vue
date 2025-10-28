<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useAppStore } from '@/stores/app'

  const store = useAppStore()
  const recherche = ref('')

  onMounted(() => {
    store.init()
  })

  // Filtrer les jeux selon la recherche
  const jeuxFiltres = computed(() => {
    if (!recherche.value) return store.jeuxTries

    return store.jeuxTries.filter(jeu =>
      jeu.title.toLowerCase().includes(recherche.value.toLowerCase()),
    )
  })

  // Options de tri
  const optionsTri = [
    { title: 'Par défaut ', value: 'defaut' },
    { title: 'Nom (A → Z)', value: 'nom-asc' },
    { title: 'Nom (Z → A)', value: 'nom-desc' },
    { title: 'Prix croissant', value: 'prix-asc' },
    { title: 'Prix décroissant', value: 'prix-desc' },
    { title: 'Économie croissante', value: 'economie-asc' },
    { title: 'Économie décroissante', value: 'economie-desc' },
  ]
</script>

<template>
  <v-app>
    <!-- Barre de navigation -->
    <v-app-bar color="primary">
      <v-toolbar-title>Offres Steam</v-toolbar-title>

      <v-spacer />

      <v-chip class="mr-4">
        {{ store.totalFavoris }} favoris
      </v-chip>
    </v-app-bar>

    <v-main>
      <v-container>
        <h1>Meilleures Offres Steam</h1>

        <v-text-field
          v-model="recherche"
          class="mb-4"
          clearable
          label="Rechercher un jeu..."
          prepend-inner-icon="mdi-magnify"
        />

        <v-select
          class="mb-4"
          :items="optionsTri"
          label="Trier par"
          :model-value="store.triActuel"
          prepend-inner-icon="mdi-sort"
          @update:model-value="store.changerTri"
        />

        <div v-if="store.isLoading" class="text-center my-8">
          <v-progress-circular indeterminate />
          <p>Chargement...</p>
        </div>

        <v-row v-else>
          <v-col
            v-for="jeu in jeuxFiltres"
            :key="jeu.dealID"
            cols="12"
            md="4"
            sm="6"
          >
            <v-card>
              <!-- Image -->
              <v-img height="150" :src="jeu.thumb" />

              <!-- Badge économie -->
              <v-chip
                class="ma-2"
                color="success"
                size="small"
                style="position: absolute; top: 0; right: 0;"
              >
                -{{ Math.round(jeu.savings) }}%
              </v-chip>

              <v-card-title>{{ jeu.title }}</v-card-title>

              <v-card-text>
                <p><strong>{{ jeu.salePrice }}$</strong></p>
                <p class="text-decoration-line-through text-grey">
                  {{ jeu.normalPrice }}$
                </p>
              </v-card-text>

              <v-card-actions>
                <!-- Bouton Steam -->
                <v-btn
                  color="primary"
                  :href="`https://store.steampowered.com/app/${jeu.steamAppID}`"
                  size="small"
                  target="_blank"
                >
                  Steam
                </v-btn>

                <v-spacer />

                <v-btn
                  icon
                  size="small"
                  @click="store.toggleFavori(jeu)"
                >
                  <v-icon :color="store.estFavori(jeu.dealID) ? 'red' : ''">
                    {{ store.estFavori(jeu.dealID) ? 'mdi-heart' : 'mdi-heart-outline' }}
                  </v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>

        <p v-if="jeuxFiltres.length === 0 && !store.isLoading" class="text-center mt-8">
          Aucun jeu trouvé
        </p>
      </v-container>
    </v-main>
  </v-app>
</template>
