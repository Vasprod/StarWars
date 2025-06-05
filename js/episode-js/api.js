import { createPageEpisode, createAccordions } from "./episode-layout.js";

export function renderEpisode(episodeId) {
  const container = document.getElementById("container");
  container.textContent = ""; // очищаем контейнер
  fetch(`https://www.swapi.tech/api/films/${episodeId}`)
    .then((res) => res.json())
    .then((data) => {
      const film = data.result.properties;

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
    })
    .catch((err) => console.error("Ошибка загрузки данных:", err));
}


