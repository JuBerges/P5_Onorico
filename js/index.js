//functions for fetch request "à simplifier?"
async function askCam() {
  let promise = await fetch("http://localhost:3000/api/cameras");
  let response = await promise.json();
  return response;
}
//fonction pour convertir le prix
function convertCents(num) {
  let result = num / 100;
  return Math.round(result).toFixed(2) + " €";
}
//functions for fetch request
askCam().then(function (response) {
  camImg1.src = response[0].imageUrl;
  camName1.innerHTML = response[0].name;
  camDes1.innerHTML = response[0].description;
  camPrice1.innerText = convertCents(response[0].price);

  camImg2.src = response[1].imageUrl;
  camName2.innerHTML = response[1].name;
  camDes2.innerHTML = response[1].description;
  camPrice2.innerText = convertCents(response[1].price);

  camImg3.src = response[2].imageUrl;
  camName3.innerHTML = response[2].name;
  camDes3.innerHTML = response[2].description;
  camPrice3.innerText = convertCents(response[2].price);

  camImg4.src = response[3].imageUrl;
  camName4.innerHTML = response[3].name;
  camDes4.innerHTML = response[3].description;
  camPrice4.innerText = convertCents(response[3].price);

  camImg5.src = response[4].imageUrl;
  camName5.innerHTML = response[4].name;
  camDes5.innerHTML = response[4].description;
  camPrice5.innerText = convertCents(response[4].price);
});

//======================================================
//For item page
