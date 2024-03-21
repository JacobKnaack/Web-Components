'use strict';

import AppElement from '../../lib/element/AppElement';

export default class AppInput extends AppElement {
  constructor() {
    super('input', {
      type: AppElement.handleAttribute,
      placeholder: AppElement.handleAttribute
    });
    this.shadowRoot.prepend(
      AppElement.createStyles(`#${this.element.id}`, ``)
    );
  }
}

if (window) {
  window.customElements.define('app-input', AppInput);
}
