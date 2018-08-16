'use strict';

import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import ShoppingCart from './components/shopping-cart.js';
import PhonesFilter from './components/phone-filter.js';

export default class PhonesPage {
    constructor({element}) {
        this._element = element;

        this._render();

        this._initCatalog();
        this._initViewer();
        this._initShoppingCart();
        this._initFilters();
    }

    _initCatalog() {
        this._catalog = new PhoneCatalog({
            element: this._element.querySelector('[data-component="phone-catalog"]'),
        });

        PhoneService.getAll()
            .then(phones => {
                this._catalog.showPhones(phones);
            });

        this._catalog.on('phoneSelected', ev => {
            let phoneId = ev.detail;

            PhoneService.get(phoneId)
                .then((phone) => {
                    this._catalog.hide();
                    this._viewer.showPhone(phone);
                });
        });

        this._catalog.on('addToShoppingCart', ev => {
            let phoneId = ev.detail;

            this._shoppingCart.addItem(phoneId);
        });

        this._catalog.on('phonesFilter', ev => {
            let data = ev.detail;

            console.log(data, 'data');
        });
    }

    _initViewer() {
        this._viewer = new PhoneViewer({
            element: this._element.querySelector('[data-component="phone-viewer"]'),
        });

        this._viewer.on('back', () => {
            this._catalog.show();
            this._viewer.hide();
        });

        this._viewer.on('add', ev => {
            let phoneId = ev.detail;

            this._shoppingCart.addItem(phoneId);
        });
    }

    _initShoppingCart() {
        this._shoppingCart = new ShoppingCart({
            element: this._element.querySelector('[data-component="shopping-cart"]'),
        });
    }

    _initFilters() {
        this._filter = new PhonesFilter({
            element: this._element.querySelector('[data-component="phones-filter"]'),
        });

        this._filter.on('sort', async (ev) => {
            let phones = await PhoneService.getAll({ orderField: ev.detail });

            this._catalog.showPhones(phones);
        });

        this._filter.on('search', async (ev) => {
            let phones = await PhoneService.getAll({ query: ev.detail })
                .catch((e) => console.log(e))

            this._catalog.showPhones(phones);
        });
    }

    _render() {
        this._element.innerHTML = `
            <div class="container-fluid">
                <div class="row">
            
                    <!--Sidebar-->
                    <div class="col-md-2">
                        <section>
                            <div>
                                <div data-component="phones-filter"></div>
                                <div data-component="phones-sort"></div>
                            </div>
                        </section>
            
                        <section>
                            <div data-component="shopping-cart"></div>
                        </section>
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
