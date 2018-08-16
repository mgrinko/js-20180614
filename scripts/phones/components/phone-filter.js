'use strict';

import Component from "../../component.js";

export default class PhoneFilter extends Component {
    constructor({element}) {
        super({element});

        window.handlePhonesSort = (ev) => {
            this._trigger('sort', ev.target.value);
        };
        window.handlePhonesSearch = (ev) => {
            this._trigger('search', ev.target.value);
        };

        this._render();
    }

    _render() {
        this._element.innerHTML = `
            <p>
                Search:
                <input
                    oninput="window.handlePhonesSearch(event)"
                    type="text"
                >
            </p>
            
            <p>
                Sort by:
                <select onchange="window.handlePhonesSort(event)">
                    <option value="name">Alphabetical</option>
                    <option value="age">Newest</option>
                </select>
            </p>
        `;
    }
}
