'use strict';

export default class AppNavigation extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style id="app-nav-styles">
        :host {
          background-color: #ffffff;
          display: inline-block;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        :host nav {
          background-color: #333333;
          overflow: hidden;
          border-radius: 5px;
        }

        :host nav a {
          float: left;
          display: block;
          color: #ffffff;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
        }

        :host nav a:hover {
          background-color: #555555;
        }

        @media screen and (max-width: 600px) {
          :host nav {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        }
      </style>

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
