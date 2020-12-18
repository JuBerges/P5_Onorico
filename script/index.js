/*        
========>|====================================|<========
========>|---FONCTIONS DE LA PAGE D'ACCUEIL---|<========
========>|====================================|<========
*/

//========> Supprime les données de la dernière commande finalisée
localStorage.removeItem("orderRep");
const apiUrl = "http://localhost:3000/api/cameras";

//========> fetch les articles dans l'api
async function askCam() {
  let promise = await fetch(apiUrl);
  let response = await promise.json();
  return response;
}

//========> Pour passer le prix de centimes à euro
function convertCents(num) {
  let result = num / 100;
  return result + " €";
}

//========> Compte les articles dans le panier et les affiche sur le header
function countArticleInCart() {
  let cartCount = document.getElementById("cart-count");
  let cartCountMin = document.getElementById("cart-count-min");
  if (localStorage.getItem("count")) {
    cartCount.textContent = localStorage.getItem("count");
    cartCountMin.textContent = localStorage.getItem("count");
  }
}
countArticleInCart();

//========> fonction pour créer les élements de produits dynamiquement
const createHtmlForProduct = (product) => {
  let container = document.createElement("div");
  container.classList.add("col-12", "col-lg-6");
  let card = document.createElement("div");
  card.classList.add("card", "shadow");
  let img = document.createElement("img");
  img.classList.add("card-img-top");
  img.alt = product.name;
  img.src = product.imageUrl;
  card.appendChild(img);
  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  let title = document.createElement("h2");
  title.textContent = product.name;
  cardBody.appendChild(title);
  let des = document.createElement("p");
  des.classList.add("card-text");
  des.textContent = product.description;
  cardBody.appendChild(des);
  let link = document.createElement("a");
  link.classList.add("btn", "btn-primary", "stretched-link");
  link.role = "button";
  link.href = "item.html";
  link.addEventListener("click", function () {
    localStorage.setItem("id", JSON.stringify(product._id));
  });
  link.textContent = convertCents(product.price);
  cardBody.appendChild(link);
  card.appendChild(cardBody);
  container.appendChild(card);
  document.getElementById("prod").appendChild(container);
};

//========> fetch et créer l'html pour chaque articles
function askAndCreate() {
  askCam().then(function (response) {
    response.forEach((product) => {
      createHtmlForProduct(product);
      console.log(product);
    });
  });
}
askAndCreate();
