let item = sessionStorage.getItem("id");
async function askCam() {
  let promise = await fetch("http://localhost:3000/api/cameras/" + item);
  let response = await promise.json();
  return response;
}
function convertCents(num) {
  let result = num / 100;
  return Math.round(result).toFixed(2) + " €";
}
//========Renvoi l'option choisie du select
function lensChoose(elt) {
  return elt.options[elt.selectedIndex].value;
}
//=========================================
//Crée les élements html du produit========
function createHtmlForProduct(product) {
  let container = document.createElement("div");
  container.classList.add("col-12", "col-lg-8", "mx-auto");

  let card = document.createElement("div");
  card.classList.add("card", "shadow");

  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  let title = document.createElement("h2");
  title.classList.add("h1");
  title.textContent = product.name;
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
  //boucle pour lentilles
  product.lenses.forEach((elt, i) => {
    let lenseChoice = document.createElement("option");
    (lenseChoice.textContent = elt), i;
    selector.appendChild(lenseChoice);
  });
  //For lens sessionStorage
  let lens = lensChoose(selector);
  sessionStorage.setItem("lens", lensChoose(selector));
  selector.addEventListener("change", function () {
    sessionStorage.setItem("lens", lensChoose(selector));
  });

  let euroPrice = document.createElement("button");
  euroPrice.classList.add("btn", "btn-primary", "m-1", "float-right");
  euroPrice.textContent = convertCents(product.price);
  euroPrice.disabled = true;
  cardBody.appendChild(euroPrice);

  let addToCart = document.createElement("button");
  addToCart.classList.add("btn", "btn-success", "m-1", "float-right");
  addToCart.role = "button";
  addToCart.textContent = "Ajouter au panier";
  cardBody.appendChild(addToCart);
  //====================ICI=========================
  addToCart.addEventListener("click", function () {
    let cartContentOnPage = [sessionStorage.getItem("cartContent")];
    cartContentOnPage.push(
      sessionStorage.getItem("id") + "/" + sessionStorage.getItem("lens")
    );
    sessionStorage.setItem("cartContent", cartContentOnPage);
  });
  //=================================================
  let img = document.createElement("img");
  img.classList.add("card-img-top");
  img.alt = product.name;
  img.src = product.imageUrl;
  cardBody.appendChild(img);

  card.appendChild(cardBody);
  container.appendChild(card);
  document.getElementById("prod").appendChild(container);
}

//fetch index infos
askCam().then(function (response) {
  createHtmlForProduct(response);
});
