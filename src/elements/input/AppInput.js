'use strict';

import AppElement from '../../lib/element/AppElement';

export default class AppInput extends AppElement {
  constructor() {
    super('input', {
      type: AppElement.handleAttribute,
      placeholder: AppElement.handleAttribute,
      value: AppElement.handleAttribute,
      name: AppElement.handleAttribute,
      size: AppElement.handleAttribute,
      maxlength: AppElement.handleAttribute,
      label: (name, value, element) => {
        let span = AppElement.createElement('span', {
          attributes: { class: 'input-label'}, textContent: value
        });
        let label = AppElement.mapValueToParent(name, null, element);
        label.append(span);
        return label;
      }
    });
    this.shadowRoot.prepend(AppElement.combineStyles(
      AppElement.createStyles(`*`, `
        font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
      `),
      AppElement.createStyles(`#${this.element.id}`, `
        position: relative;
        width: calc(100% - 20px);
        border-radius: 4px;
        padding: 10px;
        margin: 10px 0;
        border: none;
        outline: none;
        background-color: rgba(211, 211, 211, 0.5); /* Adjust the transparency as needed */
        backdrop-filter: blur(5px); /* Adjust the blur effect */
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;
        z-index: 9999;
        transition: 0.1s ease-in-out;
      `),
      AppElement.createStyles(`label #${this.element.id}:focus, label #${this.element.id}:not(:placeholder-shown)`, `
        margin-top: 30px;
        transition: 0.1s ease-in-out;
      `),
      AppElement.createStyles(`label`, `
        position:relative;
      `),
      AppElement.createStyles(`.input-label`, `
        position: absolute;
        display: inline-block;
        z-index: 10000;
        width: calc(100% - 8px);
        padding-left: 4px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 14px;
        pointer-events: none;
        transition: top 0.3s, font-size 0.3s;
      `),
      AppElement.createStyles(`label:focus-within .input-label, #${this.element.id}:not(:placeholder-shown) ~ .input-label`, `
        top: -20px;
        font-size: 16px;
      `),
      AppElement.createStyles(`label #${this.element.id}::placeholder`, `
        color: transparent;
        transition: 0.2s ease-in-out;
      `),
      AppElement.createStyles(`label #${this.element.id}:focus::placeholder`, `
        color: darkgrey;
        transition: 0.2s ease-in-out;
      `)
    ));
  }
}

if (window) {
  window.customElements.define('app-input', AppInput);
}
