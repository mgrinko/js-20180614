'use strict'

import Component from '../../component.js';

export default class PhoneViewer extends Component {

  constructor({ element, backLink, addToCart }) {
    super({ element })

    this.on('click', '[data-back]', (event) => {
      backLink();
    })

    this.on('click', '[data-add-cart]', (event) => {
      let phoneLink = event.delegateTarget;
      addToCart(phoneLink.dataset.phoneId);
    })

  }

  showPhone(phone) {
    this._phone = phone;

    this._phoneImages = phone.images.map((image)=>{
      return `<li>
        <img src="${image}">
      </li>`;
    })

    this._render();

    super.show();

    this.on('click', '.phone-thumbs img', (event) => {
    	let galleryImage = event.delegateTarget,
    		galleryImageLink = galleryImage.getAttribute('src'),
    		large_image = document.querySelector('#large_image');

    	large_image.setAttribute('src', galleryImageLink);
    })

  }

  _render() {
    this._element.innerHTML = `
      <img id="large_image" class="phone" src="${this._phone.images[0]}">

      <button data-back>Back</button>
      <button data-add-cart data-phone-id="${ this._phone.id }">Add to basket</button>
  
      <h1>${this._phone.id}</h1>
  
      <p>${this._phone.description}</p>
  
      <ul class="phone-thumbs">
        ${this._phoneImages.join('')}
      </ul>
    `;
  }
}
