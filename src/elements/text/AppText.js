'use strict';

import AppElement from '../../lib/element/AppElement';

export default class AppText extends AppElement {
  constructor() {
    super('text');
    this.shadowRoot.append(AppElement.combineStyles(
      AppElement.createStyles(`#${this.element.id}`,`
        display: block;
        font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,sans-serif;
        font-size: 1rem;
        font-weight: 400;
        font-style: normal;
        line-height: 20px;
      `),
      AppElement.createStyles(`#${this.element.id}.light`, `
        font-weight: 200;
      `),
    ))
  }
}

if (window) {
  window.customElements.define('app-text', AppText);
}
