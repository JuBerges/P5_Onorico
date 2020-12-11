//========> Stocke les ids produits pour post
let products = [];
//========> Récup des articles dans localStorage
let cart = JSON.parse(localStorage.getItem("cartContent"));
//========> Compte des articles dans le panier sur le header
let cartCount = document.getElementById("cart-count");
let cartCountMin = document.getElementById("cart-count-min");
function checkCartCount() {
  if (localStorage.getItem("count")) {
    cartCount.textContent = localStorage.getItem("count");
    cartCountMin.textContent = localStorage.getItem("count");
  }
}
checkCartCount();
//========> Check et mise à jour du panier
function checkCart() {
  if (!localStorage.getItem("cartContent")) {
    let cartEmpty = (document.getElementById("cartStatus").textContent =
      "Votre panier est vide");
    cart = null;
    document
      .getElementById("prod_container")
      .removeChild(document.getElementById("table"));
    document
      .getElementById("total_container")
      .removeChild(document.getElementById("total"));
    document
      .getElementById("form_container")
      .removeChild(document.getElementById("form"));
    document
      .getElementById("emptycart_container")
      .removeChild(document.getElementById("emptyCart"));
    document.getElementById("fixfooter").classList.add("fixed-bottom");
    return cartEmpty;
  } else {
    let cartFilled = cart.forEach((product) => {
      createHtmlForCart(product);
      products.push(product.id);
    });
    return cartFilled;
  }
}
//========> Calcul du total des articles
const totalSum = () => {
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
//========> Créer le contenu du panier sur la page pour chaque article
const createHtmlForCart = (product) => {
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

  //========> Pour diminuer la quantité
  let qtMinus = document.createElement("button");
  qtMinus.classList.add("btn", "btn-sm", "btn-dark");
  qtMinus.textContent = "-";
  tdQuantity.appendChild(qtMinus);
  qtMinus.addEventListener("click", function (e) {
    if (product.quantity === 1) {
      qtMinus.title = "Supprimer l'article du panier";
      qtMinus.textContent = "X";
      qtMinus.classList.remove("btn-dark");
      qtMinus.classList.add("btn-danger");
    }
    if (product.quantity > 0) {
      product.quantity--;
      cartCount.textContent--;
      cartCountMin.textContent--;
      tdPrice.textContent = product.price * product.quantity + " €";
      spanQuantity.textContent = product.quantity;
      totalSum();
    } else {
      e.target.closest("tr").remove();
    }
  });
  //========> Pour augmenter la quantité
  let qtPlus = document.createElement("button");
  qtPlus.classList.add("btn", "btn-sm", "btn-dark");
  qtPlus.textContent = "+";
  tdQuantity.appendChild(qtPlus);
  qtPlus.addEventListener("click", function () {
    if (product.quantity === 0) {
      qtMinus.classList.remove("btn-danger");
      qtMinus.classList.add("btn-dark");
      qtMinus.title = "";
      qtMinus.textContent = "-";
    }
    product.quantity++;
    cartCount.textContent++;
    cartCountMin.textContent++;
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
};
checkCart();

//========> Vide le panier
let emptyCart = document.getElementById("emptyCart");
emptyCart.addEventListener("click", function () {
  cartCount.textContent = 0;
  cartCountMin.textContent = 0;
  localStorage.clear();
  document
    .getElementById("prod_container")
    .removeChild(document.getElementById("table"));
  document
    .getElementById("total_container")
    .removeChild(document.getElementById("total"));
  document
    .getElementById("form_container")
    .removeChild(document.getElementById("form"));
  document
    .getElementById("emptycart_container")
    .removeChild(document.getElementById("emptyCart"));
  document.getElementById("fixfooter").classList.add("fixed-bottom");
  checkCart();
});

//========> Fait le total de tout les articles du panier
function checkCartForSum() {
  if (cart) {
    totalSum();
  }
  console.log(cart);
}
checkCartForSum();
//========> Validation formulaire
window.addEventListener(
  "load",
  function () {
    // Fetch les forms
    var forms = document.getElementsByClassName("needs-validation");
    // Loop sur les forms et bloque submit
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          event.preventDefault();
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            //========> Actions du btn commander
            submitOrder().then(function (response) {
              console.log(response);
              localStorage.clear();
              localStorage.setItem(
                "totalPrice",
                document.getElementById("total").textContent
              );
              checkCart();
              localStorage.setItem("orderRep", response.orderId);
              document.location = "order.html";
            });
          }
          form.classList.add("was-validated");
        },
        false
      );
    });
  },
  false
);
//========> fetch(post) le panier et formulaire validé
async function submitOrder() {
  //========> Crée l'objet contact pour post
  let contact = {
    firstName: document.getElementById("firstname").value,
    lastName: document.getElementById("lastname").value,
    address: document.getElementById("address").value,
    city: document.getElementById("city").value,
    email: document.getElementById("email").value,
  };
  let options = {
    method: "POST",
    body: JSON.stringify({
      contact: contact,
      products: products,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    mode: "cors",
  };
  let promise = await fetch("http://localhost:3000/api/cameras/order", options);
  let response = await promise.json();
  return response;
}
if (!cart) {
  document.getElementById("fixfooter").classList.add("fixed-bottom");
}
