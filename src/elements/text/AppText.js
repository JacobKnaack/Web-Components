'use strict';

import AppElement from '../../lib/element/AppElement';

export default class AppText extends AppElement {
  constructor() {
    super('text');
    this.shadowRoot.append(
      AppElement.createStyles(`#${this.element.id}`,`
        display: block;
      `)
    )
  }
}

if (window) {
  window.customElements.define('app-text', AppText);
}
