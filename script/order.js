/*       
========>|======================================================|<========
========>|---FONCTIONS DE LA PAGE DE CONFIRMATION DE COMMANDE---|<========
========>|======================================================|<========
*/

//========> Récupe et affichage de l'order_id
const order = localStorage.getItem("orderRep");
document.getElementById("orderId").textContent = order;

const price = localStorage.getItem("totalPrice");
document.getElementById("totalPrice").textContent = price;
