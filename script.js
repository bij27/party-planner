/**
 * @typedef Party
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {string} date
 * @property {string} location
 */

// === Constants ===
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2508-FTB-ET-WEB-FT";
const RESOURCE = "/events";
const API = BASE + COHORT + RESOURCE;

// === State ===
let parties = [];
let selectedParty;

async function getParties() {
  try {
    const res = await fetch(API);
    const json = await res.json();
    parties = json.data;
  } catch (err) {
    console.error("Error fetching parties:", err);
  }
}

async function getParty(id) {
  try {
    const res = await fetch(`${API}/${id}`);
    const json = await res.json();
    selectedParty = json.data;
    render();
  } catch (err) {
    console.error(err);
  }
}

function PartyListItem(party) {
  const $li = document.createElement("li");
  $li.innerHTML = `
  <a href="#selected">${party.name}</a>`;
  $li.addEventListener("click", async function () {
    await getParty(party.id);
    console.log(selectedParty);
  });
  return $li;
}

function PartyList() {
  const $ul = document.createElement("ul");
  $ul.classList.add("lineup");
  const $parties = parties.map(PartyListItem);
  $ul.replaceChildren(...$parties);
  return $ul;
}

function PartyDetails() {
  if (!selectedParty) {
    const $p = document.createElement("p");
    $p.textContent = "Select an event to learn more!";
    return $p;
  }
  const $section = document.createElement("section");
  $section.classList.add("party");
  $section.innerHTML = `
  <h3>${selectedParty.name} ${selectedParty.id}</h3>
  <figure>
    <p>${selectedParty.location} ${selectedParty.date}</p>
  </figure>
  <p>${selectedParty.description}</p>
  `;
  return $section;
}

function render() {
  const $app = document.querySelector("#app");
  $app.innerHTML = `
    <section>
      <h2>Events</h2>
      <div id="party-list-container"></div>  </section>
    <section id="selected">
      <h2>Party Details</h2>
      <div id="party-details-container"></div>  </section>
    `;
  $app.querySelector("#party-list-container").replaceWith(PartyList());
  $app.querySelector("#party-details-container").replaceWith(PartyDetails());
}

async function init() {
  await getParties();

  render();
}

document.addEventListener("DOMContentLoaded", init);
