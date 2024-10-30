# Journal Intime & Messages Chiffrés
Ce projet est une application React qui permet aux utilisateurs d'écrire des messages personnels dans un journal intime, de les crypter et de les sceller avec un mot de passe et de les déchiffrer, avec ce même mot de passe, pour les lire. Les utilisateurs peuvent également modifier ou supprimer leurs messages en saisissant le mot de passe associé.

# Fonctionnalités
- Ajout d'un message chiffré : Les utilisateurs peuvent écrire un nouveau message dans le journal, entrer un mot de passe pour le chiffrer et l'enregistrer.
- Décryptage des messages : Les messages enregistrés sont cachés par défaut. Pour les lire, l'utilisateur doit entrer le mot de passe correct.
- Modification d'un message : Les utilisateurs peuvent déchiffrer un message, le modifier et le rechiffrer avec un nouveau mot de passe si souhaité.
Suppression sécurisée d'un message : Lors de la suppression d'un message, une popup de confirmation s'affiche. L'utilisateur doit entrer le mot de passe associé au message pour le supprimer définitivement.

# Structure du Projet
- App.tsx : Composant racine gérant les entrées et leur état global.
- Journal.tsx : Composant pour ajouter ou modifier des messages chiffrés. Gère l'entrée du texte et du mot de passe.
- Messages.tsx : Composant pour afficher, déchiffrer, modifier ou supprimer des messages.
- crypto.ts : Utilitaires de chiffrement et déchiffrement des mots de passe.
- Tests : Chaque composant dispose de tests pour vérifier le fonctionnement des fonctionnalités clés, comme le décryptage, la modification, la suppression avec mot de passe, etc.
  
# Installation
- Clonez le dépôt 

*git clone https://github.com/elisalenotre/algojs-ecv.git*

*cd votre-repo*

- Installez les dépendances 

*npm install*

- Lancez l'application

*npm start*

L'application sera accessible sur http://localhost:3000.

# Tests
- Pour exécuter les tests

*npm test*

# Dépendances principales
- React : Bibliothèque JavaScript pour la création d'interfaces utilisateur.
- CryptoJS : Librairie pour le chiffrement AES des mots de passe.
- @testing-library/react : Utilisée pour tester les composants React de manière unitaire.

# Utilisation
- Ajouter un message : Dans le journal, entrez votre message et un mot de passe pour le chiffrer. Cliquez sur Ajouter pour enregistrer.
- Déchiffrer un message : Entrez le mot de passe pour déverrouiller le message.
- Modifier un message : Déchiffrez le message, puis cliquez sur Modifier pour mettre à jour le texte ou le mot de passe.
- Supprimer un message : Déchiffrez le message, cliquez sur Supprimer, confirmez en saisissant le mot de passe dans la popup, puis validez.

# Améliorations futures
- Sauvegarde des messages : Ajouter une fonctionnalité pour enregistrer les messages localement ou dans une base de données.
- Réinitialisation du mot de passe : Permettre aux utilisateurs de réinitialiser le mot de passe de leurs messages.
- Sécurité avancée : Chiffrer également les messages eux-mêmes et pas seulement le mot de passe.

# Auteurs
- Noé Ledoux
- Elisa Lenôtre

