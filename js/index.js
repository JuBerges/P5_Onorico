//teddies
let tedImg = document.getElementById('tedImg');
let tedName = document.getElementById('tedName');
let tedDes = document.getElementById('tedDes');
let tedPrice = document.getElementById('tedPrice');
//Item page
let itemImg = document.getElementById('itemImg');
let itemName = document.getElementById('itemName');
let itemId = document.getElementById('itemId');
let itemDes = document.getElementById('itemDes');
let itemPrice = document.getElementById('itemPrice');

//functions for fetch request "à simplifier?"
async function askTed() {
  let promise = await fetch("http://localhost:3000/api/teddies")
  let response = await promise.json()
  return response
}
//fonction pour convertir le prix
  function convertCents(num) {
    let result = num / 100
    return Math.round(result).toFixed(2)+" €"
  };  
//functions for fetch request
  askTed().then(function(response) {
    tedImg1.src = response[0].imageUrl
    tedName1.innerHTML = response[0].name
    tedDes1.innerHTML = response[0].description
    tedPrice1.innerText = convertCents(response[0].price)

    tedImg2.src = response[1].imageUrl
    tedName2.innerHTML = response[1].name
    tedDes2.innerHTML = response[1].description
    tedPrice2.innerText = convertCents(response[1].price)

    tedImg3.src = response[2].imageUrl
    tedName3.innerHTML = response[2].name
    tedDes3.innerHTML = response[2].description
    tedPrice3.innerText = convertCents(response[2].price)

    tedImg4.src = response[3].imageUrl
    tedName4.innerHTML = response[3].name
    tedDes4.innerHTML = response[3].description
    tedPrice4.innerText = convertCents(response[3].price)

    tedImg5.src = response[4].imageUrl
    tedName5.innerHTML = response[4].name
    tedDes5.innerHTML = response[4].description
    tedPrice5.innerText = convertCents(response[4].price)
  });

//======================================================
//For item page

