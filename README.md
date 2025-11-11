[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/EBdR9AYf)
# 🌐 Mon Projet Vue.js & Vuetify

## 1. 🎨 Présentation du projet

### Concept
- Cheapshark car elle a moins de limitation
- Ceux qui utilisent steam et recherchent des jeux pas chers  
- Regrouper les offres dans 1 seul endroit  

### Fonctionnalités principales
- Affichage d'une liste de jeux en promotion via l'API CheapShark
- Recherche par nom de jeu
- Tri par nom, prix et économie (croissant/décroissant)
- Vue détail de chaque jeu avec informations complètes
- Système de favoris 
- Basculer entre tous les jeux et favoris uniquement

### Aperçu visuel
_(Capture d’écran de l’application)_  
`![Screenshot de l’application](img/screenshot_appli.png)`

---

## 2. 📚 Parcours d'apprentissage

### Ressources utilisées
#### Documentation & tutos
- Vue 3 Docs : https://vuejs.org/guide/introduction.html
- Vuetify Docs : https://vuetifyjs.com/en/components/all/
- Pinia Docs : https://pinia.vuejs.org/
- CheapShark API : https://apidocs.cheapshark.com/
- Vue Router : https://router.vuejs.org/

#### Progression
- Semaine 1 : Mise en place du projet
- Semaine 2 : Intégration de l'API / store
- Semaine 3 : Creation de la page avec API qui marche
- Semaine 4 : Système de favoris ET refaire le projet en mettant des pages et components séparés
- Semaine 5 : Mettre en place le routing et le readme

---

## 3. 🛠️ Outils et méthodologie

### Environnement de développement
- **IDE** : WebStorm 
- **Versioning** : Git + GitHub
- **Dépendances principales** : Vue 3, Vuetify 3, Pinia, Axios/Fetch
- **Gestion API Keys** : `.env` + `.env.example`

### Installation & Run
Cloner le repo : `git clone https://github.com/divtec-cejef/m294-projet-vuetify-EddZak.git`
Installer : `npm install`
Lancer : `npm run dev`
Variables d'environnement : copier `.env.example` vers `.env`

### Méthodologie
- Découpage en composants réutilisables (CarteJeu, BarreRecherche, MenuTri, GrilleJeux)
- Props & Emits pour la communication
- Store global avec Pinia pour la gestion d'état
- Tests manuels (UI, persistance, erreurs API)

### Choix techniques
- API sélectionnée : CheapShark
- Justification du choix : API gratuite sans clé nécessaire et données complètes sur les promotions Steam
- Endpoints utilisés : /deals avec paramètres storeID=1 (pour afficher que les jeux steams) et pageSize=60(car on peut pas plus)
- Limites/quotas connus : Aucun quotas(de ce que je sais), Probleme avec le dollars et la limite d'affichage de 60

### Architecture (Descriptif + schéma simple + data-flow)
Structure : `App.vue` (layout principal),
`pages/` (index.vue pour liste, [id].vue pour détail),
`components/` (CarteJeu, BarreRecherche, MenuTri, GrilleJeux),
`stores/app.js` (store Pinia),
`data/jeu.json` (données locales de test)
Outils utiles : Mermaid / Webstorm

`![Screenshot de l’application](img/screenshot_schema.png)`

**Data-flow résumé :**  
L'utilisateur arrive sur la page →
App.vue charge store.init() →
Le store appelle l'API CheapShark avec Axios →
Les données sont stockées dans store.jeux →
index.vue filtre selon la recherche → 
GrilleJeux affiche les CarteJeu →
Clic sur Détails →
Vue Router charge [id].vue avec l'ID →
[id].vue cherche le jeu dans store.jeux →
Les favoris sont sauvegardés dans localStorage
---

## 4. 🧪 Tests et validation

### Tests techniques
- ✅ Appels API fonctionnels (60 jeux chargés)
- ✅ Persistance vérifiée après refresh (localStorage)
- ✅ Navigation entre les vues OK (routing dynamique)
- ✅ Tri fonctionnel dans tous les sens

### Tests d’UX
- Navigation intuitive avec bouton retour
- Recherche/filtre/tri faciles à comprendre
- Feedback utilisateur (loading, messages d'erreur, états vides)
- Compteur de favoris visible

### Tests d’accessibilité
- Contraste couleurs (Vuetify par défaut)
- Labels et placeholders corrects
- Focus visible


### Tests d’erreurs & fallback
- API down : methode disponible 
- Liste vide : message clair affiché
- Recherche sans résultat : affichage "Aucun jeu trouvé"
- Jeu non trouvé sur page détail : message d'erreur

---

## 5. 🤖 Usage d’intelligence artificielle

**⚠️ TRANSPARENCE OBLIGATOIRE** : Si vous utilisez une IA, vous DEVEZ :

### IA utilisée
- **Nom** : Claude   
- **Version** :  Sonnet V
- **Contexte** :  Debugging, aide avec le routing, aide code general   

### Utilisation détaillée
**Domaines d'aide :**
- Aide au code général : 40%
- Génération de snippets Vue/Vuetify : 30%  
- Aide à la structuration du projet : 0%
- Debugging : 60%  
- Recherche d’idées : 0%  

**Compréhension et adaptation**
- Expliquer ce que fait le code généré  
- Dire comment il a été adapté au projet  

### Parties codées manuellement
- Composants principaux : 80% personnel  
- Store & persistance : 60% personnel  
- Routing & navigation : 30% personnel  
- Tests & validation : 100% personnel  

### Apprentissage personnel
- Compréhension partiel du routing dynamique
- Gestion d'état avec Pinia (state, getters, actions)
- Debugging des problèmes

---

## 6. 🎯 Bilan personnel

### Ce que j’ai appris
- La Composition API de Vue 3 avec defineProps, computed
- Le système de composants réutilisables avec props/emits
- La gestion d'état centralisée avec Pinia

### Difficultés rencontrées
- API qui affiche qu'en dollars et aussi limités a 60 recherches.
- Routing
- Compréhension initiale du v-model custom dans les composants

### Réussites et fiertés
- Système de favoris fonctionnel avec persistance
- Avoir partiellement comprit le routing
- D'avoir appris et aboutit au projet

### Améliorations possibles
- Ajouter la pagination pour charger plus de jeux
- Filtres par tranche de prix
- Animations de transition entre les pages
- Page dédiée aux favoris avec statistiques
- Système de notifications pour les nouvelles offres

---

## 7. 📚 Références & Sources
- Documentation de l'API : CheapShark API (https://apidocs.cheapshark.com/)
- Vue 3 Documentation (https://vuejs.org/)
- Vuetify Documentation (https://vuetifyjs.com/)
- Pinia Documentation (https://pinia.vuejs.org/)
- Vue Router Documentation (https://router.vuejs.org/)