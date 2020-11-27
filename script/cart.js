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
  let title = document.createElement("h2");
  title.textContent = product.name;

  let lensName = document.createElement("h3");
  lensName.textContent = product.lens;

  let itemPrice = document.createElement("h4");
  itemPrice.textContent = product.price;

  let quantity = document.createElement("h4");
  quantity.textContent = product.quantity;

  document.getElementById("prod").appendChild(title);
  document.getElementById("prod").appendChild(lensName);
  document.getElementById("prod").appendChild(itemPrice);
  document.getElementById("prod").appendChild(quantity);
}
checkCart();

//====Empties the cart====
let emptyCart = document.getElementById("emptyCart");
emptyCart.addEventListener("click", function () {
  sessionStorage.removeItem("cartContent");
  $("#prod").empty();
  checkCart();
});
