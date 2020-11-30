let cart = JSON.parse(sessionStorage.getItem("cartContent"));

function checkCart() {
  if (!sessionStorage.getItem("cartContent")) {
    let cartEmpty = (document.getElementById("cartStatus").textContent =
      "Votre panier est vide");
    cart = null;
    console.log(cart);
    return cartEmpty;
  } else {
    let cartFilled = cart.forEach((product) => {
      createHtmlForCart(product);
    });
    return cartFilled;
  }
}

function createHtmlForCart(product) {
  let tbody = document.getElementById("prod");
  let prodRow = document.createElement("tr");

  let tdName = document.createElement("td");
  tdName.textContent = product.name;
  prodRow.appendChild(tdName);

  let tdLens = document.createElement("td");
  tdLens.textContent = product.lens;
  prodRow.appendChild(tdLens);

  let tdPriceUnit = document.createElement("td");
  tdPriceUnit.textContent = product.price;
  prodRow.appendChild(tdPriceUnit);

  let tdQuantity = document.createElement("td");
  tdQuantity.textContent = product.quantity;
  prodRow.appendChild(tdQuantity);

  let tdPrice = document.createElement("td");
  tdPrice.textContent =
    product.price.substring(0, product.price.length - 1) * product.quantity +
    "€";
  prodRow.appendChild(tdPrice);

  tbody.appendChild(prodRow);

  //============================================================
  //FAIRE UN TABLE POUR LE PANIER
  //avec nom/lentilles/prix unitaire/ quantité/ prix total
  //boutons plus et moins pour quantité
  //prix total de tout en dessous
  //============================================================
}
checkCart();

//====Empties the cart====
let emptyCart = document.getElementById("emptyCart");
emptyCart.addEventListener("click", function () {
  sessionStorage.removeItem("cartContent");
  $("#prod").empty();
  checkCart();
});
