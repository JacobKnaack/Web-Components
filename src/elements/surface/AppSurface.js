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
        transition: 0.1s ease-in-out;
      `),
    )
  }
}

if (window) {
  window.customElements.define('app-surface', AppSurface);
}