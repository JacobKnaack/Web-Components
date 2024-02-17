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
          background-color: #1D438A;
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
        :host nav a.active-location {
          border-bottom: thin solid red;
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
    `;
  }
  connectedCallback() {
    let children = Array.from(this.#getElement().children);
    for (let child in children) {
      let url = children[child].href;
      let withoutOrigin = new URL(url).pathname + new URL(url).search + new URL(url).hash;
      if (location.pathname === withoutOrigin) {
        children[child].classList.add('active-location');
      }
    }
  }
  #getElement() {
    return this.shadowRoot.querySelector('#app-nav-container');
  };
  addItem(label, url) {
    let container = this.#getElement();
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.textContent = label;
    container.appendChild(anchor);
  }
  render(element) {
    if (element) {
      element.append(this);
    } else {
      document.currentScript.insertAdjacentElement('afterend', this);
    }
  }
}

if (window) {
  window.customElements.define('app-nav', AppNavigation);
}
