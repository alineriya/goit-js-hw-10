export const makeCountryMarkup = (countries) => countries.map(({name, flags, capital, population, languages}) =>
    `<div class="country-main">
    <img width="40px" src="${flags.svg}" alt="${name.common}" />
    <h1 class="country-name">${name.common}</h1>
    </div>
    <p class="country-text"><span>Capital: </span>${capital}</p>
    <p class="country-text"><span>Population: </span>${population}</p>
    <p class="country-text"><span>Languages: </span>${Object.values(languages).join(", ")}</p>`).join('');

export const makeCountryList = (countries) => countries.map(({name, flags}) =>
    `<li class="list-item">
    <img width="30px" height = "20px" src="${flags.svg}" alt="${name.common}" />
    <p class="list-country-name">${name.common}</p>
    </li>
    `).join('');