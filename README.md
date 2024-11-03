# Lancer le projet en local 
- Installer la dernière version stable de node https://nodejs.org/en/download/package-manager (LTS)
- Cloner ce repo
```
git clone https://github.com/julie-nguyen-projects/egtf.git
cd egtf 
```
- Créer un dossier uploads à la racine du projet
- Installer MySQL : https://dev.mysql.com/downloads/mysql/
- Installer si besoin une interface pour interagir avec MySQL (ex: PHPMyAdmin ou MySQL Workbench)
- Créer une base de données localement
- Créer un fichier .env à la racine du projet avec les valeurs correspondant à votre configuration :
```
PORT=3000
DATABASE_HOST=
DATABASE_NAME=
DATABASE_USER=
DATABASE_PASSWORD=
```

- Dans le dossier du projet, dans le terminal, exécuter la commande suivante :
`npm install`

# Visualiser le site
- Dans le dossier du projet, dans le terminal, exécuter la commande :
> npm start
- Vous pouvez consulter le site sur l'URL : 
- http://localhost:3000/

# Développer une feature avec GIT
## Commandes de bases de GIT
- https://www.atlassian.com/git/glossary#commands

## Étapes à suivre
- Se mettre sur la branche master
- Vérifier qu'on est à jour (git pull)
- Checkout vers une nouvelle branche (git checkout NouvelleBranche)
- Coder sur cette NouvelleBranche
- Commit régulièrement avec des messages clairs si possible

## Si on est 2 ou + à coder sur la même branche
- TOUS LES JOURS, se synchroniser avec ce que les autres ont push sur la NouvelleBranche (git pull --rebase). Résolvez les éventuels conflits.

## Si vous développez seule sur NouvelleBranche
- TOUS LES JOURS, merci de vérifier que vous êtes à jour avec master (git fetch), PUIS rebase sur votre branche. Résolvez les éventuels conflits

## Quand le développement est fini
- Quand c'est fini, merci de vérifier que vous êtes à jour avec master (git fetch), PUIS rebase sur votre branche. Résolvez les éventuels conflits
- Merci d'utiliser l'interface de github pour faire une Pull Request (de préférence je préfère les accepter moi-même)
- ATTENTION, si vous acceptez une PR, merci d'utiliser l'option de REBASE plutôt que le MERGE

## Documentation utile sur pourquoi je ne veux que des REBASE et non des MERGE
Je suis sympa, je l'ai trouvée en FR :) 
- https://www.miximum.fr/blog/git-rebase/
