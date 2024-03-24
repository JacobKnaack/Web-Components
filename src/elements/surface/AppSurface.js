'use strict';

import AppElement from '../../lib/element/AppElement';

export default class AppSurface extends AppElement {
  constructor() {
    super('surface', {
      type: (key, value, element) => AppElement.mapValueToAttribute('class', value, element),
    });
    this.shadowRoot.append(AppElement.combineStyles(
      AppElement.createStyles(`#${this.element.id}`,`
        display: inline-block;
        padding: 4px;
        border-radius: 5px; /* Adjust as needed */
        transition: 0.1s ease-in-out;
      `),
      AppElement.createStyles(`#${this.element.id}.glass`, `
        background: rgba(211, 211, 211, 0.2); /* Background color with opacity */
        backdrop-filter: blur(10px); /* Apply a blur effect */
        -webkit-backdrop-filter: blur(10px); /* For Safari */
      `),
      AppElement.createStyles(`#${this.element.id}.paper`, `
        background-color: #fff;
        border: 1px solid #ccc;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      `)
    ))
  }
}

if (window) {
  window.customElements.define('app-surface', AppSurface);
}