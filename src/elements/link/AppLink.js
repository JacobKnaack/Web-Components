'use strict';

import AppElement from '../../lib/element/AppElement';

export default class AppLink extends AppElement {
  constructor() {
    super('link', {
      href: AppElement.handleAttribute,
      alt: AppElement.handleAttribute
    });
    this.shadowRoot.prepend(
      AppElement.createStyles(`#${this.element.id}`,`
        display: inline-block;
        font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,sans-serif;
      `)
    );
  }
}

if (window) {
  window.customElements.define('app-link', AppLink);
}
