'use strict';

import Component from '../../component.js';

export default class PhoneViewer extends Component {
  constructor({ element, onBackClick }) {
    super({ element });

    this._onBackClick = onBackClick;
  }

  showPhone(phone) {
    this._phone = phone;
    this._render();
    this._addEventHandlers();

    super.show();
  }

  _render() {
    let phonePics = this._phone.images;

    this._element.innerHTML = `
      <img class="phone" src="${ phonePics[0] }">

      <button data-back-to-catalog-btn>Back</button>
      <button>Add to basket</button>
  
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
    this._element.querySelector('[data-back-to-catalog-btn]').addEventListener(
      'click',
      this._onBackClick.bind(this)
    );

    let mainPictureContainer = this._element.querySelector('img.phone');
    this._element.querySelectorAll('.phone-thumbs img.thumb').forEach((thumb) => {
      thumb.addEventListener(
        'click',
        (event) => {
          let pictureSrc = event.target.getAttribute('src');

          mainPictureContainer.setAttribute('src', pictureSrc);
        }
      );
    });
  }
}
