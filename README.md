# UFood

Projet de session du cours GLO-3021: Développement d'application web   
Ce projet consiste à développer une application web permettant de trouver des restaurants et de partager ses favoris entre amis

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

## Comment exécuter le code

```bash
# installer les dépendances
npm install

# exécuter le programme
npm run serve
```

## Configuration des variables d'environnement

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


> GLO-3021   
> UFood  
> Équipe 1  
