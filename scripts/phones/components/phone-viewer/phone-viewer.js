'use strict'

import Component from '../../../component.js';
import template from './phone-viewer.hbs';

import './phone-viewer.css'

export default class PhoneViewer extends Component {

  constructor ({ element }) {
    super({ element });

    this.on('click', '[data-element="button-back"]', () => {
      this._trigger('back');
    });

    this.on('click', '[data-element="button-add"]', () => {
      this._trigger('add', this._phone.id);
    });
  }


  showPhone(phone) {
    this._phone = phone;
    this._render(phone);

    super.show();
  }

  _render(phone) {
    this._element.innerHTML = template({ phone });
  }
}
