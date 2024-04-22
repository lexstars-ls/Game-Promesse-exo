import GAMES from "./games.js";

export function header() {
    const body = document.querySelector('body');
    const templateHtml = document.querySelector('#header-template');
    let cloneTemplate = document.importNode(templateHtml.content, true);
    let title = cloneTemplate.querySelector('h1');
    let sectionTitle = cloneTemplate.querySelector('h3');

    title.textContent = "Jeux Vidéo EGS l'actu au quotidien";
    sectionTitle.textContent = "Les derniers jeux notés";

    const headerSection = cloneTemplate.querySelector('section');

    // Parcourir la liste des jeux
    for (let i = 0; i < 3; i++) {
       // Créer une div pour l'image et le nom du jeu
       const gameDiv = cloneTemplate.querySelector('div');
       const gameImage = cloneTemplate.querySelector('img');
       const gameName =cloneTemplate.querySelector('h2');

       // Assigner les valeurs
       gameImage.src = GAMES[i].image;
       gameImage.alt = GAMES[i].name;
       gameName.textContent = GAMES[i].name;

       // Ajouter la div à la section principale du header
       gameDiv.appendChild(gameImage);
       gameDiv.appendChild(gameName);

       headerSection.appendChild(gameDiv);
   }

    body.appendChild(cloneTemplate);
}
