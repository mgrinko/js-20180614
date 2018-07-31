'use strict';

import Component from '../../component.js';

export default class ShoppingCart extends Component {
  constructor({ element }) {
    super({ element });

    this._items = new Map();

    this._render();
    this._addEventHandlers();
  }

  _render() {
    if (0 === this._items.size) {
      this._element.innerHTML = `
        <p>Shopping Cart</p>
        <span><i>Nothing added yet</i></span>
      `;

      return;
    }

    this._element.innerHTML = `
      <p>Shopping Cart</p>
      <ul>${ Array.from(this._items.entries()).map(([ phoneId, { phoneName, quantity } ]) => `
        <li>
          <strong>${ phoneName }</strong> &times; ${ quantity } 
          <span data-phone-id="${ phoneId }" 
                class="js-remove-item-from-shopping-cart" 
                title="Remove ${ phoneName } from your shopping cart">X</span>
        </li>
      `).join('') }</ul>
    `;
  }

  _addEventHandlers() {
    this.on('click', '[data-phone-id]', (event) => {
      if (confirm('Are you sure?')) {
        this._items.delete(event.delegateTarget.dataset.phoneId);
        this._render();
      }
    });
  }

  add(phoneId, phoneName) {
    let quantity = 1;
    if (this._items.has(phoneId)) {
      console.log(this._items.get(phoneId).quantity);
      quantity = this._items.get(phoneId).quantity + 1;
    }

    this._items.set(phoneId, { 'phoneName': phoneName, quantity });

    this._render();
  }
}