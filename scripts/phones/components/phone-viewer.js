'use strict'

import Component from '../../component.js';

export default class PhoneViewer extends Component {
  constructor({ element }) {
    super({ element });

    this._phone = null;

    this._element.addEventListener('click', this._onBackButtonClick.bind(this));
    this._element.addEventListener('click', this._onAddButtonClick.bind(this));
  }

  showPhone(phone) {
    this._phone = phone;
    this._render();

    super.show();

    let thumbs = this._element.querySelector('.js-phone-thumbs');
    let baseImg = this._element.querySelector('.js-phone-base');

    thumbs.addEventListener('click', (event) => {
      let delegateTarget = event.target.closest('img');
    
      if (!delegateTarget) {
        return;
      }
    
      baseImg.src = delegateTarget.src;
    });
  }

  _onAddButtonClick(event) {
    let addButton = event.target.closest('[data-add-btn]');

    if (!addButton) {
      return;
    }

    console.log(this._phone.id);
  }

  _onBackButtonClick() {
    let backButton = event.target.closest('[data-back-btn]');

    if (!backButton) {
      return;
    }

    this._trigger('back');
  }

  _render() {
    this._element.innerHTML = `
      <img class="phone js-phone-base" src="img/phones/motorola-xoom-with-wi-fi.0.jpg">

      <button data-back-btn>Back</button>
      <button data-add-btn>Add to basket</button>
  
  
      <h1>Motorola XOOM™ with Wi-Fi</h1>
  
      <p>Motorola XOOM with Wi-Fi has a super-powerful dual-core processor and Android™ 3.0 (Honeycomb) — the Android platform designed specifically for tablets. With its 10.1-inch HD widescreen display, you’ll enjoy HD video in a thin, light, powerful and upgradeable tablet.</p>
  
      <ul class="phone-thumbs js-phone-thumbs">
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.0.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.1.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.2.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.3.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.4.jpg">
        </li>
        <li>
          <img src="img/phones/motorola-xoom-with-wi-fi.5.jpg">
        </li>
      </ul>
    `;
  }
}
