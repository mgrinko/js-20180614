'use strict'

import Component from '../../component.js';

export default class PhoneCart extends Component {

	constructor({ element, addToCart }) {
		super({ element })

		this._render();

		this.on('click', '[data-remove]', function(event) {
			let remove = event.delegateTarget;
			remove.closest('li').remove();
			let itemToDelete = event.target.closest('li');
			let itemToDeleteName = itemToDelete.querySelector('.cart-item').textContent;
			if(itemToDeleteName in PhoneCart.cartItems){
				delete(PhoneCart.cartItems[itemToDeleteName]);
			}
		})

	}

	_render() {
		this._element.innerHTML = `
		<p>Shopping Cart</p>
		<ul></ul>
		`;
	}

	static addItem(phoneId) {

		if(phoneId in PhoneCart.cartItems){
			PhoneCart.cartItems[phoneId] += 1;
		} else {
			PhoneCart.cartItems[phoneId] = 1;
		}

		let ul = document.querySelector('ul');
		ul.innerHTML = '';

		for(let cartItem in PhoneCart.cartItems){
			let li = document.createElement('li');
			li.innerHTML = '<span class="cart-item">' + cartItem + '</span>' + ' (' + PhoneCart.cartItems[cartItem] + ')' + '<span class="remove" data-remove>X</span>';
			ul.appendChild(li);
		}

	}

}

PhoneCart.cartItems = {};