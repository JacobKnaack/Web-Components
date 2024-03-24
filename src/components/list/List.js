'use strict';

import AppComponent from '../../lib/component/AppComponent.js';

export default class AppList extends AppComponent {
  constructor() {
    super();
    this.shadowRoot.innerHTML = `
      <style id="app-list-styles">
        p, h1, h2, h3, h4, h5, h6{
          margin: 0;
        }
        :host {
          font-family: Ariel, sans-serif;
        }
        :host #app-list-container {
          display: inline-block;
          border-radius: 5px;
          box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
          background-color: #ffffff;
        }
        :host #app-list-title {
          font-weight: lighter;  
          text-align: center;
          padding: 16px 32px;
          padding-bottom: 16px;
          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
        }
        :host #app-list-items {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        :host #app-list-items.vertical {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        :host #app-list-items.vertical .app-list-item {
          width: calc(100% - 32px);
          margin: 2px 0;
        }
        :host #app-list-items.horizontal {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
        }
        :host #app-list-items.horizontal .app-list-item {
          width: calc(90% - 32px);
          margin: 0 2px;
        }
        :host #app-list-items.grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          grid-template-rows: 1fr;
        }
        :host #app-list-items.grid .app-list-item {
          min-width: 100px;
          min-height: 100px;
          margin: 2px;
          border-radius: 5px;
        }
        :host .app-list-item {
          padding: 16px;
          background: rgba(244, 244, 244, 0.5);
          backdrop-filter: blur(10px);
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
      </style>
      <div id="app-list-container"></div>
    `;
  }
  static #types = ['grid', 'vertical', 'horizontal'];
  static #createTitle(text) {
    let element = document.createElement('h4');
    element.textContent = text;
    element.classList.add('app-list-item-title');
    return element;
  }
  static #createText(text) {
    let element = document.createElement('p');
    element.textContent = text;
    element.classList.add('app-list-item-text');
    return element;
  }
  static #createItem(element) {
    let item = document.createElement('li');
    item.classList.add('app-list-item');
    if (element instanceof HTMLElement) {
      item.append(element);
    } else if (typeof element === 'string') {
      item.innerHTML = element;
    }
    return item;
  }
  static #createList(type) {
    let list = null;
    if (type === 'ul' || type === 'ol') {
      list = document.createElement(type);
    } else {
      list = document.createElement('ul');
    }
    list.setAttribute('id','app-list-items');
    list.classList.add('vertical');
    return list;
  }
  static #getGridSize(items) {
    // return the closest square to items.length
    console.log(items);
  }
  #findList() {
    let list = this.#getList();
    if (!list) {
      list = AppList.#createList();
      this.#getContainer().append(list);
    }
    let listItems = Array.from(list.children);
    if (listItems.length) {
      AppList.#getGridSize(listItems);
    }
    return list;
  }
  #getList() {
    return this.#getContainer().querySelector('#app-list-items');
  }
  #getContainer() {
    return this.shadowRoot.querySelector('#app-list-container');
  }
  setType(type) {
    let list = this.#findList();
    try {
      AppList.#types.forEach(listType => {
        if (type=== listType) {
          list.classList.add(listType);
        } else {
          list.classList.remove(listType);
        }
      });
    } catch(e) {
      throw new Error('Unable to set list type');
    }
  }
  /**
   * Adds a title above the list element
   * @param {String} text 
   */
  setTitle(text) {
    let container = this.#getContainer();
    let title = container.querySelector('#app-list-title');
    if (!title) {
      title = document.createElement('h2');
      title.setAttribute('id', 'app-list-title');
      container.prepend(title);
    }
    title.textContent = text;
  }
  /**
   * Adds a text element to our list element
   * @param {String} text 
   */
  addText(param) {
    let { title, text } = param;
    let item = AppList.#createItem();
    if (title) {
      let titleEl = AppList.#createTitle(title);
      item.append(titleEl);
    }
    let textElement = text ? AppList.#createText(text) : AppList.#createText(param);
    item.append(textElement);
    let list = this.#findList();
    list.append(item);
  }
  /**
   * 
   * @param {HTMLElement | String} element 
   */
  addItem(element) {
    let list = this.#findList();
    let item = AppList.#createItem(element);
    list.append(item);
  }
}

if (window) {
  window.customElements.define('app-list', AppList);
}