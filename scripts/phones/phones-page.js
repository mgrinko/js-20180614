'use strict'
import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from  './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import ShoppingCart from './components/shopping-cart.js';
import PhoneFilter from  './components/phone-filter.js';


export default class PhonesPage {
 constructor ({ element }) {

  this._element = element;

  this._render();

  this._initCatalog();
  this._initViewer ();
  this._initShopCart();
  this._initPhoneFilter();


 }

 _initCatalog () {
     this._catalog = new PhoneCatalog ({
         element: this._element.querySelector('[data-component="phone-catalog"]'),
         /*   onPhoneSelected: (phoneId) => {
                let phone = PhoneService.get(phoneId);
                this._catalog.hide();
                this._viewer.showPhone(phone)
            }
        });*/
     });

     PhoneService.getAll( (phones) => {

         this._catalog.showPhones(phones);
     });

     this._catalog.on ('phoneSelected', (event) => {
        let phoneId = event.detail;
         PhoneService.get(phoneId, (phone) => {
             this._catalog.hide();
             this._viewer.showPhone(phone);
         });
     });

     this._catalog.on('addPhoneCart', (event) => {
         let phoneId = event.detail;
         this._cart.addItem(phoneId);
     })
 };

 _initViewer () {
     this._viewer = new PhoneViewer ({
         element: this._element.querySelector('[data-component="phone-viewer"]'),
        /* onButtonBackClick: () =>{
         this._catalog.show();
         this._viewer.hide();
         }*/
     });

     this._viewer.on ('moveBack', () => {
         this._catalog.show();
         this._viewer.hide();
     });
     this._viewer.on ('addPhoneCart', (event) => {
      let phoneId = event.detail;
      this._cart.addItem(phoneId);
     });
 }

 _initShopCart () {
     this._cart = new ShoppingCart({
         element: this._element.querySelector('[data-component="phone-cart"]'),
     });


}
    _initPhoneFilter (){
    this._filter = new PhoneFilter({
        element: this._element.querySelector('[data-component="phone-filter"]')
    });
    this._filter.on ('searchPhone', (event) => {
        let searchPhones = event.detail;

        let filterPhone =[];
        let i = 0;
        PhoneService.getAll( (phones) => {

           phones.map( (phone) => {


               if(~phone.id.indexOf(searchPhones)) {

                   filterPhone[i] = phone;
                   i++;
               }

           });
        });
        console.log('this._catalog',this._catalog);
        this._catalog.showPhones(filterPhone);

    });
    }

 _render() {
  this._element.innerHTML=`<div class="container-fluid">
    <div class="row">

        <!--Sidebar-->
        <div class="col-md-2">
            <section data-component="phone-filter">
           
            </section>

            <section data-component="phone-cart">
             
            </section>
        </div>

        <!--Main content-->
        <div class="col-md-10" 
        <div data-component="phone-catalog"></div> 
        <div data-component="phone-viewer" class="js-hidden"></div>
        </div>
    </div>
</div>`;
 }
}