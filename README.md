# Scilab terminal for visual studio code

Cette extension pour Visual Studio Code permet aux utilisateurs d'exécuter facilement des scripts Scilab directement depuis l'éditeur, offrant une intégration fluide pour les développeurs et les scientifiques qui travaillent avec Scilab dans leur quotidien.

## Fonctionnalités

- **Exécution de scripts Scilab** : Exécutez rapidement vos scripts `.sce` avec un simple clic ou un raccourci clavier.
- **Prise en charge des chemins personnalisés de Scilab** : Configurez le chemin d'accès à votre installation Scilab selon vos besoins.

## Prérequis

Pour utiliser cette extension, vous devez avoir Scilab installé sur votre machine. Si ce n'est pas déjà fait, téléchargez et installez Scilab depuis [le site officiel de Scilab](https://www.scilab.org).

## Installation

Actuellement, l'extension doit être installée manuellement. Suivez ces étapes pour le faire :

1. Clonez le dépôt de l'extension sur votre machine locale.
2. Ouvrez le dossier de l'extension avec VS Code.
3. Exécutez `npm install` pour installer les dépendances nécessaires.
4. Exécutez `vsce package` pour créer le package de l'extension.
5. Dans VS Code, ouvrez l'onglet Extensions, cliquez sur `...` puis choisissez `Install from VSIX...` et sélectionnez le fichier `.vsix` généré.

## Configuration

Après l'installation, vous pouvez avoir besoin de configurer le chemin d'accès à Scilab pour que l'extension fonctionne correctement.

1. Ouvrez les Paramètres de VS Code (fichier `settings.json`).
2. Ajoutez la configuration suivante, en remplaçant `<chemin-vers-scilab>` par le chemin d'accès réel à votre exécutable Scilab (WScilex-cli.exe) :
```json
"scilabIntegration.scilabPath": "<chemin-vers-scilab>" //très souvent: C:/Program Files/scilab-2024.0.0/bin/WScilex-cli.exe
```
## Utilisation

Pour exécuter un script Scilab :

Ouvrez votre fichier .sce avec VS Code.
Cliquez avec le bouton droit de la souris sur le texte de l'éditeur et presser le bouton play en haut à droite de votre IDE, ou utilisez le raccourci clavier défini. La console de Scilab apparaitra dans le terminal intégrer de Visual studio code et vous pourrez désormais utiliser vscode comme outils principal de Scilab.

## Contribution

Les contributions à cette extension sont les bienvenues. Si vous avez des suggestions d'amélioration ou avez rencontré un bug, n'hésitez pas à ouvrir un issue ou une pull request sur le dépôt GitHub de l'extension.