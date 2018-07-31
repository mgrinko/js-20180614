'use strict';

import Component from '../../component.js';

export default class PhoneCatalog extends Component {
  constructor({ element, phones, onPhoneSelected, onAddToCart }) {
    super({ element });

    this._phones = phones;
    this._render();

    this.on('click', '[data-element="phone-link"]', (event) => {
      let phoneLink = event.delegateTarget;

      onPhoneSelected(phoneLink.dataset.phoneId);
    });

    this.on('click', '[data-element="add-phone-to-shopping-cart"]', (event) => {
      let phoneLink = event.delegateTarget;
      let phoneId = phoneLink.dataset.phoneId;
      let phoneName = phoneLink.dataset.phoneName;

      onAddToCart(phoneId, phoneName);
    });
  }

  _render() {
    this._element.innerHTML = `
      <ul class="phones">
        ${ this._phones.map(phone => `
        
          <li class="thumbnail">
            <a
              href="#!/phones/${ phone.id }"
              class="thumb"
              data-element="phone-link"
              data-phone-id="${ phone.id }"
            >
              <img alt="${ phone.name }" src="${ phone.imageUrl }">
            </a>
  
            <div class="phones__btn-buy-wrapper">
              <a class="btn btn-success"
                 data-element="add-phone-to-shopping-cart"
                 data-phone-id="${ phone.id }"
                 data-phone-name="${ phone.name }">
                Add
              </a>
            </div>
  
            <a 
              href="#!/phones/${ phone.id }"
              data-element="phone-link"
              data-phone-id="${ phone.id }"
            >
              ${ phone.name }
            </a>
            
            <p>${ phone.snippet }</p>
          </li>
        
        `).join('') }
      </ul>
    `;
  }
}
