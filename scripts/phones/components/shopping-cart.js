"use strict"

import Component from "../../component.js";

export default  class  ShoppingCart extends Component{
 constructor ({ element }) {
    super ( {element});
     this._element = element;

     this._items = {};

     this._render();

     this.on('click', '[data-element="data-remove"]', (event) => {
         let item = event.delegateTarget.dataset.item;
         this._removeItem(item);
     });
 }

 _removeItem(item) {

     if (this._items[item]) {
         this._items[item]--;
     }
     if(this._items[item] === 0){
         delete this._items[item];
     }
     this._render();
 };

 addItem(item){
    if (!this._items[item]) {
        this._items[item] = 0
    }
     this._items[item]++;
    this._render();
 }

 _render() {

     if (!Object.keys(this._items).length) {
         this._element.innerHTML=`
   <p>Shopping Cart</p>
   <p>No Phone in Cart</p>
   `;
     } else {
         this._element.innerHTML = `
   <p>Shopping Cart</p>
          <ul>
         ${ Object.entries(this._items).map(([item, quantity]) => `
         <li>${item}(${quantity}) <button style="font-weight: bolder"
          data-element="data-remove"
          data-item="${item}"
         >x
         </button></li>
         `).join(``)}
          </ul>`;
     };
 };
}