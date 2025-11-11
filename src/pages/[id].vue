<template>
  <v-container>
    <!-- Bouton retour en haut -->
    <v-row>
      <v-col cols="12">
        <v-btn
          prepend-icon="mdi-arrow-left"
          variant="text"
          @click="$router.push('/')"
        >
          Retour aux offres
        </v-btn>
      </v-col>
    </v-row>

    <!-- Affiche la carte seulement si le jeu est chargé -->
    <v-card v-if="jeu" class="mt-4" elevation="8">
      <v-row no-gutters>
        <!-- Image du jeu (côté gauche) -->
        <v-col cols="12" md="5">
          <v-img
            class="rounded-s"
            cover
            height="400"
            :src="jeu.gameInfo.thumb"
          />
        </v-col>

        <!-- Informations du jeu (côté droit) -->
        <v-col cols="12" md="7">
          <v-card-title class="text-h4 pa-6">
            {{ jeu.gameInfo.name }}
          </v-card-title>

          <v-card-text class="pa-6">
            <!-- Prix avec badge de réduction -->
            <v-row class="mb-4">
              <v-col cols="12">
                <div class="d-flex align-center ga-3">
                  <!-- Badge de réduction -->
                  <v-chip
                    v-if="reduction > 0"
                    color="red"
                    label
                    size="large"
                  >
                    -{{ Math.round(reduction) }}%
                  </v-chip>

                  <!-- Prix barré -->
                  <span
                    v-if="jeu.gameInfo.retailPrice !== jeu.gameInfo.salePrice"
                    class="text-h6 text-decoration-line-through text-grey"
                  >
                    ${{ jeu.gameInfo.retailPrice }}
                  </span>

                  <!-- Prix actuel -->
                  <span class="text-h4 text-green font-weight-bold">
                    ${{ jeu.gameInfo.salePrice }}
                  </span>
                </div>
              </v-col>
            </v-row>

            <!-- Séparateur -->
            <v-divider class="my-4" />

            <!-- Informations supplémentaires -->
            <v-row>
              <v-col cols="12">
                <h3 class="text-h6 mb-3">Informations</h3>

                <!-- Store du jeu -->
                <div class="mb-2">
                  <v-icon class="mr-2" size="small">mdi-store</v-icon>
                  <strong>Magasin:</strong> {{ jeu.gameInfo.storeID === '1' ? 'Steam' : 'Autre' }}
                </div>

                <!-- Note Steam si disponible -->
                <div v-if="jeu.gameInfo.steamRatingText" class="mb-2">
                  <v-icon class="mr-2" size="small">mdi-star</v-icon>
                  <strong>Avis Steam:</strong> {{ jeu.gameInfo.steamRatingText }}
                  <span v-if="jeu.gameInfo.steamRatingPercent">
                    ({{ jeu.gameInfo.steamRatingPercent }}%)
                  </span>
                </div>

                <!-- Date de sortie -->
                <div v-if="jeu.gameInfo.releaseDate" class="mb-2">
                  <v-icon class="mr-2" size="small">mdi-calendar</v-icon>
                  <strong>Date de sortie:</strong>
                  {{ new Date(jeu.gameInfo.releaseDate * 1000).toLocaleDateString('fr-FR') }}
                </div>

                <!-- Métacritic score si disponible -->
                <div v-if="jeu.gameInfo.metacriticScore" class="mb-2">
                  <v-icon class="mr-2" size="small">mdi-chart-box</v-icon>
                  <strong>Score Metacritic:</strong> {{ jeu.gameInfo.metacriticScore }}/100
                </div>
              </v-col>
            </v-row>

            <!-- Séparateur -->
            <v-divider class="my-4" />

            <!-- Économies réalisées -->
            <v-row v-if="reduction > 0">
              <v-col cols="12">
                <v-alert
                  color="success"
                  icon="mdi-cash-multiple"
                  variant="tonal"
                >
                  <strong>Vous économisez ${{ economie }} !</strong>
                </v-alert>
              </v-col>
            </v-row>
          </v-card-text>

          <!-- Boutons d'action -->
          <v-card-actions class="pa-6 pt-0">
            <!-- Bouton vers Steam si disponible -->
            <v-btn
              v-if="jeu.gameInfo.steamAppID"
              block
              color="primary"
              :href="`https://store.steampowered.com/app/${jeu.gameInfo.steamAppID}`"
              prepend-icon="mdi-steam"
              size="large"
              target="_blank"
            >
              Voir sur Steam
            </v-btn>
            <!-- Sinon bouton CheapShark -->
            <v-btn
              v-else
              block
              color="primary"
              :href="`https://www.cheapshark.com/redirect?dealID=${jeu.dealID}`"
              prepend-icon="mdi-cart"
              size="large"
              target="_blank"
            >
              Acheter maintenant
            </v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </v-card>

    <!-- État de chargement -->
    <v-row v-else>
      <v-col class="text-center" cols="12">
        <v-progress-circular
          color="primary"
          indeterminate
          size="64"
        />
        <p class="mt-4">Chargement des détails...</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
  import { computed, onMounted, ref } from 'vue'
  import { useRoute } from 'vue-router'

  // Récupère la route actuelle
  const route = useRoute()
  // Variable pour stocker les données du jeu
  const jeu = ref(null)

  // Calcule la réduction en pourcentage
  const reduction = computed(() => {
    if (!jeu.value) return 0
    const normal = Number.parseFloat(jeu.value.gameInfo.retailPrice)
    const sale = Number.parseFloat(jeu.value.gameInfo.salePrice)
    if (normal === 0) return 0
    return ((normal - sale) / normal) * 100
  })

  // Calcule l'économie en dollars
  const economie = computed(() => {
    if (!jeu.value) return 0
    const normal = Number.parseFloat(jeu.value.gameInfo.retailPrice)
    const sale = Number.parseFloat(jeu.value.gameInfo.salePrice)
    return (normal - sale).toFixed(2)
  })

  // Quand la page est montée, charge les données du jeu
  onMounted(async () => {
    // Récupère l'ID depuis l'URL et l'encode
    const id = encodeURIComponent(route.params.id)
    // Affiche l'ID pour debug
    console.log('ID encodé:', id)
    // Appelle l'API CheapShark avec l'ID encodé
    const response = await fetch(`https://www.cheapshark.com/api/1.0/deals?id=${id}`)
    // Stocke les données du jeu
    jeu.value = await response.json()
    // Affiche les données dans la console pour debug
    console.log('Données du jeu:', jeu.value)
  })
</script>
