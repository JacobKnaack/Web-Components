'use strict';

export default class AppNavigation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="./navigation.css">
      <nav id="app-nav-container"></nav>
    `
  }
  static getElement() {
    let container = document.querySelector('app-nav');
    return container.shadowRoot.querySelector('#app-nav-container');
  };
  addItem(label, url) {
    let container = AppNavigation.getElement();
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.textContent = label;
    container.appendChild(anchor);
  }
}

if (window) {
  window.customElements.define('app-nav', AppNavigation);
}
