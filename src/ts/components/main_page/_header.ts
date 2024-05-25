// Importing 'sass' for '_header.ts' :
import "../../../sass/main.scss";

// Get body element from html side to init it with sections :
const bodyElement = document.querySelector<HTMLBodyElement>("body");

// Creating header element for body as string :
const headerElement = `
    <header class='header'>
        <div class='header__container'>
            <a class='header__logo'>crackle</a>
            <ul class='header__select-type'>
                <li class='header__select-item'>
                    <i class="fa-solid fa-film select-item__icon"></i>
                    <p class='select-item__text'>Movies</p>
                </li>
                <li class='header__select-item'>
                    <i class="fa-solid fa-tv select-item__icon"></i>
                    <p class='select-item__text'>TV Shows</p>
                </li>
                <li class='header__select-item'>
                    <i class="fa-solid fa-plus select-item__icon"></i>
                    <p class='select-item__text'>Watchlist</p>
                </li>
            </ul>
        </div>
        <ul class='header__button-list'>
            <li class='header__search'>
                <i class="fa-solid fa-magnifying-glass select-item__icon"></i>
                <input class='select-item__input' placeholder=Search>
            </li>
            <li class='header__createacc-button header__button'>
                <p>Create Account</p>
            </li>
            <li class='header__signup-button header__button'>
                <p>Sign In</p>
            </li>
        </ul>
    </header>
`;

// Adding header element to body :
bodyElement?.insertAdjacentHTML("beforeend",headerElement);