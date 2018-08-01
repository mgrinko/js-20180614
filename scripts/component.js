'use strict'

const HIDDEN_CLASS = 'js-hidden';

export default class Component {
  constructor({ element }) {
    this._element = element;
  }

  show() {
    this._element.classList.remove(HIDDEN_CLASS)
  }

  hide() {
    this._element.classList.add(HIDDEN_CLASS)
  }

  // on(eventName, selector, callback) {
  //   this._element.addEventListener(eventName, (event) => {
  //     let delegateTarget = event.target.closest(selector);

  //     if (!delegateTarget) {
  //       return;
  //     }

  //     event.delegateTarget = delegateTarget;

  //     callback(event);
  //   });
  // }

  on(eventName, callback) {
    this._element.addEventListener(eventName, callback);
  }

  _trigger(eventName, detail) {
    let customEvent = new CustomEvent(eventName, { detail });

    this._element.dispatchEvent(customEvent);
  }
}
