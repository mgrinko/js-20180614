'use strict'

import Component from '../../component.js'
import { SORT_NONE, SORT_BY_NAME, SORT_BY_AGE_ASC, SORT_BY_AGE_DESC } from './phones-filter.js';

export default class PhoneCatalog extends Component {
  constructor({ element }) {
    super({ element })

    this._sortType = SORT_NONE;
    this._filterText = '';

    this.on('click', '[data-element="phone-link"]', (event) => {
      let phoneLink = event.delegateTarget;
      let phoneElement = phoneLink.closest('[data-element="phone"]')

      this._trigger('phoneSelected', phoneElement.dataset.phoneId);
    });

    this.on('click', '[data-element="button-add"]', (event) => {
      let addButton = event.delegateTarget;
      let phoneElement = addButton.closest('[data-element="phone"]')

      this._trigger('addToShoppingCart', phoneElement.dataset.phoneId);
    });

  }

  showPhones(phones) {
    this._phones = phones;
    this._allphones = phones;

    this._render();

    this.show();
  }

  filterByText(filterText){ 
    this._filterText = filterText;
    this._transform();
  }

  sortBy(sortType){
    this._sortType = sortType;
    this._transform();
  }

  _transform(){
    let promise = new Promise((resolve, reject) => {
      resolve(filterAndSortPhones(this._allphones, this._filterText, this._sortType));
    });
    
    promise
      .then(
        result => {
          this._phones = result;
          this._render();
        }, 
        error => console.log("Error: " + error) 
      );
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
        ${ this._phones.map(phone => `
        
          <li
            class="thumbnail"
            data-element="phone"
            data-phone-id="${ phone.id }"
          >
            <a
              href="#!/phones/${ phone.id }"
              class="thumb"
              data-element="phone-link"
            >
              <img alt="${ phone.name }" src="${ phone.imageUrl }">
            </a>
  
            <div class="phones__btn-buy-wrapper">
              <a class="btn btn-success" data-element="button-add">
                Add
              </a>
            </div>
  
            <a 
              href="#!/phones/${ phone.id }"
              data-element="phone-link"
            >
              ${ phone.name } + <b>(Age: ${ phone.age })</b>
            </a>
            
            <p>${ phone.snippet }</p>
          </li>
        
        `).join('') }
      </ul>
    `;
  }
}


function filterAndSortPhones(allphones, filterText, sortType) {
  // apply filter
  let results = allphones;

  if(filterText && (filterText.length!==0)){
    results = results.filter(phone =>{
      return phone.name.toUpperCase().indexOf(filterText.toUpperCase(), 0)!=-1;
    });
  }

  // apply sort
  let fnSortAge = (a,b) => {
    if (a.age > b.age) return 1;
    if (a.age < b.age) return -1;
    return 0;
  }

  switch (sortType) {
    case SORT_BY_NAME:
      results = results.sort( (a,b) =>{
         if (a.name.toUpperCase() > b.name.toUpperCase()) return 1;
         if (a.name.toUpperCase() < b.name.toUpperCase()) return -1;
         return 0;
      });   
      break;
    case SORT_BY_AGE_ASC:
      results = results.sort(fnSortAge);
      break;
    case SORT_BY_AGE_DESC:
      results = results.sort((a,b) => -fnSortAge(a,b));
      break;
    default:
      break;
  }
  return results;
}