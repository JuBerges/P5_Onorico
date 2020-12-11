//========> Récupe et affichage de l'order_id
let order = localStorage.getItem("orderRep");
document.getElementById("orderId").textContent = order;
let price = localStorage.getItem("totalPrice");
document.getElementById("totalPrice").textContent = price;
