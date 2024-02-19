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
          border-radius: 5px;
          box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
          background-color: #ffffff;
        }
        :host #app-menu-list {
          padding: 0 8px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        :host #app-menu-list.vertical {
          min-width: 200px;
          flex-direction: column;
        }
        :host #app-menu-list.horizontal {
          min-width: 300px;
          flex-direction: row;
        }
        :host .app-menu-list-button {
          background: none;
          border: none;
          font: inherit;
          cursor: pointer;
          width: 100%;
        }
        :host #app-menu-list.vertical .app-menu-list-item {
          width: 85%;
        }
        :host #app-menu-list.horizontal .app-menu-list-item {
          width: 100px;
          text-align: center;
        }
        :host .app-menu-list-item {
          list-style: none;
          border-radius: 5px;
          height: 20px;
          line-height: 20px;
          font-size: 1em;
          text-size-adjust: 100%;
          -webkit-text-size-adjust: 100%;
          margin: 4px 0;
          padding: 8px 12px;
        }
        :host .app-menu-list-item.active-list-item {
          background-color: darkgrey;
        }
        :host .app-menu-list-item:hover {
          background-color: #efefef;
        }
        :host .app-menu-list-item:active {
          animation-name: shrink;
          animation-duration: 100ms;
        }
        :host #app-menu-list.vertical .app-menu-list-button {
          text-align: left;
        }
        @keyframes shrink {
          0% {
            font-size: 1em;
          }
          50% {
            font-size: .9em;
          }
          100% {
            font-size: 1em;
          }
        }
      </style>

      <div id="app-menu-container">
        <ul id="app-menu-list" class="vertical"></ul>
      </div>
    `;
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
  setType(type) {
    let list = this.#getList();
    switch(type) {
      case 'vertical':
        list.classList.remove('horizontal');
        list.classList.add('vertical');
        break;
      case 'horizontal':
        list.classList.remove('vertical');
        list.classList.add('horizontal');
        break;
      case 'grid':
      default:
        throw new Error('App Menu Error: unable to set type ' + type);
    }
  }
  addItem(text, onClick) {
    let items = this.#getList();
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.classList.add('app-menu-list-button');
    listItem.classList.add('app-menu-list-item');
    button.textContent = text;
    listItem.append(button);
    if (onClick) {
      button.addEventListener('click', onClick);
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