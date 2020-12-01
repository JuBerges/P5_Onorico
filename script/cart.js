let cart = JSON.parse(sessionStorage.getItem("cartContent"));

function checkCart() {
  //<===================================================Check et mise à jour du panier
  if (!sessionStorage.getItem("cartContent")) {
    let cartEmpty = (document.getElementById("cartStatus").textContent =
      "Votre panier est vide");
    cart = null;
    $("#prod").empty();
    $("#table").empty();
    $("#total").empty();
    $("form").empty();
    console.log(cart);
    return cartEmpty;
  } else {
    let cartFilled = cart.forEach((product) => {
      createHtmlForCart(product);
    });
    return cartFilled;
  }
}
const totalSum = () => {
  //<=================================================Calcul du total des articles
  let total = 0;
  let sums = document.getElementsByClassName("total");
  for (sum of sums) {
    prices = sum.innerHTML;
    prices = parseInt(prices.substring(0, prices.length - 1));
    total = total + prices;
  }
  let sumOfAll = document.getElementById("total");
  sumOfAll.textContent = "Prix Total : " + total + " €";
};
const createHtmlForCart = (product) => {
  //<=================================================Créer le contenu du panier sur la page pour chaque article
  let tbody = document.getElementById("prod");
  let prodRow = document.createElement("tr");

  let tdName = document.createElement("td");
  tdName.textContent = product.name;
  prodRow.appendChild(tdName);

  let tdLens = document.createElement("td");
  tdLens.textContent = product.lens;
  prodRow.appendChild(tdLens);

  let tdPriceUnit = document.createElement("td");
  tdPriceUnit.textContent = product.price + " €";
  prodRow.appendChild(tdPriceUnit);

  let tdQuantity = document.createElement("td");
  let spanQuantity = document.createElement("span");
  spanQuantity.textContent = product.quantity;
  tdQuantity.appendChild(spanQuantity);

  let qtMinus = document.createElement("button");
  qtMinus.classList.add("btn", "btn-dark", "mx-1");
  //qtMinus.dataset.productName = product.name;<==========================A VIRER
  qtMinus.textContent = "-";
  tdQuantity.appendChild(qtMinus);
  qtMinus.addEventListener("click", function (e) {
    //let id = e.dataset.productName;<====================================A VIRER
    if (product.quantity > 0) {
      product.quantity--;
      tdPrice.textContent = product.price * product.quantity + " €";
      spanQuantity.textContent = product.quantity;
      totalSum();
    } else if (product.quantity < 1) {
      qtMinus.textContent = "x";
      e.target.closest("tr").remove();
    }
  });

  let qtPlus = document.createElement("button");
  qtPlus.classList.add("btn", "btn-dark");
  qtPlus.textContent = "+";
  tdQuantity.appendChild(qtPlus);
  qtPlus.addEventListener("click", function () {
    product.quantity++;
    spanQuantity.textContent = product.quantity;
    tdPrice.textContent = product.price * product.quantity + " €";
    totalSum();
  });

  prodRow.appendChild(tdQuantity);

  let tdPrice = document.createElement("td");
  tdPrice.textContent = product.price * product.quantity + " €";
  tdPrice.classList.add("total");
  prodRow.appendChild(tdPrice);

  tbody.appendChild(prodRow);

  //============================================================>>>>>   ___A___
  //FAIRE TABLE POUR LE PANIER==>ok                             >>>>>>  _SUPPR_
  //avec nom/lentilles/prix unitaire/ quantité/ prix total==>ok >>>>>>> ___A___
  //boutons plus et moins pour quantité==>ok                    >>>>>>> __LA___
  //prix total de tout en dessous==>ok                          >>>>>>  __FIN__
  //============================================================>>>>>   __!!!__
};
checkCart();

//====Empties the cart====
let emptyCart = document.getElementById("emptyCart");
emptyCart.addEventListener("click", function () {
  sessionStorage.removeItem("cartContent");
  $("#prod").empty();
  $("#table").empty();
  $("#total").empty();
  $("form").empty();
  checkCart();
});

//====Sums of All products in cart====
if (cart) {
  totalSum();
}
