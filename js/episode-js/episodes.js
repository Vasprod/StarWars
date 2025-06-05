import { renderEpisode } from "./api.js";

const params = new URLSearchParams(window.location.search);
const episodeId = params.get("id");

if (episodeId) {
  renderEpisode(episodeId);
} else {
  document.body.textContent = "Эпизод не найден.";
}