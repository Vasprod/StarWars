const episodeBackgrounds = {
  1: '/img/episode1.jpg',
  2: '/img/episode2.jpg',
  3: '/img/episode3.jpg',
  4: '/img/episode4.jpg',
  5: '/img/episode5.jpg',
  6: '/img/episode6.jpg'
}

export function createLayout(episodeId, title, episodeNumber, blockCard) {
  const card = document.createElement("div")
  card.classList.add('card')
  card.style.backgroundImage = `url('${episodeBackgrounds[episodeId]}')`;
  card.style.backgroundSize = 'cover';
  card.style.backgroundPosition = 'center';

  const backImgCard = document.createElement('div')
  backImgCard.classList.add('back_card_img')

  const backgroundCard = document.createElement('div')
  backgroundCard.classList.add('back_card')

  const titleCard = document.createElement("h2")
  titleCard.classList.add('card_title')
  titleCard.textContent = title

  const numbCard = document.createElement("p")
  numbCard.classList.add('card_descr')
  numbCard.textContent = `Episode ${episodeNumber}`

  const btn = document.createElement("button")
  btn.classList.add('btn')
  btn.textContent = 'Details'
  btn.addEventListener('click', () => {
  window.location.href = `episode.html?id=${episodeId}`
  })
  
  card.appendChild(backImgCard)
  card.appendChild(backgroundCard)
  backgroundCard.appendChild(titleCard)
  backgroundCard.appendChild(numbCard)
  backgroundCard.appendChild(btn)

  blockCard.appendChild(card)
}





