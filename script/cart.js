let cartLog = document.getElementById("cartLog");
cartLog.innerHTML = sessionStorage.getItem("cartContent");
let emptyCart = document.getElementById("emptyCart");
emptyCart.addEventListener("click", function () {
  sessionStorage.removeItem("cartContent");
  cartLog.innerHTML = "";
});
