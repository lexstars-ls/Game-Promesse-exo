import NEWS from "./news";

export function mainNews() {
    const templateHtml = document.querySelector('#newsTemplate');
    let cloneTemplate = document.importNode(templateHtml.content, true);

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

            for (let i = 0; i < news.length; i++) {
                // Sélectionner les éléments à l'intérieur du template cloné pour cette nouvelle
                const newsSection = cloneTemplate.querySelector('section');
                newsSection.classList.add("imageArticleContainer");

                const newsArticle = cloneTemplate.querySelector('article');
                // ajt de class pour le css
                if (i === 0 || i === news.length - 1) {
                  
                    newsArticle.classList.add("articleGauche");
                }else{
                    newsArticle.classList.add("articleDroite");
                }
                
                
               
                const newsTexte = cloneTemplate.querySelector('p');
                const newsTitle = cloneTemplate.querySelector('h4');
                const newsAuthorAndDate = cloneTemplate.querySelector('h5');
                const newsImage = cloneTemplate.querySelector('img')
                // Assigner les valeurs
                newsTexte.textContent = news[i].content;
                newsTitle.textContent = news[i].title;
                newsImage.src = news[i].image;

                const authorAndDate = `${news[i].author} - ${news[i].date}`;
                newsAuthorAndDate.textContent = authorAndDate;

                newsArticle.appendChild(newsTitle);
                newsArticle.appendChild(newsTexte);
                newsArticle.appendChild(newsAuthorAndDate);

                newsSection.appendChild(newsImage);
                newsSection.appendChild(newsArticle);
                

            //   templateHtml.appendChild(newsSection);

                const main = document.querySelector('main');
                main.append(newsSection);
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

