### Nommage des commits
La convention utilisée pour nommer les commits est fortement inspirée de celle de Conventionnal Commits et a la structure suivante :

`<type>: <description>`

**Type** -> Type de commit parmi les choix suivants:
- feat : nouvelle fonctionnalité introduite avec les changements
- fix : correction d'un bug  
- chore : modifications qui ne concernent pas un correctif ou une fonctionnalité et ne modifient pas les fichiers src ou de test (par exemple la mise à jour des dépendances)
- refactor : code refactorisé qui ne corrige pas de bug ni n'ajoute de fonctionnalité
- docs : mises à jour de la documentation telle qu'un fichier README ou d'autres fichiers de markdown (md)
- style : modifications qui n'affectent pas la fonction du code et qui sont liées au formatage du code tel que les espaces, les points-virgules manquants, etc.
- test : introduction d'un nouveau test ou correction de tests déjà présents
- perf : amélioration de la performance
- ci : commits liés à l'intégration continue
- build : changements qui affectent le système de build ou les dépendances externes
- revert : annulation d'un précédent commit
    
**Description** -> courte description du changement qui :
- doit être en français
- utiliser l'impératif: "changer" et non pas "a changé" ou "change"
- commence par une minuscule
- n’a pas de point (.) à la fin

Sources:
- https://www.conventionalcommits.org/en/v1.0.0/ [Consulté le 27 janvier 2024]
- https://www.freecodecamp.org/news/how-to-write-better-git-commit-messages/ [Consulté le 27 janvier 2024]

### Stratégie de branchage
La stratégie de branchage utilisée dans ce projet est très similaire à Git Flow. 
- Nous avons deux branches de base : main et develop. La branche main est la principale qui contient le code officiellement intégré et pouvant être remis, alors que develop sert de branche d'intégration pour les fonctionnalités (_features_). 
- Chaque fonctionnalité a sa propre branche, créée à partir de la branche develop. Une fois la fonctionnalité implémentée, une pull request sera créée et devra être validé par 2 personnes avant de pouvoir fusionner la branche feature avec develop (_merged_). 
- La stratégie de fusionnage pour toutes les pull requests est le `Squash and merge`
- Structure de nom pour les branches de fonctionnalités : `feature/<description>`
- Finalement, lorsque la branche develop contient toutes les fonctionnalités désirées et qu'elles sont testées, une pull request sera créée et devra être validée par 4 membres avant de pouvoir fusionner develop avec la branche main. 
- Les commits dans la branche main ont un tag afin de facilement faire le suivi des versions. 
- Les demandes de changement / d'intégration (pull request / merge request) ont lieu à chaque fois qu'une fonctionnalité est prête à être intégrée à la branche develop et lorsque cette dernière est prête à être intégrée dans la branche main. Ces demandes sont faites sur la branche develop et main respectivement.

Sources:
- https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow
- https://www.atlassian.com/git/tutorials/making-a-pull-request
