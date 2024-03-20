'use strict';

import AppElement from '../../lib/element/AppElement';

export default class AppHeading extends AppElement {
  constructor() {
    super('heading', {
      "type": (value, element) => AppElement.setElement(value, element),
    });
    this.shadowRoot.prepend(
      AppElement.createStyles(`#${this.element.id}`,
      `
        font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,sans-serif;
        font-size: 24px;
        font-weight: 700;
        font-style: normal;
        line-height: 26.4px;
        display: block;
        margin: 4px 0;
      `
    ));
  }
}

if (window) {
  window.customElements.define('app-heading', AppHeading);
}