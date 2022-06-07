import './css/styles.css';

import fetchCountries from './js/fetchCountries';

import { renderMarkupForCountry, renderMarkupForCountries, cardList } from './js/markup';

import debounce from 'lodash.debounce';

import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;


const refs = {
    searchForm: document.getElementById('search-box'),
};

refs.searchForm.addEventListener('input', debounce(onSearchBox, DEBOUNCE_DELAY));

function onSearchBox(e) {
    
    const inputValue = e.target.value.trim();

     if (!inputValue) {
         return
     }

    fetchCountries(inputValue)
        
        .then((item) => {
            if (item.length === 1) {
                renderMarkupForCountry(item)
                
            };
            if (item.length >=2 && item.length <=10) {
                renderMarkupForCountries(item)
                
        }
            if (item.length > 10) {
                Notiflix.Notify.info("Too many matches found. Please enter a more specific name.")
               cardList.innerHTML = "";
            }
        
        }
        )
        .catch(error => {
            Notiflix.Notify.failure("Oops, there is no country with that name.");
            console.log(error);
            cardList.innerHTML = "";
            
        }) 
}