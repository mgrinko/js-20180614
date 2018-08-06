"use strict"


import Component from "../../component.js";
import PhoneService from '/scripts/phones/services/phone-service.js';

export default class PhoneFilter extends Component{
 constructor ({ element }) {
     super ( {element} );
  this._element = element;

  this.on('click','[data-element="phone-search-btn"]', (event) => {

      let containerSearch = this._element.querySelector('[data-element="phone-input"]') ;
      let phoneSearch = containerSearch.value;
      containerSearch.value ='';
      this._trigger('searchPhone',phoneSearch);


  });

  this.on ('click','[data-element="clear-search"]', (event) => {
     this._trigger('backToMainPage');
  });


  this._render();

 }


 _render() {
  this._element.innerHTML=`
  
          <p>
            <input data-element="phone-input"> 
            <button data-element="phone-search-btn" title="Search Phone">Search</button>
            <button data-element="clear-search" style="font-weight: bolder"
            title="Clear Search">X</button>
          </p>

          <p>
            Sort by:
            <select>
              <option value="name">Alphabetical</option>
              <option value="age">Newest</option>
            </select>
          </p>`;
 }
}
