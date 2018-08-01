'use strict'

import Component from '../../component.js';

export default class PhoneViewer extends Component {

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

      <button>Back</button>
      <button>Add to basket</button>
  
      <h1>${this._phone.id}</h1>
  
      <p>${this._phone.description}</p>
  
      <ul class="phone-thumbs">
        ${this._phoneImages.join('')}
      </ul>
    `;
  }
}
