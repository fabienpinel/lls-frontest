# Front end technical test for LLS
## To run the project:

- `cd lls-frontend`

- `npm install`

- `npm start`

## To test:

- `npm test`

## Libraries used:

- React JS - https://reactjs.org

- Jest for unit testing - https://facebook.github.io/jest/ (and Babel to make it work properly :( )

- Material UI for UI components - http://www.material-ui.com/

- react-flexbox-grid for easy grid layout - http://roylee0704.github.io/react-flexbox-grid/

## Détails
Je suis parti du template create-react-app.

Le fichier App.test.js réalise quelques tests unitaires sur les opérations principales opérées sur la liste d'étudiants (Add, edit, delete).

Concernant les choix UX, j'ai pensé important d'avoir au moins 2 types d'affichages: liste pour la vue d'ensemble et la recherche par prénom/nom facile Ainsi qu'un affichage par photo car la représentation par photo de profile est importante pour une classe. Les 2 affichages permettent les mêmes actions sur les étudiants. Le slider pour jouer sur la taille des photos étant primordial à mon avis pour laisser à l'utilisateur le choix de sa granularité.

Dans les itérations suivantes j'aurais notamment:
- Ajouté des actions groupées notamment sur l'affichage en liste (supprimer des étudiants). Le tableau utilisé permet la selection de ligne, plusieurs lignes en même temps.

- Fait plus de vérifications et gestions d'erreurs sur les formulaires. 

- Evité la superposition de modale quand on fait delete depuis la modal d'édition

- Mieux découpé Classroom en sous composants (Tel qu'il est il a du sens fonctionnellement mais pourrait être réduit en taille)

- Ajouté un champ de recherche pour filtrer les étudiants

- Etc.
