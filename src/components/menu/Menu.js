'use strict';

export default class AppMenu extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style id="app-menu-styles">
        :host {
         font-family: 'Arial', sans-serif;
        }
        :host #app-menu-container {
          display: inline-block;
          min-width: 200px;
          border-radius: 5px;
          box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
        }
        :host #app-menu-list {
          padding: 0 8px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        :host .app-menu-list-item {
          list-style: none;
          border-radius: 5px;
          width: 85%;
          margin: 4px 0;
          padding: 8px 12px;
        }
        :host .app-menu-list-item.active-list-item {
          background-color: darkgrey;
        }
        :host .app-menu-list-item:hover {
          background-color: #efefef;
        }
      </style>

      <div id="app-menu-container">
        <ul id="app-menu-list"></ul>
      </div>
    `
  }
  connectedCallback() {
    let list = this.#getList();
    let listItems = Array.from(list.children);
    list.addEventListener('click', (e) => {
      let itemClicked = e.target;
      listItems.forEach(item => {
        if (item === itemClicked) {
          item.classList.add('active-list-item');
        } else {
          item.classList.remove('active-list-item');
        }
      });
    });
  }

  #getList() {
    return this.shadowRoot.querySelector('#app-menu-list');
  }
  addItem(text, onClick) {
    let items = this.#getList();
    let listItem = document.createElement('li');
    listItem.classList.add('app-menu-list-item');
    listItem.textContent = text;
    if (onClick) {
      listItem.addEventListener('click', onClick);
    }
    items.appendChild(listItem);
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
  window.customElements.define('app-menu', AppMenu);
}