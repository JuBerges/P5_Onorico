//========> Récupe et affichage de l'order_id
let order = sessionStorage.getItem("orderRep");
document.getElementById("orderId").textContent = order;
