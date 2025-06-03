import { createPageEpisode, createAccordions } from './episode-layout.js';

const params = new URLSearchParams(window.location.search)
const episodeId = params.get('id')

fetch(`https://www.swapi.tech/api/films/${episodeId}`)
  .then(res => res.json())
  .then(data => {
    const film = data.result.properties
    createPageEpisode(
      film.title, 
      film.release_date, 
      film.director, 
      film.producer, 
      film.opening_crawl,
      episodeId)
    createAccordions()
  })
  .catch(err => console.error('Ошибка загрузки данных:', err))
