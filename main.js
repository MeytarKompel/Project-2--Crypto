const crypto = document.getElementById("mainBox");

const liveCoinsToShow = [];
const coinsCache = {};
let cryptoArray = [];
const loadSpinner = document.getElementById("loaderContainer");

// Fetching API and show all crypto coins
fetch(`https://api.coingecko.com/api/v3/coins/`, {
  method: "GET",
})
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    cryptoArray = res;
    loadSpinner.classList.add("hidden");
    const htmlCards = res.map(
      (i) =>
        `<div id="cryptoCurrencyCard" class="card" style="width: 18rem;">
          <div class="card-body">
          <div class="form-check form-switch">
             <input onclick="addToggledCoins('${i.symbol}', '${i.id}')" class="form-check-input" type="checkbox" role="switch" id="toggleCheck${i.id}" aria-checked="false">
             <label class="form-check-label" for="toggleCheck${i.id}"></label>
           </div>
            <h5 class="card-title">${i.symbol}</h5>
            <p class="card-text">${i.id}</p>
            <button onclick="moreInfoData('${i.id}', '${i.symbol}')" class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#${i.symbol}" aria-expanded="false" aria-controls="${i.symbol}">
              More Info
            </button>
            <div class="collapse" id="${i.symbol}"></div>
          </div>
       </div>`
    );
    document.getElementById("mainBox").innerHTML = htmlCards.join("");
  });

// Fetching coins and show the relevant info by clicking "More Info" button
function moreInfoData(id, symbol) {
  console.log(id, symbol);
  loadSpinner.classList.remove("hidden");

  const cryptoUrlData = `https://api.coingecko.com/api/v3/coins/${id}`;
  fetch(cryptoUrlData)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      loadSpinner.classList.add("hidden");
      const cryptoData = `<div class="card card-body">
        <img class="cryptoImage" src="${res.image.small}">
        </br>
        <p>USD: ${res.market_data.current_price.usd}$</p>
        </br>
        <p>EUR: ${res.market_data.current_price.eur}€</p>
        </br>
        <p>ILS: ${res.market_data.current_price.ils}₪</p>
      </div>`;
      console.log(cryptoData);
      console.log(symbol);

      if (coinsCache[id]) {
        console.log("cache", coinsCache[id]);
      } else {
        console.log("api", res);
        coinsCache[id] = res;
        setTimeout(() => delete coinsCache[id], 120000);
      }

      console.log(coinsCache);

      document.getElementById(symbol).innerHTML = cryptoData;
    });
}

//Toggeled Coins
function addToggledCoins(symbol, id) {
  console.log(symbol);
  checkCoinsArray(liveCoinsToShow, symbol, id);
  console.log(liveCoinsToShow);
}

function checkCoinsArray(liveCoinsToShow, symbol, id) {
  const toggleCheck = document.getElementById(`toggleCheck${id}`);
  const coin = {
    id,
    symbol,
  };
  console.log(coin);
  if (toggleCheck.getAttribute("aria-checked") == "false") {
    if (liveCoinsToShow.length > 4) {
      showModal(liveCoinsToShow, coin);
      return;
    }
    liveCoinsToShow.push(coin);
    toggleCheck.setAttribute("aria-checked", "true");
  } else {
    const coinsIndex = liveCoinsToShow.indexOf(coin);
    liveCoinsToShow.splice(coinsIndex, 1);
    toggleCheck.setAttribute("aria-checked", "false");
  }
}

// Toggled coins modal
const modalBody = document.getElementById("modalBody");

var exmpModal = new bootstrap.Modal(document.getElementById("coinsModal"));

function showModal(liveCoinsToShow) {
  console.log(liveCoinsToShow);
  liveCoinsToShow.map((i) => {
    modalBody.innerHTML += `<div id="cryptoCurrencyCard" class="card" style="width: 18rem;">
      <div class="card-body">
      <div class="form-check form-switch">
        <input onclick="addToggledCoins('${i.symbol}', '${i.id}')" class="form-check-input" type="checkbox" role="switch" id="toggleCheck${i.id}" aria-checked="true" checked>
        <label class="form-check-label" for="toggleCheck${i.id}"></label>
      </div>
      <h5 class="card-title">${i.symbol}</h5>
      <p class="card-text">${i.id}</p>
      <button onclick="moreInfoData('${i.id}', '${i.symbol}')" class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#${i.symbol}" aria-expanded="false" aria-controls="${i.symbol}">
        More Info
      </button>
      <div class="collapse" id="${i.symbol}"></div>
      </div>
    </div>`;

    exmpModal.toggle();
  });
}

// Searching for specific coin
function searchCoin() {
  const coinToSearch = coinSearch.value;
  const foundedCoin = cryptoArray.find((coin) => coin.symbol === coinToSearch);
  console.log(foundedCoin);
  const coinToShow = "";
  coinToShow.innerHTML += `<div id="cryptoCurrencyCard" class="card" style="width: 18rem;">
  <div class="card-body">
  <div class="form-check form-switch">
     <input onclick="addToggledCoins('${foundedCoin.symbol}', '${foundedCoin.id}')" class="form-check-input" type="checkbox" role="switch" id="toggleCheck${foundedCoin.id}" aria-checked="false">
     <label class="form-check-label" for="toggleCheck${foundedCoin.id}"></label>
   </div>
    <h5 class="card-title">${foundedCoin.symbol}</h5>
    <p class="card-text">${foundedCoin.id}</p>
    <button onclick="moreInfoData('${foundedCoin.id}', '${foundedCoin.symbol}')" class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#${foundedCoin.symbol}" aria-expanded="false" aria-controls="${foundedCoin.symbol}">
      More Info
    </button>
    <div class="collapse" id="${foundedCoin.symbol}"></div>
  </div>
</div>`;
}

function closeModal(){

}