import { episodeBackgrounds } from "../glob-js/layout.js";

const container = document.getElementById("container");

export function createPageEpisode(
  title,
  release_date,
  director,
  producer,
  opening_crawl,
  episodeId
) {
  container.classList.add("card");
  container.style.backgroundImage =
    "linear-gradient(90deg, rgb(0, 0, 0) 20%, transparent), url('" +
    episodeBackgrounds[episodeId] +
    "')";
  container.style.backgroundSize = "cover";
  container.style.backgroundPosition = "center";

  const blockFilm = document.createElement("div");
  blockFilm.classList.add("block-film");

  const nameFilm = document.createElement("h1");
  nameFilm.textContent = title;
  nameFilm.classList.add("title");

  const infoFilm = document.createElement("ul");
  infoFilm.classList.add("list");
  const releaseDate = document.createElement("li");
  releaseDate.textContent = release_date;
  releaseDate.classList.add("item-list");
  const directorFilm = document.createElement("li");
  directorFilm.textContent = director;
  directorFilm.classList.add("item-list");
  const producerFilm = document.createElement("li");
  producerFilm.textContent = producer;
  producerFilm.classList.add("item-list");

  infoFilm.append(releaseDate, directorFilm, producerFilm);

  const descrFilm = document.createElement("p");
  descrFilm.textContent = opening_crawl;
  descrFilm.classList.add("p-film");

  blockFilm.append(nameFilm, infoFilm, descrFilm);
  container.appendChild(blockFilm);
}

export async function createAccordions() {
  const blockAccord = document.createElement("div");
  blockAccord.classList.add("block-acc");

  const planetsBlock = document.createElement("div");
  planetsBlock.classList.add("accordion-block");

  const planetsTitle = document.createElement("h2");
  planetsTitle.textContent = "Planets";

  const planetsList = await createAccordionList(planetsUrls);

  planetsBlock.append(planetsTitle, planetsList);
  blockAccord.appendChild(planetsBlock);

  const speciesBlock = document.createElement("div");
  speciesBlock.classList.add("accordion-block");

  const speciesTitle = document.createElement("h2");
  speciesTitle.textContent = "Species";

  const speciesList = await createAccordionList(speciesUrls);

  speciesBlock.append(speciesTitle, speciesList);
  blockAccord.appendChild(speciesBlock);

  const btnMain = document.createElement("button");
  btnMain.textContent = "Home";
  btnMain.classList.add("btn-acc");
  btnMain.addEventListener("click", () => {
    window.location.href = `index.html`;
  });
  blockAccord.appendChild(btnMain);

  container.appendChild(blockAccord);
}
