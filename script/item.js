//========> Compte des articles dans le panier sur le header
let cartCount = document.getElementById("cart-count");
function saveCount() {
  sessionStorage.setItem("count", cartCount.textContent);
}
if (sessionStorage.getItem("count")) {
  cartCount.textContent = sessionStorage.getItem("count");
}
//========> Fetch l'article dans l'api
let item = sessionStorage.getItem("id");
async function askCam() {
  let promise = await fetch(
    "http://localhost:3000/api/cameras/" + JSON.parse(item)
  );
  let response = await promise.json();
  return response;
}
function convertCents(num) {
  let result = num / 100;
  return Math.round(result);
}
//========> Sauvegarde le panier dans sessionStorage
function saveCart() {
  sessionStorage.setItem("cartContent", JSON.stringify(cart));
}
//========> Récup le panier dans sessionStorage
function loadCart() {
  cart = JSON.parse(sessionStorage.getItem("cartContent"));
}
//========> Renvoi l'option choisie du select
function lensChoose(elt) {
  return elt.options[elt.selectedIndex].value;
}
//========> Crée les élements html du produit
const createHtmlForProduct = (product) => {
  let container = document.createElement("div");
  container.classList.add("col-12", "col-lg-8", "mx-auto");

  let card = document.createElement("div");
  card.classList.add("card", "shadow");

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  let title = document.createElement("h2");
  title.classList.add("h1");
  title.textContent = product.name;
  sessionStorage.setItem("name", product.name);
  cardBody.appendChild(title);

  let des = document.createElement("p");
  des.classList.add("card-text");
  des.textContent = product.description;
  cardBody.appendChild(des);

  let lensesText = document.createElement("h3");
  lensesText.classList.add("card-text", "h6");
  lensesText.textContent = "Choisissez votre lentille : ";
  cardBody.appendChild(lensesText);

  let selector = document.createElement("select");
  selector.id = "choices";
  selector.classList.add("selectpicker");
  cardBody.appendChild(selector);
  //========> boucle pour lentilles
  product.lenses.forEach((elt, i) => {
    let lenseChoice = document.createElement("option");
    (lenseChoice.textContent = elt), i;
    selector.appendChild(lenseChoice);
  });
  //========> Récup la lentille selectionnée dans sessionStorage
  sessionStorage.setItem("lens", lensChoose(selector));
  selector.addEventListener("change", function () {
    sessionStorage.setItem("lens", lensChoose(selector));
  });

  let euroPrice = document.createElement("button");
  euroPrice.classList.add("btn", "btn-primary", "m-1", "float-right");
  euroPrice.textContent = convertCents(product.price) + " €";
  sessionStorage.setItem("price", convertCents(product.price));
  euroPrice.disabled = true;
  cardBody.appendChild(euroPrice);

  let addToCart = document.createElement("button");
  addToCart.classList.add("btn", "btn-success", "m-1", "float-right");
  addToCart.role = "button";
  addToCart.textContent = "Ajouter au panier";
  cardBody.appendChild(addToCart);

  let img = document.createElement("img");
  img.classList.add("card-img-top");
  img.alt = product.name;
  img.src = product.imageUrl;
  sessionStorage.setItem("img", product.imageUrl);
  cardBody.appendChild(img);
  //========> Click Listener pour le bouton d'ajout au panier
  addToCart.addEventListener("click", function () {
    cart = [];
    let obj = {};
    obj.id = JSON.parse(item);
    obj.name = sessionStorage.getItem("name");
    obj.lens = sessionStorage.getItem("lens");
    obj.price = sessionStorage.getItem("price");
    obj.quantity = 1;
    cartCount.textContent++;
    saveCount();
    if (sessionStorage.getItem("cartContent") != null) {
      loadCart();
      let found = false;
      for (elt of cart) {
        if (elt.id === obj.id && elt.lens === obj.lens) {
          elt.quantity++;
          found = true;
          break;
        }
      }
      if (!found) {
        cart.push(obj);
      }
      saveCart();
    } else {
      cart.push(obj);
      saveCart();
    }
  });
  card.appendChild(cardBody);
  container.appendChild(card);
  document.getElementById("prod").appendChild(container);
};

//========> fetch l'article dans l'api
askCam().then(function (response) {
  createHtmlForProduct(response);
});
