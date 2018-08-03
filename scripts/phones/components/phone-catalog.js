'use strict'

import Component from "../../component.js";

export default class PhoneCatalog extends Component{
    constructor ({element, phones}) {
        super ({element});
        this._phones = phones;

        this._render();

        this.on('click','[data-element="phone-link"]', (event) => {
               /* let delegateTarget =  event.target.closest('[data-element="phone-link"]');
                if (!delegateTarget) {
                    return;
                }*/
           // let delegateTarget =  event.target.closest('[data-element="phone-link"]');
            //let phoneLink = event.delegateTarget;


               // this._trigger('phoneSelected',event.delegateTarget.dataset.phoneId);
               let customEvent = new CustomEvent('phoneSelected',{
                    detail: event.delegateTarget.dataset.phoneId,
                });
            this._element.dispatchEvent(customEvent);
            });


        /*this.on('click','[data-element="phone-link"]',(event)=>{
            let phoneLink = event.delegateTarget;
            onPhoneSelected(phoneLink.dataset.phoneId);
        })*/
    }

    _render() {
        this._element.innerHTML = `
         <ul class="phones">
         
         ${this._phones.map(phone => `
         <li class="thumbnail">
            <a
             href="#!/phones/${phone.id}"
              class="thumb"
              data-element="phone-link"
              data-phone-id="${phone.id}"
              >
            <img alt="${phone.name}" src="${phone.imageUrl}">
            </a>

            <div class="phones__btn-buy-wrapper">
            <a class="btn btn-success" data-element="button-add">
            Add
            </a>
            </div>

            <a 
            href="#!/phones/${phone.id}"
            data-element="phone-link"
            data-phone-id="${phone.id}"
            >${phone.name}</a>
            <p>${phone.snippet}</p>
            </li>`).join('')}
                
          </ul>
        `;
    }
}