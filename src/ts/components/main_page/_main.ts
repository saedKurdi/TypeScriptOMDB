// Importing 'sass' for '_main.ts' :
import "../../../sass/main.scss";
import "../../api/film_requests";
import { getRandomMoviesByLetterAndReturn } from "../../api/film_requests";
import { Movie } from "../../types/movie";

// Get body element from html side to init it with main and aside tag :
const bodyElement = document.querySelector<HTMLBodyElement>("body");

// Creating main element for body as string :
const mainElement = `
    <main class='main'>
        <ul class='main__menu'>
        </ul>
        <ul class='main__films'>
        </ul>
    </main>
`;

// Adding main & aside element to body :
bodyElement?.insertAdjacentHTML("beforeend", mainElement);

const main_ = document.querySelector<HTMLElement>(".main");

// Getting 'main__menu' after adding :
const main__menu = document.querySelector<HTMLUListElement>(".main__menu");

// Creating massive that keeps the types of movies :
const movieTypes = [
  "All Movies",
  "Action",
  "Biograpy",
  "Black Entertainment",
  "British",
  "Classics",
  "Comedy",
  "Crackle Original",
  "Crime",
  "Documentary",
  "Drama",
  "Faith-Based",
  "Family",
  "Fantasy",
  "Foreign Language",
  "Holiday",
  "Horror",
];

// Creating global variable for selected item :
let selectedItem = "All Movies";

// Window loading event to display all movies by default :
window.addEventListener("load", async () => {
  // Setting first list-item's color to white :
  (main__menu!.children[0].firstChild as HTMLParagraphElement).style.color =
    "white";
  const movies = await getRandomMoviesByLetterAndReturn();
  bindMoviesToScreen(movies);
});

// Creating url string to append all option - request to it :
let filmRequest = "";

// Asyncronous function that takes array and binds to UI :
async function bindMovieGenresToUI(movieTypes: string[]): Promise<void> {
  try {
    movieTypes.forEach((m) => {
      // Creating list-item element for unordered-list item :
      const listItem = document.createElement("li");
      // Creating paragraph element for list-item element :
      const paragraph = document.createElement("p");
      // Adding text content to paragraph :
      paragraph.textContent = m;
      // Adding some class to paragraph :
      paragraph.className = "main__menu-text";
      // Adding parapgraph to list-item :
      listItem.appendChild(paragraph);
      // Adding event - listener for list-item element :
      listItem.addEventListener("click", (e) => {
        // Getting text - content of paragraph :
        const textContent = (e.target as HTMLParagraphElement).textContent;
        // Updating selected item :
        selectedItem = textContent as string;
        // Changing other paragraphs color to gray :
        Array.from(main__menu!.children).forEach((child) => {
          if (child !== e.target) {
            (child.firstChild as HTMLParagraphElement).style.color = "gray";
            // get movies as paragraph's text :
          }
        });
        // Changing color of paraprapgh to white :
        (e.target as HTMLParagraphElement).style.color = "white";
        // Update films side :
        updateFilmsSide(selectedItem);
      });
      // Adding list-item to unordered-list :
      main__menu?.insertAdjacentElement("beforeend", listItem);
    });
  } catch (error) {
    console.log("ERROR : ", error);
    alert(error);
  }
}

// Asyncronous function that updates films side :
async function updateFilmsSide(selectedItem: string): Promise<void> {
  try {
  } catch (error) {
    console.log("ERROR", error);
    alert(error);
  }
}

// Bind Movies to screen :
function bindMoviesToScreen(movies: Movie[]) {
  const main__films = document.querySelector<HTMLUListElement>(".main__films");
  movies.forEach((m: Movie) => {
    const li = document.createElement("li");
    li.className = "main__film";

    const img = document.createElement("img");
    img.width = 240;
    img.height = 300;
    if (m.url == "N/A") {
      img.src = "../../../../src/assests/images/movie_ph.png";
    } else {
      img.src = m.url;
    }
    img.alt = m.title;

    li.appendChild(img);

    li.addEventListener("click", (e) => {
      let div_ = document.querySelector(".main__film-info");
      if (div_ != undefined) {
        div_.remove();
      }

      const div = document.createElement("div");
      div.className = "main__film-info";

      const img = document.createElement("img");
      img.src = m.url;
      img.width = 340;
      img.height = 450;
      img.style.borderRadius = "15px";

      const div2 = document.createElement("div");
      div2.className = "main__film-text-container";
      const items = `
        <p>Title : ${m.title}</p>
        <p>Description : ${m.description}</p>
        <p>Year : ${m.year}</p>
        <p>Type : ${m.type}</p>
        <p>Genre : ${m.genre}</p>`;
      div2.insertAdjacentHTML("beforeend", items);

      div.append(img);
      div.append(div2);

      const e_ = document.createElement("i");
      e_.className = "fa-regular fa-circle-xmark";
      e_.addEventListener("click", (e) => {
        div.remove();
      });

      div.append(e_);

      main__films?.append(div);
    });
    main__films?.insertAdjacentElement("beforeend", li);
  });
}

bindMovieGenresToUI(movieTypes);
