// src/stores/app.js
import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useAppStore = defineStore('app', {
  state: () => ({
    isLoading: false,
    error: null,
    jeux: [],
    favoris: [],
    triActuel: 'defaut',
  }),

  getters: {
    hasGames: state => state.jeux.length > 0,
    totalGames: state => state.jeux.length,
    totalFavoris: state => state.favoris.length, // NOUVEAU : Nombre de favoris

    estFavori: state => dealID => {
      return state.favoris.some(jeu => jeu.dealID === dealID)
    },

    jeuxTries: state => {
      const jeux = [...state.jeux] // Copie pour ne pas modifier l'original

      switch (state.triActuel) {
        case 'nom-asc': {
          return jeux.toSorted((a, b) => a.title.localeCompare(b.title))
        }

        case 'nom-desc': {
          return jeux.toSorted((a, b) => b.title.localeCompare(a.title))
        }

        case 'prix-asc': {
          return jeux.toSorted((a, b) => Number.parseFloat(a.salePrice) - Number.parseFloat(b.salePrice))
        }

        case 'prix-desc': {
          return jeux.toSorted((a, b) => Number.parseFloat(b.salePrice) - Number.parseFloat(a.salePrice))
        }

        case 'economie-asc': {
          return jeux.toSorted((a, b) => Number.parseFloat(a.savings) - Number.parseFloat(b.savings))
        }

        case 'economie-desc': {
          return jeux.toSorted((a, b) => Number.parseFloat(b.savings) - Number.parseFloat(a.savings))
        }

        default: {
          return jeux
        } // Tri par défaut (Deal Rating)
      }
    },
  },

  actions: {
    async fetchGames () {
      try {
        this.isLoading = true
        const response = await api.get('/deals', {
          params: {
            storeID: '1',
            pageSize: 60,
          },
        })
        this.jeux = response.data.filter(jeu => jeu.storeID === '1')
        console.log(' Jeux chargés :', this.jeux.length)
      } catch (error) {
        this.error = 'Erreur lors du chargement des jeux : ' + error.message
        console.error(' Erreur:', error)
      } finally {
        this.isLoading = false
      }
    },

    changerTri (typeTri) {
      this.triActuel = typeTri
      console.log('🔄 Tri changé :', typeTri)
    },

    ajouterFavori (jeu) {
      if (!this.estFavori(jeu.dealID)) {
        this.favoris.push(jeu)
        this.sauvegarderFavoris()
        console.log('Ajouté aux favoris :', jeu.title)
      }
    },

    retirerFavori (dealID) {
      this.favoris = this.favoris.filter(jeu => jeu.dealID !== dealID)
      this.sauvegarderFavoris()
      console.log(' Retiré des favoris')
    },

    toggleFavori (jeu) {
      if (this.estFavori(jeu.dealID)) {
        this.retirerFavori(jeu.dealID)
      } else {
        this.ajouterFavori(jeu)
      }
    },

    sauvegarderFavoris () {
      localStorage.setItem('favoris-jeux', JSON.stringify(this.favoris))
    },

    chargerFavoris () {
      const favorisStockes = localStorage.getItem('favoris-jeux')
      if (favorisStockes) {
        this.favoris = JSON.parse(favorisStockes)
        console.log(' Favoris chargés :', this.favoris.length)
      }
    },

    async init () {
      this.chargerFavoris() // Charger favoris d'abord
      await this.fetchGames()
    },
  },
})
