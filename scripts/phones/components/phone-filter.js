"use strict"


import Component from "../../component.js";

export default class PhoneFilter extends Component{
 constructor ({ element }) {
     super ( {element} );
  this._element = element;

  this.on('click','[data-element="phone-search-btn"]', (event) => {

      let containerSearch = this._element.querySelector('[data-element="phone-input"]') ;
      let phoneSearch = containerSearch.value;
      this._trigger('searchPhone',phoneSearch);


     // console.log(phoneSearch);
  });


  this._render();

 }
 _render() {
  this._element.innerHTML=`
  
          <p>
            <input data-element="phone-input"> 
            <button data-element="phone-search-btn">Search</button>
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
