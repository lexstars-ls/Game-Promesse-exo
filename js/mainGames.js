import GAMES from "./games.js";

export function mainGame() {
    const templateHtml = document.querySelector('#gameTemplate');
    let cloneTemplate = document.importNode(templateHtml.content, true);
    let title = cloneTemplate.querySelector('h1');
    let sectionTitle = cloneTemplate.querySelector('h3');
    let lastSectionTitle = cloneTemplate.querySelector('h4');

    title.textContent = "Jeux Vidéo EGS l'actu au quotidien";
    sectionTitle.textContent = "Les derniers jeux notés";
    lastSectionTitle.textContent = "Les dernières news";

    templateHtml.appendChild(title);
    templateHtml.appendChild(sectionTitle);

    templateHtml.appendChild(lastSectionTitle);

    const gamePromise = new Promise(function (resolve, reject) {
        if (GAMES == undefined) {
            resolve(GAMES);
        } else {
            reject("error");
        }
    });

    gamePromise
        .then(function (games) {
            return games
        })
        .then(function (games) {

            const gameSection = cloneTemplate.querySelector('section');

            // Parcourir la liste des jeux
            for (let i = 0; i < games.length; i++) {
                const gameDiv = cloneTemplate.querySelector('div');
                const gameImage = cloneTemplate.querySelector('img');
                const gameName = cloneTemplate.querySelector('h2');
                const gameRate = cloneTemplate.querySelector('.etoile');

                // Assigner les valeurs
                gameImage.src = games[i].image;
                gameImage.alt = games[i].name;
                gameName.textContent = games[i].name;

                // rating de 0/5 avec img par def
                for (let j = 0; j < 5; j++) {
                    const star = document.createElement('img');
                    star.className ='starsImg';
                    star.src = j < games[i].rate ? "./img/star.png" : "./img/starEmpty.png";
                    gameRate.appendChild(star);
                }

                // Ajouter à la div principale puis à 
                gameDiv.appendChild(gameImage);
                gameDiv.appendChild(gameName);
                gameDiv.appendChild(gameRate);
                gameSection.appendChild(gameDiv);
            }
            const sectionTitle = document.querySelector('h3');
            sectionTitle.after(gameSection);

        })
        .catch(function (error) {
            console.error(error);
            const sectionTitle = document.querySelector('h3');
            const templateHtml = document.querySelector('#erreurTemplate');
            let cloneTemplate = document.importNode(templateHtml.content, true);
            let titleError = cloneTemplate.querySelector('p');

            titleError.textContent = "Accès aux jeux impossible";

            
            sectionTitle.after(cloneTemplate);
        });
        
}
