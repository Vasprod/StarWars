import { createLayout } from './layout.js'
import { generateSparks } from './state.js';

const loader = document.getElementById('loader')
const container = document.getElementById('container-info')

const blockCard = document.createElement('div')
blockCard.classList.add('block_card')
container.appendChild(blockCard)

fetch('https://www.swapi.tech/api/films')
  .then(res => res.json())
  .then(data => {
    loader.classList.add('hidden')         // Скрываем лоадер
    container.classList.remove('hidden')   // Показываем контент

    const films = data.result

    // Сортируем эпизоды по порядку
    films.sort((a, b) => a.properties.episode_id - b.properties.episode_id)

    films.forEach(film => {
      const props = film.properties
      createLayout(props.episode_id, props.title, props.episode_id, blockCard)
    })
  })
  .catch(err => console.error('Ошибка загрузки данных:', err))

  document.addEventListener('DOMContentLoaded', () => {
    generateSparks()
  });
