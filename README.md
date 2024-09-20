# vue-starter

Kit de départ préconfiguré utilisant [vue-cli](https://cli.vuejs.org/), [ESLint](https://eslint.org/) avec [Prettier](https://prettier.io/) et [Jest](https://jestjs.io/).

## Prérequis

-   Git [Windows](http://www.git-scm.com/book/en/Getting-Started-Installing-Git#Installing-on-Windows), [Mac](http://www.git-scm.com/book/en/Getting-Started-Installing-Git#Installing-on-Mac), [Linux](http://www.git-scm.com/book/en/Getting-Started-Installing-Git#Installing-on-Linux)
-   [Node.js](https://nodejs.org/en/) (version LTS recommandée)

Vérifier que Node est installé avec la commande:

```bash
node -v
```

Vérifier que Node est installé avec la commande:

```bash
npm -v
```

## Installation

```bash
# install dependencies
npm install
```

### Configuration des variables d'environnement

Ce projet utilise un fichier .env pour gérer les variables d'environnement sensibles telles que les clés d'API et les configurations spécifiques.

Un fichier exemple .env.example est fourni à la racine du projet. Il contient la structure et les variables nécessaires.

#### Pour configurer vos propres variables d'environnement, suivez ces étapes :

1. Dupliquez le fichier .env.example et renommez-le .env :
2. Ouvrez le fichier .env nouvellement créé et remplacez les valeurs par celles correspondant à votre environnement local ou aux informations sensibles (pour ce projet, toutes les informations se trouvent déjà dans le fichier).
3. Sauvegardez et fermez le fichier .env

Par exemple :

```plaintext

VUE_APP_MAP_API_KEY=VOTRE_CLE_API
VUE_APP_RESTAURANT_API=https://ufoodapi.herokuapp.com/

```
#### Pour ajouter des variables d'environnement:
Il est important de préfixer la variable avec VUE_APP 

## Développement

```bash
# serve with hot reload at localhost:8080
npm run serve
```

## Livrable 1

Faites vos modifications aux fichiers `Home.vue`, `Navigation.vue`, `Restaurant.vue` et `User.vue`. Ajoutez votre HTML dans la balise `<template>` et votre CSS dans la balise `<style>` de chacun des components. Vous pouvez également modifier la structure de fichiers si vous désirez.

## Livrable 2-3

Libre à vous de modifier la structure des fichiers.

## Notes

### ESLint

ESLint est configuré afin de respecter un certain standard de code à travers votre équipe. Il est basé sur la configuration de Prettier. qui rassemble les règles de base populaires. Libre à vous de modifier cette configuration via `package.json`.
