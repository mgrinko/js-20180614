"use strict"

export default  class  ShoppingCart {
 constructor ({ element }){

  this._element = element;

  this._items =[];

  this._render();

  if (this._items.length === 0) {
      this._element.innerHTML=`
   <p>Shopping Cart</p>
   <p>No Phone in Cart</p>
   `;
  }
 }
 addItem(item){
     this._items.push(item);
     this._render();
 }

 _render() {
  this._element.innerHTML=`
   <p>Shopping Cart</p>
          <ul>
         ${this._items.map(item => `
         <li>${item} <button>x</button></li>
         ` ).join(``)}
          </ul>`;
 };
}