'use strict';

import AppComponent from '../../lib/AppComponent/index.js';

export default class AppNavigation extends AppComponent {
  constructor() {
    super('app-nav');
    this.shadowRoot.innerHTML = `
      <style id="app-nav-styles">
        :host {
          display: inline-block;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        :host(.full), :host .full {
          display: block;
          width: 100%;
        }

        :host #app-nav-container {
          color: #ffffff;
          background-color: #1D438A;
          overflow: hidden;
          border-radius: 5px;
          display:inline-block;
        }

        :host #app-navigation {
          display: inline-block;
          height: 100%;
          vertical-align: bottom;
        }

        :host h2 {
          display: inline-block;
          margin: 8px 20px;
          vertical-align: top;
        }

        :host nav a {
          color: inherit;
          float: left;
          display: block;
          text-align: center;
          padding: 14px 16px;
          text-decoration: none;
        }

        :host nav a:hover {
          background-color: lightgrey;
        }
        :host nav a.active-location {
          background-color: #555555;
        }

        @media screen and (max-width: 600px) {
          :host #app-nav-container, :host #app-navigation {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%
          }
          :host a {
            width: 100%;
          }
        }
      </style>

      <div id="app-nav-container">
        <nav id="app-navigation"></nav>
      </div>
    `;
  }
  connectedCallback() {
    let children = Array.from(this.#getNav().children);
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
  #getNav() {
    let container = this.#getElement();
    return container.querySelector('#app-navigation');
  }
  addItem(label, url) {
    let container = this.#getNav();
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.textContent = label;
    container.appendChild(anchor);
  }
  addTitle(text) {
    let container = this.#getElement();
    const title = document.createElement('h2');
    title.textContent = text;
    container.prepend(title);
  }
  setType(navType) {
    let container = this.#getElement();
    switch(navType) {
      case 'full':
        this.shadowRoot.host.classList.add('full');
        container.classList.add('full');
      default:
        console.log(navType);
    }
  }
  setBackgroundColor(colorValue) {
    let container = this.#getElement();
    container.setAttribute('style', `background-color: ${colorValue};`);
  }
  setTextColor(colorValue) {
    let container = this.#getElement();
    let styles = container.getElementsByTagName('style')[0] || document.createElement('style');
    styles.innerText += `:host #app-nav-container { color: ${colorValue}; }`;
    container.append(styles)
  }
}

if (window) {
  window.customElements.define('app-nav', AppNavigation);
}
