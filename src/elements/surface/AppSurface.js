'use strict';

import AppElement from '../../lib/element/AppElement';

export default class AppSurface extends AppElement {
  constructor() {
    super('surface');
    this.shadowRoot.append(
      AppElement.createStyles(`#${this.element.id}`,`
        display: inline-block;
        padding: 4px;
        background: rgba(211, 211, 211, 0.2); /* Background color with opacity */
        backdrop-filter: blur(10px); /* Apply a blur effect */
        -webkit-backdrop-filter: blur(10px); /* For Safari */
        border-radius: 5px; /* Adjust as needed */
        transition: 0.5s ease-in-out;
      `),
      AppElement.createStyles(`#${this.element.id}:hover`,`
        transition: 0.5s ease-in-out;
        background: rgba(0,0,0,0.65);
        color: white;
      `)
    )
  }
}

if (window) {
  window.customElements.define('app-surface', AppSurface);
}