'use strict'

export default class PhoneCatalog {
    constructor ({element}) {
        this._element = element;
        this._render ();
    }

    _render () {
        this._element.innerHTML = `
         <ul class="phones">
                <li class="thumbnail">
                    <a href="#!/phones/motorola-xoom-with-wi-fi" class="thumb">
                        <img alt="Motorola XOOM™ with Wi-Fi" src="img/phones/motorola-xoom-with-wi-fi.0.jpg">
                    </a>

                    <div class="phones__btn-buy-wrapper">
                        <a class="btn btn-success">
                            Add
                        </a>
                    </div>

                    <a href="#!/phones/motorola-xoom-with-wi-fi">Motorola XOOM™ with Wi-Fi</a>
                    <p>The Next, Next Generation

                        Experience the future with Motorola XOOM with Wi-Fi, the world's first tablet powered by Android 3.0 (Honeycomb).</p>
                </li>
          </ul>`
    }
}