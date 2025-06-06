import { episodeBackgrounds } from "../glob-js/layout.js";

const customDescriptions = {
  1: "Turmoil has engulfed the Galactic Republic. While noble Jedi Knights strive to maintain peace, a dark menace stirs in the shadows. Young Anakin Skywalker is discovered, destined for greatness but clouded by uncertainty. As war brews, sinister forces begin to reveal themselves.",
  2: "Ten years have passed since the invasion of Naboo. The galaxy stands on the brink of civil war, and forbidden love blooms between Anakin and Padmé. Meanwhile, mysterious armies are assembled in secret. The Clone Wars are about to begin.",
  3: "The Clone Wars rage across the galaxy. Anakin Skywalker faces impossible choices as his loyalty is torn between the Jedi and Chancellor Palpatine. Darkness takes hold as the Republic crumbles from within. A new Empire rises, and Darth Vader is born.",
  4: "The galaxy suffers under the grip of the Empire. A young farm boy named Luke Skywalker dreams of adventure and discovers his destiny. With new allies, he joins the Rebellion to fight tyranny. Hope is ignited across the stars.",
  5: "Despite recent victories, the Rebellion is relentlessly pursued by the Empire. Luke seeks guidance from Jedi Master Yoda while Han, Leia, and the others flee danger. Darth Vader closes in with a chilling revelation. The battle between light and dark grows ever more intense.",
  6: "The final battle has begun. The Rebels prepare to strike the Empire’s ultimate weapon while Luke confronts his father in a desperate bid for redemption. Old allies return, and destinies are fulfilled. The light rises as the dark falls — peace may yet be restored.",
};

const container = document.getElementById("container");

export function createPageEpisode(
  container,
  title,
  release_date,
  director,
  producer,
  opening_crawl,
  episodeId
) {
  container.style.backgroundImage =
    "linear-gradient(90deg, rgb(0, 0, 0) 20%, transparent), url('" +
    episodeBackgrounds[episodeId] +
    "')";
  container.style.backgroundSize = "cover";
  container.style.backgroundPosition = "center";

  const blockLay = document.createElement("div");
  blockLay.classList.add("content");

  const blockFilm = document.createElement("div");
  blockFilm.classList.add("block-film");

  const nameFilm = document.createElement("h1");
  nameFilm.textContent = title;
  nameFilm.classList.add("title");

  const infoFilm = document.createElement("ul");
  infoFilm.classList.add("list");
  const releaseDate = document.createElement("li");
  const [year, month, day] = release_date.split("-");
  releaseDate.textContent = `${day}.${month}.${year}`;
  releaseDate.classList.add("item-list");
  const directorFilm = document.createElement("li");
  directorFilm.textContent = director;
  directorFilm.classList.add("item-list");
  const producerFilm = document.createElement("li");
  producerFilm.textContent = producer;
  producerFilm.classList.add("item-list");

  infoFilm.append(releaseDate, directorFilm, producerFilm);

  const descrFilm = document.createElement("p");
  descrFilm.textContent = customDescriptions[episodeId] || opening_crawl;
  descrFilm.classList.add("p-film");

  blockFilm.append(nameFilm, infoFilm, descrFilm);
  blockLay.appendChild(blockFilm);
  container.appendChild(blockLay);
}

export async function createAccordions(planetsUrls, speciesUrls) {
  const blockLay = document.querySelector(".content");
  const blockAccord = document.createElement("div");
  blockAccord.classList.add("block-acc");

  const planetsAccordion = await createAccordion("Planets", planetsUrls);
  const speciesAccordion = await createAccordion("Species", speciesUrls);

  blockAccord.append(planetsAccordion, speciesAccordion);

  const btnMain = document.createElement("button");
  btnMain.classList.add("btn-acc");
  btnMain.innerHTML = `
  <svg class="icon-btn-home" width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M18.75 19.5L11.25 12L18.75 4.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M11.25 19.5L3.75 12L11.25 4.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  <span>Back</span>
`;

  btnMain.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  blockLay.appendChild(blockAccord);
  blockLay.appendChild(btnMain);
}

const accordionCache = new Map(); // Кэш в памяти на время сессии

export async function createAccordion(title, urls) {
  const accordion = document.createElement("div");
  accordion.classList.add("accordion");

  const header = document.createElement("div");
  header.classList.add("accordion-header");

  const heading = document.createElement("h2");
  heading.classList.add("title-acc");
  heading.textContent = title;

  const toggleBtn = document.createElement("button");
  toggleBtn.classList.add("accordion-toggle");
  toggleBtn.innerHTML = `
    <svg class="icon-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 7L12 17L2 7ZM22 7L18 11L22 7ZM15 14L12 17L15 14Z" fill="white" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  const list = document.createElement("ul");
  list.classList.add("accordion-list");
  list.style.display = "none";

  let isLoaded = false;
  const maxItems = 8;
  const limitUrls = urls.slice(0, maxItems);

  toggleBtn.addEventListener("click", async () => {
    const isVisible = list.style.display === "flex";
    list.style.display = isVisible ? "none" : "flex";

    accordion.classList.toggle("open");
    header.classList.toggle("open-head");

    if (!isLoaded) {
      try {
        const responses = [];

        for (const url of limitUrls) {
          if (accordionCache.has(url)) {
            responses.push(accordionCache.get(url));
          } else {
            const res = await fetch(url);
            const json = await res.json();
            accordionCache.set(url, json);
            responses.push(json);
            await delay(300); // задержка 300мс между запросами
          }
        }

        responses.forEach((data) => {
          const itemAcc = document.createElement("li");
          itemAcc.textContent = data.result.properties.name || "Без имени";
          itemAcc.classList.add("item-acc");
          list.appendChild(itemAcc);
        });

        isLoaded = true;
      } catch (error) {
        console.error("Ошибка загрузки данных:", error);
        const errorItem = document.createElement("li");
        errorItem.textContent = "Ошибка загрузки";
        list.appendChild(errorItem);
      }
    }
  });

  header.append(heading, toggleBtn);
  accordion.append(header, list);
  return accordion;
}

  function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
