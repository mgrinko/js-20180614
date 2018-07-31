'use strict';

import Component from '../../component.js';

export default class PhoneViewer extends Component {
  constructor({ element, onBackClick, onAddToCart }) {
    super({ element });

    this._onBackClick = onBackClick;
    this._onAddToCart = onAddToCart;

    this._addEventHandlers();
  }

  showPhone(phone) {
    this._phone = phone;
    this._render();

    super.show();
  }

  _render() {
    let phonePics = this._phone.images;

    this._element.innerHTML = `
      <img class="phone" src="${ phonePics[0] }">

      <button data-back-to-catalog-btn>Back</button>
      <button data-element="add-phone-to-shopping-cart"
              data-phone-id="${ this._phone.id }"
              data-phone-name="${ this._phone.name }">Add to basket</button>
  
      <h1>${ this._phone.name }</h1>
  
      <p>${ this._phone.description }</p>
  
      <ul class="phone-thumbs">
        ${ phonePics.map(pic => `
          <li>
            <img class="thumb" src="${ pic }">
          </li>
        `).join('') }
      </ul>
    `;
  }

  _addEventHandlers() {
    this.on('click', '[data-back-to-catalog-btn]', this._onBackClick.bind(this));

    this.on('click', '.phone-thumbs img.thumb', (event) => {
      let mainPictureContainer = this._element.querySelector('img.phone');
      let pictureSrc = event.delegateTarget.getAttribute('src');

      mainPictureContainer.setAttribute('src', pictureSrc);
    });

    this.on('click', '[data-element="add-phone-to-shopping-cart"]', (event) => {
      let phoneLink = event.delegateTarget;
      let phoneId = phoneLink.dataset.phoneId;
      let phoneName = phoneLink.dataset.phoneName;

      this._onAddToCart(phoneId, phoneName);
    });
  }
}
