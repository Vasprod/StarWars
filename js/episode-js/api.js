import { createPageEpisode, createAccordions } from "./episode-layout.js";

// Инициализация кэша
const episodeCache = new Map();

const cachedData = sessionStorage.getItem("episodeCache");
if (cachedData) {
  try {
    const parsed = JSON.parse(cachedData);
    for (const [key, value] of Object.entries(parsed)) {
      episodeCache.set(key, value);
    }
  } catch (e) {
    console.warn("Ошибка при разборе sessionStorage:", e);
  }
}

export function renderEpisode(episodeId) {
  const container = document.getElementById("container");
  container.textContent = ""; // очищаем контейнер

  if (episodeCache.has(episodeId)) {
    renderFromData(episodeCache.get(episodeId), container, episodeId);
    return;
  }

  fetch(`https://www.swapi.tech/api/films/${episodeId}`)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => {
      const film = data.result.properties;
      episodeCache.set(episodeId, film);

      const objToStore = Object.fromEntries(episodeCache.entries());
      sessionStorage.setItem("episodeCache", JSON.stringify(objToStore));

      renderFromData(film, container, episodeId);
    })
    .catch((err) => {
      console.error("Ошибка загрузки данных:", err);
      container.textContent = "Ошибка загрузки фильма.";
    });
}

function renderFromData(film, container, episodeId) {
  createPageEpisode(
    container,
    film.title,
    film.release_date,
    film.director,
    film.producer,
    film.opening_crawl,
    episodeId
  );

  createAccordions(film.planets, film.species);
}
