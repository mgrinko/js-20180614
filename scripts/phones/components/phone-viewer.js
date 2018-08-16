'use strict';

import Component from "../../component.js";

export default class PhoneViewer extends Component {
    constructor({element}) {
        super({element});

        this.on('click', '[data-element="button-back"]', () => {
            this._trigger('back');
        });

        this.on('click', '[data-element="button-add"]', () => {
            this._trigger('add', this._phone.id);
        });

        this.on('click', '[data-element="phone-thumbs"]', (ev) => {
            this._element.querySelector('[data-element="phone-base-img"]').src = ev.target.src;
        });

        this.on('phonesFilter', ev => {
            let data = ev.detail;

            console.log(data, 'data');
        });
    }

    showPhone(phone) {
        this._phone = phone;
        this._render(phone);

        super.show();
    }

    _render(phone) {
        this._element.innerHTML = `
            <img 
                class="phone"
                data-element="phone-base-img"
                src="${ phone.images[0] }"
            >
        
            <button data-element="button-back">Back</button>
            <button data-element="button-add">Add to basket</button>
        
            <h1>${ phone.name }</h1>
        
            <p>${ phone.description }</p>
        
            <ul class="phone-thumbs">
                ${ phone.images.map(image => `
                     <li>
                        <img
                            data-element="phone-thumbs"
                            src="${ image }"
                        >
                    </li>
                `) }
            </ul>
        `;
    }
}
