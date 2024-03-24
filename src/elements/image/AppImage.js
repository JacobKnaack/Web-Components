'use strict';

import AppElement from '../../lib/element/AppElement';

export default class AppImage extends AppElement {
  constructor() {
    super('image', {
      src: AppElement.handleAttribute
    });
    this.shadowRoot.prepend(
      AppElement.createStyles(`#${this.element.id}`,`
        display: inline-block;
      `)
    );
  }
}

if (window) {
  window.customElements.define('app-image', AppImage);
}
