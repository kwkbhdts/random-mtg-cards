const API_BASE_URL = "https://api.scryfall.com";
const RAMDOM_CARD_API_URL = `${API_BASE_URL}/cards/random`;
const CARDS_TO_GET = 10;

const wait = async (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function main() {
  let cards_element = document.getElementById("cards");
  for (let i = 0; i < CARDS_TO_GET; i++) {
    let randomCard = await requestRandomCard();
    cards_element.insertAdjacentHTML(
      "beforeend", createHtmlOfCard(randomCard))
    await wait(500);
  }
}

async function requestRandomCard() {
  const response = await fetch(createRequestUrl());
  const json = await response.json()
  return json
};

function createRequestUrl() {
  //const getParams = new URLSearchParams(window.location.search);
  return encodeURI(`${RAMDOM_CARD_API_URL}?q=f:standard`)
}

function createHtmlOfCard(card) {
  const cardPageUrl = card?.scryfall_uri;
  const cardImageUrl = card?.image_uris?.normal;
  const html = `
  <div class="card">
    <a href="${cardPageUrl}" target="_blank" rel="noopener noreferrer">
      <img src="${cardImageUrl}" />
    </a>
  </div>
  `
  return html
}

main();
