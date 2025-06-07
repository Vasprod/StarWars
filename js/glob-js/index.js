import { createLayout } from "./layout.js";
import { generateSparks } from "./state.js";

let cachedFilms = JSON.parse(sessionStorage.getItem("films") || "null");

const loader = document.getElementById("loader");
const container = document.getElementById("container-info");

const blockCard = document.createElement("div");
blockCard.classList.add("block_card");
container.appendChild(blockCard);

function loadFilms() {
  if (cachedFilms) {
    renderFilms(cachedFilms);
    return;
  }

  fetch("https://www.swapi.tech/api/films")
    .then((res) => res.json())
    .then((data) => {
      cachedFilms = data.result;
      sessionStorage.setItem("films", JSON.stringify(cachedFilms));
      renderFilms(cachedFilms);
    })
    .catch((err) => console.error("Ошибка загрузки данных:", err));
}

function renderFilms(films) {
  container.classList.remove("hidden");

  films.sort((a, b) => a.properties.episode_id - b.properties.episode_id);

  films.forEach((film) => {
    const props = film.properties;
    createLayout(props.episode_id, props.title, props.episode_id, blockCard);
  });
}

loadFilms();

// document.addEventListener("DOMContentLoaded", () => {
//   generateSparks();
// });
