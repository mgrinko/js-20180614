import Component from "../../component.js";

export default class ShoppingCart extends Component {
    constructor({element}) {
        super({element});

        this._items = {};

        this._render();

        this.on('click', '[data-element="button-remove"]', ev => {
            let item = ev.delegateTarget.dataset.item;

            this.removeItem(item);
        });

        this.on('phonesFilter', ev => {
            let data = ev.detail;

            console.log(data, 'data');
        });
    }

    addItem(item) {
        if (!this._items[item]) {
            this._items[item] = 0;
        }

        this._items[item]++;

        this._render();
    }

    removeItem(item) {
        if (this._items[item]) {
            this._items[item]--;
        }

        if (this._items[item] === 0) {
            delete this._items[item];
        }

        this._render();
    }

    _render() {


        this._element.innerHTML = ` 
            <p>Shopping Cart</p>
            <ul>
                ${Object.entries(this._items).map(([item, quantity]) => `
                    <li>
                        ${ item } (${quantity})
                        <button 
                            data-element="button-remove"
                            data-item="${item}"
                        >
                            x
                        </button>
                    </li>
                `).join('')}   
            </ul>
        `;
    }
}
