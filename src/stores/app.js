// Store Pinia pour gérer l'application
import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useAppStore = defineStore('app', {
  state: () => ({
    jeux: [],
    favoris: [],
    chargement: false,
    triActuel: 'defaut',
    afficherFavoris: false,
  }),

  getters: {
    // Compte le nombre de favoris
    nombreFavoris: state => state.favoris.length,

    // Vérifie si un jeu est dans les favoris
    estFavori: state => dealID => {
      return state.favoris.some(jeu => jeu.dealID === dealID)
    },

    // Trie les jeux selon le tri sélectionné
    jeuxTries: state => {
      // Si afficherFavoris est true, on prend les favoris, sinon tous les jeux
      const copie = state.afficherFavoris ? [...state.favoris] : [...state.jeux]

      // Tri par nom A→Z
      if (state.triActuel === 'nom-asc') {
        return copie.toSorted((a, b) => a.title.localeCompare(b.title))
      }

      // Tri par nom Z→A
      if (state.triActuel === 'nom-desc') {
        return copie.toSorted((a, b) => b.title.localeCompare(a.title))
      }

      // Tri par prix croissant
      if (state.triActuel === 'prix-asc') {
        return copie.toSorted((a, b) => Number.parseFloat(a.salePrice) - Number.parseFloat(b.salePrice))
      }

      // Tri par prix décroissant
      if (state.triActuel === 'prix-desc') {
        return copie.toSorted((a, b) => Number.parseFloat(b.salePrice) - Number.parseFloat(a.salePrice))
      }

      // Tri par économie croissante
      if (state.triActuel === 'economie-asc') {
        return copie.toSorted((a, b) => Number.parseFloat(a.savings) - Number.parseFloat(b.savings))
      }

      // Tri par économie décroissante
      if (state.triActuel === 'economie-desc') {
        return copie.toSorted((a, b) => Number.parseFloat(b.savings) - Number.parseFloat(a.savings))
      }

      return copie
    },
  },

  actions: {
    // Charge les jeux depuis l'API
    async chargerJeux () {
      this.chargement = true

      try {
        const response = await api.get('/deals', {
          params: {
            storeID: '1',
            pageSize: 60,
          },
        })

        this.jeux = response.data.filter(jeu => jeu.storeID === '1')
      } catch (error) {
        console.error('Erreur API, chargement des données locales:', error)

        // charger les données locales si l'API est down
        try {
          const data = await import('@/data/jeu.json')
          this.jeux = data.default
        } catch (jsonError) {
          console.error('Erreur chargement JSON:', jsonError)
        }
      } finally {
        this.chargement = false
      }
    },

    // Charger uniquement depuis le fichier JSON local
    // async chargerJeuxJSON() {
    //   this.chargement = true
    //
    //   try {
    //     // Import dynamique du fichier JSON
    //     const data = await import('@/data/jeux-exemple.json')
    //     this.jeux = data.default
    //   } catch (error) {
    //     console.error('Erreur import JSON:', error)
    //   } finally {
    //     this.chargement = false
    //   }
    // },

    // Ajoute ou retire un jeu des favoris
    toggleFavori (jeu) {
      if (this.estFavori(jeu.dealID)) {
        // Retire des favoris
        this.favoris = this.favoris.filter(f => f.dealID !== jeu.dealID)
      } else {
        // Ajoute aux favoris
        this.favoris.push(jeu)
      }

      // Sauvegarde dans le localStorage
      localStorage.setItem('favoris', JSON.stringify(this.favoris))
    },

    // Bascule entre affichage tous les jeux / favoris
    toggleAffichage () {
      this.afficherFavoris = !this.afficherFavoris
    },

    // Charge les favoris depuis le localStorage
    chargerFavoris () {
      const data = localStorage.getItem('favoris')
      if (data) {
        this.favoris = JSON.parse(data)
      }
    },

    async init () {
      this.chargerFavoris()
      await this.chargerJeux()
    },
  },
})
