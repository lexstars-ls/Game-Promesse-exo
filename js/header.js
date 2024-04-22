import GAMES from "./games.js";

export function header() {
    const headerPromise = new Promise(function (resolve, reject) {
        if (GAMES !== undefined) {
            resolve(GAMES);
        } else {
            reject("error");
        }
    });

    headerPromise.then(function (games) {
        return games.length;
    })
        .then(function (gameLength) {
            console.log(` Il y a ${gameLength} jeux`);
        })
        .catch(function (error) {
            console.error(error);
        });


    const body = document.querySelector('body');
    const templateHtml = document.querySelector('#header-template');
    let cloneTemplate = document.importNode(templateHtml.content, true);
    let title = cloneTemplate.querySelector('h1');
    let sectionTitle = cloneTemplate.querySelector('h3');
    let lastSectionTitle = cloneTemplate.querySelector('h4');


    title.textContent = "Jeux Vidéo EGS l'actu au quotidien";
    sectionTitle.textContent = "Les derniers jeux notés";
    lastSectionTitle.textContent = "Les dernières news";

    const headerSection = cloneTemplate.querySelector('section');

    // Parcourir la liste des jeux
    for (let i = 0; i < GAMES.length; i++) {

        const gameDiv = cloneTemplate.querySelector('div');
        const gameImage = cloneTemplate.querySelector('img');
        const gameName = cloneTemplate.querySelector('h2');
        const gameRate = cloneTemplate.querySelector('.etoile');

        // Assigner les valeurs
        gameImage.src = GAMES[i].image;
        gameImage.alt = GAMES[i].name;
        gameName.textContent = GAMES[i].name;

        // rating de 0/5 aveci mg par def
        for (let j = 0; j < 5; j++) {
            const star = document.createElement('img');
            star.src = j < GAMES[i].rate ? "./img/star.png" : "./img/starEmpty.png";
            gameRate.appendChild(star);
        }

        // Ajouter a la div principal puis a header
        gameDiv.appendChild(gameImage);
        gameDiv.appendChild(gameName);
        gameDiv.appendChild(gameRate)


        headerSection.appendChild(gameDiv);

    }

    body.appendChild(cloneTemplate);
}
