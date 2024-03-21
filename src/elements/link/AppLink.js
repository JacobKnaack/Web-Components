'use strict';

import AppElement from '../../lib/element/AppElement';

export default class AppLink extends AppElement {
  constructor() {
    super('link', {
      href: AppElement.handleAttribute
    });
    this.shadowRoot.prepend(
      AppElement.createStyles(`#${this.element.id}`,
        `
        display: inline-block;
        `
      ));
  }
}

if (window) {
  window.customElements.define('app-link', AppLink);
}
