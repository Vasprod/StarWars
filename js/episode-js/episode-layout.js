import { episodeBackgrounds } from '../glob-js/layout.js'

export function createPageEpisode(title, release_date, director, producer, opening_crawl, episodeId) {
  const container = document.getElementById('container')
  container.classList.add('card')
  container.style.backgroundImage = `url('${episodeBackgrounds[episodeId]}')`;
  container.style.backgroundSize = 'cover';
  container.style.backgroundPosition = 'center';

  const blockFilm = document.createElement('div')

  const nameFilm = document.createElement('h1')
  nameFilm.textContent = title

  const infoFilm = document.createElement('ul')
  const releaseDate = document.createElement('li')
  releaseDate.textContent = release_date
  const directorFilm = document.createElement('li')
  directorFilm.textContent = director
  const producerFilm = document.createElement('li')
  producerFilm.textContent = producer

  infoFilm.append(releaseDate, directorFilm, producerFilm)

  const descrFilm = document.createElement('p')
  descrFilm.textContent = opening_crawl

  blockFilm.append(nameFilm, infoFilm, descrFilm)
  container.appendChild(blockFilm)
}