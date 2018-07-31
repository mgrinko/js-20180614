'use strict';

import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import ShoppingCart from './components/shopping-cart.js';
import PhoneService from './services/phone-service.js';

export default class PhonesPage {
  constructor({ element }) {
    this._element = element;

    this._render();

    this._initCatalog();
    this._initViewer();
    this._initShoppingCart();
  }

  _initCatalog() {
    this._catalog = new PhoneCatalog({
      element: this._element.querySelector('[data-component="phone-catalog"]'),
      phones: PhoneService.getAll(),

      onPhoneSelected: (phoneId) => {
        let phoneDetailsRequest = PhoneService.get(phoneId);

        phoneDetailsRequest
          .then((response) => {
            return response.json();
          })
          .then((phoneData) => {
            this._catalog.hide();
            this._viewer.showPhone(phoneData);
          });
      },

      onAddToCart: (phoneId, phoneName) => {
        this._shoppingCart.add(phoneId, phoneName);
      }
    });
  }

  _initViewer() {
    this._viewer = new PhoneViewer({
      element: this._element.querySelector('[data-component="phone-viewer"]'),

      onBackClick: () => {
        this._viewer.hide();
        this._catalog.show();
      },

      onAddToCart: (phoneId, phoneName) => {
        this._shoppingCart.add(phoneId, phoneName);
      }
    });
  }

  _initShoppingCart() {
    this._shoppingCart = new ShoppingCart({
      element: this._element.querySelector('[data-component="shopping-cart"]')
    });
  }

  _render() {
    this._element.innerHTML = `
      <div class="container-fluid">
        <div class="row">
      
          <!--Sidebar-->
          <div class="col-md-2">
            <div class="js-sidebar">
              <section>
                <p>
                  Search:
                  <input>
                </p>
        
                <p>
                  Sort by:
                  <select>
                    <option value="name">Alphabetical</option>
                    <option value="age">Newest</option>
                  </select>
                </p>
              </section>
        
              <section data-component="shopping-cart"></section>
            </div>
          </div>
      
          <!--Main content-->
          <div class="col-md-10">
            <div data-component="phone-catalog"></div>
            <div data-component="phone-viewer" class="js-hidden"></div>
          </div>
        </div>
      </div>
    `;
  }
}
