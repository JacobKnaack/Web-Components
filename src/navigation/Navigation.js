'use strict';

export default class Navigation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style></style>
      <nav></nav>
    `
  }
}

if (window) {
  window.customElements.define('app-form', AppForm);
}
