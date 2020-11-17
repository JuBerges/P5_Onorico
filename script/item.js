let item = sessionStorage.getItem("id");
console.log(item);
async function askCam() {
  let promise = await fetch("http://localhost:3000/api/cameras" + "/" + item);
  let response = await promise.json();
  return response;
}
function convertCents(num) {
  let result = num / 100;
  return Math.round(result).toFixed(2) + " €";
}

function createHtmlForProduct(product) {
  let container = document.createElement("div");
  container.classList.add("col-12", "col-lg-6", "mx-auto");
  let card = document.createElement("div");
  card.classList.add("card", "shadow");
  let img = document.createElement("img");
  img.classList.add("card-img-top");
  img.alt = product.name;
  img.src = product.imageUrl;
  card.appendChild(img);
  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  let title = document.createElement("h2");
  title.textContent = product.name;
  cardBody.appendChild(title);
  let des = document.createElement("p");
  des.classList.add("card-text");
  des.textContent = product.description;
  cardBody.appendChild(des);
  let link = document.createElement("a");
  link.classList.add("btn", "btn-primary", "stretched-link");
  link.role = "button";
  link.href = "#";
  link.textContent = convertCents(product.price);
  cardBody.appendChild(link);
  card.appendChild(cardBody);
  container.appendChild(card);
  document.querySelector("#prod").appendChild(container);
}

//fetch index infos
askCam().then(function (response) {
  createHtmlForProduct(response);
});
