let cartLog = sessionStorage.getItem("cartContent");
let emptyCart = document.getElementById("emptyCart");
emptyCart.addEventListener("click", function () {
  sessionStorage.removeItem("cartContent");
});
console.log(cartLog);
function getItemIdInStorage() {}
async function askCam() {
  let promise = await fetch("http://localhost:3000/api/cameras");
  let response = await promise.json();
  return response;
}
/*====================Voir pour monter un index id de cartLog avec fecth et la lentille en normal sans fetch==============*/
function createHtmlForCart(product) {
  let title = document.createElement("h2");
  title.textContent = product.name;
  let lensName = document.createElement("h3");

  let itemPrice = document.createElement("h3");

  document.getElementById("prod").appendChild(title);
  document.getElementById("prod").appendChild(lensName);
  document.getElementById("prod").appendChild(itemPrice);
}
askCam().then(function (response) {
  createHtmlForCart(response);
});
