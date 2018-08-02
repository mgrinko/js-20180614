'use strict'

import Component from "../../component.js";

export default class PhoneViewer extends Component{
       constructor({element, onButtonBackClick}){
           super({element});

           this._rezult = null;


           this.on('click','[data-button="button-back"]',(event)=>{
               let buttonBack = event.delegateTarget;
               onButtonBackClick();

           });

           this.on('click','[data-phone-image]',(event)=>{
               this._rezult = event.delegateTarget.src;
               this._render();
               super.show();
           });
       }
    showPhone (phone) {
        this._phone = phone;
        this._render();

        super.show();

      //  console.log(this._phone);// все свойства телефонов
    }

    _showImagePhone () {
        let str = '';

        for (let i = 0; i < this._phone.images.length; i++) {
            str += `<li><img src="${this._phone.images[i]}" data-phone-image></li>`
        }
        console.log(str);
      return str;
    };

    _render () {
        this._element.innerHTML = `
           <img class="phone" src="${this._rezult ||this._phone.images[0]}">

    <button data-button="button-back">Back</button>
    <button>Add to basket</button>


    <h1>${this._phone.id}</h1>

    <p>${this._phone.description}</p>
    <ul class="phone-thumbs">
    
     ${this._showImagePhone()}
     
    </ul>
    <ul class="specs">
      <li>
        <span>Availability and Networks</span>
        <dl>
          <dt>${this._phone.availability}</dt>
          <dd></dd>
        </dl>
      </li>
      <li>
        <span>Battery</span>
        <dl>
          <dt>Type</dt>
          <dd>${this._phone.battery.type}</dd>
          <dt>Talk Time</dt>
          <dd>${this._phone.battery.talkTime}</dd>
          <dt>Standby time (max)</dt>
          <dd>${this._phone.battery.standbyTime}</dd>
        </dl>
      </li>
      <li>
        <span>Storage and Memory</span>
        <dl>
          <dt>RAM</dt>
          <dd>${this._phone.storage.ram}</dd>
          <dt>Internal Storage</dt>
          <dd>${this._phone.storage.flash}</dd>
        </dl>
      </li>
      <li>
        <span>Connectivity</span>
        <dl>
          <dt>Network Support</dt>
          <dd></dd>
          <dt>WiFi</dt>
          <dd>${this._phone.connectivity.wifi}</dd>
          <dt>Bluetooth</dt>
          <dd>${this._phone.connectivity.bluetooth}</dd>
          <dt>Infrared</dt>
          <dd>${this._phone.connectivity.infrared}</dd>
          <dt>GPS</dt>
          <dd>${this._phone.connectivity.gps}</dd>
        </dl>
      </li>
      <li>
        <span>Android</span>
        <dl>
          <dt>OS Version</dt>
          <dd>${this._phone.android.os}</dd>
          <dt>UI</dt>
          <dd>${this._phone.android.ui}</dd>
        </dl>
      </li>
      <li>
        <span>Size and Weight</span>
        <dl>
          <dt>Dimensions</dt>
          <dd>${this._phone.sizeAndWeight.dimensions[0]}</dd>
          <dd>${this._phone.sizeAndWeight.dimensions[1]})</dd>
          <dd>${this._phone.sizeAndWeight.dimensions[2]}</dd>
          <dt>Weight</dt>
          <dd>${this._phone.sizeAndWeight.weight}</dd>
        </dl>
      </li>
      <li>
        <span>Display</span>
        <dl>
          <dt>Screen size</dt>
          <dd>${this._phone.display.screenSize}</dd>
          <dt>Screen resolution</dt>
          <dd>${this._phone.display.screenResolution}</dd>
          <dt>Touch screen</dt>
          <dd>${this._phone.display.touchScreen}</dd>
        </dl>
      </li>
      <li>
        <span>Hardware</span>
        <dl>
          <dt>CPU</dt>
          <dd>${this._phone.hardware.cpu}</dd>
          <dt>USB</dt>
          <dd>${this._phone.hardware.usb}</dd>
          <dt>Audio / headphone jack</dt>
          <dd>${this._phone.hardware.audioJack}</dd>
          <dt>FM Radio</dt>
          <dd>${this._phone.hardware.fmRadio}</dd>
          <dt>Accelerometer</dt>
          <dd>${this._phone.hardware.accelerometer}</dd>
        </dl>
      </li>
      <li>
        <span>Camera</span>
        <dl>
          <dt>Primary</dt>
          <dd>${this._phone.camera.primary}</dd>
          <dt>Features</dt>
          <dd>${this._phone.camera.features}</dd>
        </dl>
      </li>
      <li>
        <span>Additional Features</span>
        <dd>${this._phone.additionalFeatures}</dd>
      </li>
    </ul>
        `;
    };
}