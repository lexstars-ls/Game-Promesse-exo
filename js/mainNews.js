import NEWS from "./news";

export function mainNews() {
    const newsPromise = new Promise(function (resolve, reject) {
        if (NEWS == undefined) {
            resolve(NEWS);
            console.log('news disponible');
        } else {
            reject("error");
            console.log('news indisponible');
        }
    });

    newsPromise
        .then(function (news) {
            console.log(news);

            // Parcourir la liste des news
            for (let i = 0; i < news.length; i++) {
                const templateHtml = document.querySelector('#newsTemplate');
                let cloneTemplate = document.importNode(templateHtml.content, true);

                const newsSection = cloneTemplate.querySelector('section');
                const newsArticle = cloneTemplate.querySelector('article');
                const newsTexte = cloneTemplate.querySelector('p');
                const newsTitle = cloneTemplate.querySelector('h4');
                const newsAuthor = cloneTemplate.querySelector('h5');
                const newsImage = cloneTemplate.querySelector('img');

                // Assigner les valeurs
                newsTexte.textContent = news[i].content;
                newsImage.src = news[i].image;
                newsImage.alt = news[i].alt;

                // Ajouter des éléments clonés à la structure HTML existante dans le main
                document.querySelector('main').appendChild(cloneTemplate);
            }
        })
        .catch(function (error) {
            console.error(error);
            const errorTemplate = document.querySelector('#erreurTemplate');
            let errorClone = document.importNode(errorTemplate.content, true);
            const errorMessage = errorClone.querySelector('p');
            errorMessage.textContent = "Une erreur est survenue lors du chargement des news.";

            // Ajouter l'élément d'erreur à la structure HTML existante dans le main
            document.querySelector('main').appendChild(errorClone);
        });
}
