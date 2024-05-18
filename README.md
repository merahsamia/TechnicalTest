Guide d'installation et d'utilisation:
Ce dépôt contient le code source pour le test technique.

Avant de commencer, assurez-vous d'avoir installé WAMP (ou tout autre serveur web tel que MAMP pour macOS ou LAMP pour Linux) pour exécuter l'application localement.

Installation

Cloner le dépôt dans le dossier www (pour wamp) :

> git clone https://github.com/merahsamia/TechnicalTest

Accéder au répertoire cloné :

> cd TechnicalTest

Installer les dépendances PHP avec Composer :

> composer install

Installer les dépendances JavaScript avec npm :

> npm install

Copier le fichier d'environnement exemple et le renommer :

> copy .env.example .env

Générer une clé d'application Laravel :

> php artisan key:generate

Ouvrir le fichier .env:

Remplacer DB_CONNECTION=sqllite par DB_CONNECTION=mysql

Décommenter le reste des lignes relatives à la bd et créér votre propre bdd sur phpmyadmin:

DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=votrebdd
DB_USERNAME=root
DB_PASSWORD=

Effectuer les migrations de la base de données :

> php artisan migrate

Remplir la base de données avec des données de test :

> php artisan db:seed

Compiler les ressources frontales :

> npm run dev

Démarrer le serveur de développement :

  php artisan serve

Utilisation:

Une fois le serveur de développement démarré, vous pouvez accéder à l'application à l'adresse indiquée par Laravel, par défaut http://localhost:8000. 
