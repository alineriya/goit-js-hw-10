import './css/styles.css';
import API from './js/fetchCountries';
import { makeCountryMarkup } from './js/country-card';
import { makeCountryList } from './js/country-card';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import _debounce from 'lodash.debounce';
import getRefs from './js/get-refs';


const DEBOUNCE_DELAY = 300;
const refs = getRefs();

refs.input.addEventListener('input', _debounce(handleCountrySearch, DEBOUNCE_DELAY));

function handleCountrySearch(e) {
    resetMarkup();

    const inputValue = e.target.value.trim();

    if (inputValue === '') {
        resetMarkup();
        return;
      }
    
    API.fetchCountries(inputValue)
        // .then(renderCountryCard)
        .then(countries => {
            if (countries.length > 10) {
                showInfoNotification();
                return;
            }
            if (countries.length === 1) {
                renderCountryCard(countries);
                return;
            }
            renderCountryList(countries);
        })
        .catch(showFailureNotification);
}


function renderCountryList(name) {
    const countryListMarkup = makeCountryList(name);
    refs.countryList.insertAdjacentHTML('beforeend', countryListMarkup);
}

function renderCountryCard(name) {
    console.log(name);
  const markup = makeCountryMarkup(name);
  refs.countryInfo.innerHTML = markup;
}

function showFailureNotification() {
    Notify.failure('Oops, there is no country with that name');
}

function showInfoNotification() {
  Notify.info('Too many matches found. Please enter a more specific name.');
}

function resetMarkup() {
    refs.countryInfo.innerHTML = '';
    refs.countryList.innerHTML = '';
}
