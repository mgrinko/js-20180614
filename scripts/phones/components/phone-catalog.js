'use strict'

import Component from "../../component.js";

export default class PhoneCatalog extends Component{
    constructor ({element}) {
        super({element});


        this.on('click', '[data-element="phone-link"]', (event) => {

            let phoneLink = event.delegateTarget;
            let phoneElement = phoneLink.closest('[data-element="phone"]');
            /* let delegateTarget =  event.target.closest('[data-element="phone-link"]');
             if (!delegateTarget) {
                 return;
             }*/
            // let delegateTarget =  event.target.closest('[data-element="phone-link"]');
            //let phoneLink = event.delegateTarget;


            this._trigger('phoneSelected', phoneElement.dataset.phoneId);
            /*   let customEvent = new CustomEvent('phoneSelected',{
                    detail: event.delegateTarget.dataset.phoneId,
                });
            this._element.dispatchEvent(customEvent);
            });*?


        /*this.on('click','[data-element="phone-link"]',(event)=>{
            let phoneLink = event.delegateTarget;
            onPhoneSelected(phoneLink.dataset.phoneId);
        })*/
        });

        this.on('click', '[data-element="button-add"]', (event) => {

            let addButton = event.delegateTarget;
            let phoneElement = addButton.closest('[data-element="phone"]');
            this._trigger('addPhoneCart', phoneElement.dataset.phoneId);
        });
    }

    showPhones (phones) {
        this._phones = phones;
        this._render();

       // this.show();
    }
   /*showFilterPhone (filterPhones) {
     this._phones = filterPhones;
     console.log(this._phones);

        this._render();
        console.log(this._element)

    };*/
    _render() {
        this._element.innerHTML = `
         <ul class="phones" 
         >
         
        
          ${  this._phones.map(phone => `
       
         <li class="thumbnail" 
         data-element="phone"
         data-phone-id="${phone.id}"
         >
            <a
             href="#!/phones/${phone.id}"
              class="thumb"
              data-element="phone-link"
              >
            <img alt="${phone.name}" src="${phone.imageUrl}">
            </a>

            <div class="phones__btn-buy-wrapper">
            <a class="btn btn-success" 
            data-element="button-add">
            Add
            </a>
            </div>

            <a 
            href="#!/phones/${phone.id}"
            data-element="phone-link"
            >${phone.name}</a>
            <p>${phone.snippet}</p>
            </li>`).join('')}
                
          </ul>
        `;
    }
}