
let tedImg = document.getElementById('tedImg');
let tedName = document.getElementById('tedName');
let tedDes = document.getElementById('tedDes');
let tedPrice = document.getElementById('tedPrice');
let camImg = document.getElementById('camImg');
let camName = document.getElementById('camName');
let camDes = document.getElementById('camDes');
let camPrice = document.getElementById('camPrice');
let furImg = document.getElementById('furImg');
let furName = document.getElementById('furName');
let furDes = document.getElementById('furDes');
let furPrice = document.getElementById('furPrice');

//functions for fetch request "à simplifier"
async function askTed() {
  let promise = await fetch("http://localhost:3000/api/teddies")
  let response = await promise.json()
  return response
}
async function askCam() {
    let promise = await fetch("http://localhost:3000/api/cameras")
    let response = await promise.json()
    return response
  }
  async function askFur() {
    let promise = await fetch("http://localhost:3000/api/furniture")
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
    tedImg.src = response[0].imageUrl
    tedName.innerHTML = response[0].name
    tedDes.innerHTML = response[0].description
    tedPrice.innerText = convertCents(response[0].price);
  });
  askCam().then(function(response) {
    camImg.src = response[0].imageUrl
    camName.innerHTML = response[0].name
    camDes.innerHTML = response[0].description
    camPrice.innerText = convertCents(response[0].price) 
  });
  askFur().then(function(response) {
    furImg.src = response[0].imageUrl
    furName.innerHTML = response[0].name
    furDes.innerHTML = response[0].description  
    furPrice.innerText = convertCents(response[0].price)
  });
