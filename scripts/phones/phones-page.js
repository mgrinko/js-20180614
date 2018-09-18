'use strict'
import PhoneCatalog from './components/phone-catalog.js';
import PhoneViewer from  './components/phone-viewer.js';
import PhoneService from './services/phone-service.js';
import ShoppingCart from './components/shopping-cart.js';
import PhoneFilter from  './components/phone-filter.js';


export default class PhonesPage {
 constructor ({ element }) {

  this._element = element;
  this._phoneInPage = null;

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
         this._phoneInPage = this._catalog.showPhones(phones);
        // console.log('phoneInPage',phoneInPage);
     });

     this._catalog.on('phoneSelected', (event) => {
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

     this._viewer.on('moveBack', () => {
         this._viewer.hide();
         PhoneService.getAll( (phones) => {
             this._catalog.showPhones(phones);
         });
      //   this._catalog.show();
     });

     this._viewer.on('addPhoneCart', (event) => {
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

    this._filter.on('searchPhone', (event) => {
        let searchPhones = event.detail;

        // перенести выполнение кода в каталог

                let filterPhone =[];
                PhoneService.getAll( (phones) => {
                phones.forEach( (phone) => {
                    if(!(~phone.id.indexOf(searchPhones))) {
                    filterPhone.push(phone);

                    }
                    phones = filterPhone; //!!!!
                });
               this._phoneInPage =  this._catalog.showPhones(phones);
               //console.log('a',a);
       });
    });

    this._filter.on('backToMainPage', (event) => {
        PhoneService.getAll( (phones) => {
         this._phoneInPage = this._catalog.showPhones(phones);
        });
    });

    this._filter.on('phoneSort', (event) => {
        let paramSort = event.detail;
        let phones = this._phoneInPage;
        // функция сортировки по параметру и вывод результата на страницу
        let arraySortFromParamSort =[];
        let filterPhone = [];
              phones.forEach( (phone)=> {
                     arraySortFromParamSort.push(phone[paramSort]);
              });
        arraySortFromParamSort.sort();

        arraySortFromParamSort.forEach((i) => {
            phones.map((phone) =>{

                if (phone[paramSort] === i) {
                    filterPhone.push(phone);
                }

                   });
               });
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