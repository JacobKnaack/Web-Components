'use strict';

import AppComponent from '../../lib/AppComponent/index.js';

export default class AppCarousel extends AppComponent {
  constructor() {
    super();
    this.rotateInterval = null;
    this.shadowRoot.innerHTML = `
      <style id="app-carousel-styles">
        :host #app-carousel-container {
          position: relative;
          height: 100%;
        }
        :host #app-carousel-container.hero {
          height: 80vh;
        }
        :host #app-carousel-items {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
        }
        :host #app-carousel-controls {
          position: absolute;
          height: 100%;
          width: 100%;
          top: 0;
          left: 0;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
        }
        :host #app-carousel-controls #prev-button,
        :host #app-carousel-controls #next-button {
          z-index: 10001;
          top: 0;
          cursor: pointer;
          margin: 0 50px;
        }
        :host #app-carousel-controls .arrow-left {
          width: 0;
          height: 0;
          border-top: 20px solid transparent;
          border-bottom: 20px solid transparent;
          border-right: 20px solid #000;
        }
        :host #app-carousel-controls .arrow-right {
          width: 0;
          height: 0;
          border-top: 20px solid transparent;
          border-bottom: 20px solid transparent;
          border-left: 20px solid #000;
        }
        :host .app-carousel-item {
          position: relative;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        :host .app-carousel-item .cta {
          position: absolute;
          bottom: 40%;
          z-index: 10000;
        }
        :host .app-carousel-item figcaption {
          position: absolute;
          display: inline-block;
          width: calc(100% - 16px);
          min-height: 20%;
          padding: 8px;
          bottom: 0;
          text-align: center;
          background: rgba(220,220,220,0.5);
          font-family: Ariel, sans-serif;
          font-size: 1.25em;
          text-shadow: 1px 1px 1px #fff;
        }
        :host .app-carousel-item.hidden {
          display: none;
        }
        :host #app-carousel-items.right .app-carousel-item.active {
          animation: appearLeft 250ms ease-in-out;
        }
        :host #app-carousel-items.right .app-carousel-item:not(.active) {
          animation: removeRight 250ms ease-in-out;
        }
        :host #app-carousel-items.left .app-carousel-item.active {
          animation: appearRight 250ms ease-in-out;
        }
        :host #app-carousel-items.left .app-carousel-item:not(.active) {
          animation: removeLeft 250ms ease-in-out;
        }

        @keyframes removeRight {
          0%  {
            transform: translateX(0px);
          }
          100% {
            transform: translateX(100vw);
          }
        }
        @keyframes removeLeft {
          0% {
            transform: translateX(0px);
          }
          100% {
            transform: translateX(-100vw);
          }
        }
        @keyframes appearRight {
          0% {
            transform: translateX(100vw);
          }
          100% {
            transform: translateX(0px);
          }
        }
        @keyframes appearLeft {
          0%  {
            transform: translateX(-100vw);
          }
          100% {
            transform: translateX(0px);
          }
        }
      </style>

      <section id="app-carousel-container" class="hero">
        <div id="app-carousel-items" class="right"></div>
        <div id="app-carousel-controls">
          <button id="prev-button"><div data-testid="prev-arr" class="arrow-left"></div></button>
          <button id="next-button"><div data-testid="next-arr" class="arrow-right"></div></button>
        </div>
      </section>
    `;
  }
  static #createCallToAction(text, callback) {
    try {
      let button = document.createElement('button');
      button.textContent = text;
      button.classList.add('cta');
      if (callback) button.addEventListener('click', callback);
      return button;
    } catch (e) {
      throw new Error('Unable to create call to action button', { cause: e });
    }
  }
  static #createItem() {
    let item = document.createElement('figure');
    item.classList.add('app-carousel-item');
    return item;
  }
  static #swapActive(current, next) {
    current.classList.remove('active');
    setTimeout(() => {
      current.classList.add('hidden');
    }, 220);
    next.classList.remove('hidden');
    next.classList.add('active');
  }
  connectedCallback() {
    this.#handleRotation(this.#rotateRight);
    this.shadowRoot.querySelector('#prev-button').addEventListener('click', () => {
      this.#setRotation('left');
      this.#rotateRight();
    });
    this.shadowRoot.querySelector('#next-button').addEventListener('click', () => {
      this.#setRotation('right');
      this.#rotateLeft();
    });
  }
  disconnectedCallback() {
    clearInterval(this.rotateInterval);
  }
  #handleRotation(handler, int) {
    if (parseInt(int)) {
      this.rotateInterval = setInterval(handler, int);
    } else if (this.rotateInterval !== 0) {
      this.rotateInterval = setInterval(handler, 6000);
    }
  }
  #setRotation(direction = 'right') {
    let items = this.#getItems();
    clearInterval(this.rotateInterval);
    switch(direction) {
      case 'left':
        this.#handleRotation(this.#rotateLeft);
        items.classList.remove('right');
        items.classList.add('left');
        break;
      case 'right':
      default:
        this.#handleRotation(this.#rotateRight);
        items.classList.remove('left');
        items.classList.add('right');
    }
  }
  #rotateLeft = () => {
    let items = Array.from(this.#getItems().children);
    if (items.length > 0) {
      for (let i = 0; i < items.length; i++) {
        let current = items[i];
        let next = items[i + 1];
        if (current.classList.contains('active') && next) {
          AppCarousel.#swapActive(current, next);
          break;
        } else if (current.classList.contains('active') && !next) {
          AppCarousel.#swapActive(current, items[0]);
          break;
        }
      }
    }
  }
  #rotateRight = () => {
    let items = Array.from(this.#getItems().children);
    if (items.length) {
      for (let i = items.length - 1; i >= 0; i--) {
        let current = items[i];
        let next = items[i - 1];
        if (current.classList.contains('active') && next) {
          AppCarousel.#swapActive(current, next);
          break;
        } else if (current.classList.contains('active') && !next) {
          AppCarousel.#swapActive(current, items[items.length - 1]);
          break;
        }
      }
    }
  }
  #handleNewItem(params = null) {
    let carousel = this.#getItems();
    let items = Array.from(carousel.children);
    let item = AppCarousel.#createItem();
    if (params) {
      let { onClick, label } = params;
      let button = null;
      if (typeof onClick === 'function' && label) {
        item.addEventListener('click', onClick);
        button = AppCarousel.#createCallToAction(label);
      } else if (typeof onClick === 'function') {
        item.addEventListener('click', onClick);
        button = AppCarousel.#createCallToAction('Click Here');
      } else {
        item.addEventListener('click', params);
        button = AppCarousel.#createCallToAction('Click Here');
      }
      item.append(button);
    }
    if (!items.length) {
      item.classList.add('active');
    } else {
      item.classList.add('hidden');
    }
    return {
      carousel, item
    };
  }
  #getItems() {
    return this.#getContainer().querySelector('#app-carousel-items');
  }
  #getContainer() {
    return this.shadowRoot.querySelector('#app-carousel-container');
  }
  /**
   * 
   * @param {Number<Int>} duration 
   */
  setInterval(duration) {
    let currentDirection = this.#getItems().classList.contains('right') ? 'right': 'left';
    if (this.rotateInterval) clearInterval(this.rotateInterval);
    if (parseInt(duration) > 0) {
      this.rotateInterval = setInterval(
        currentDirection === 'right' 
          ? this.#rotateRight
          : this.#rotateLeft
        , duration);
    } else {
      this.rotateInterval = 0;
    }
  }
  /**
   * 
   * @param {String | { url: string, caption: string}} params 
   * @param {Function} onClick 
   */
  addImage(params, onClick) {
    let { carousel, item } = this.#handleNewItem(onClick);
    let image = document.createElement('img');
    if (params.caption) {
      let caption = document.createElement('figcaption');
      caption.textContent = params.caption;
      item.append(caption);
    }
    if (params.description) {
      image.setAttribute('alt', params.description);
    }
    if (params.url) {
      image.setAttribute('src', params.url);
    } else {
      image.setAttribute('src', params);
    }
    item.append(image);
    carousel.appendChild(item);
  }

  /**
   * 
   * @param {HTMLElement | String} param 
   * @param {Function | { onClick: Function, label: String}} onClick 
   */
  addItem(param, onClick) {
    try {
      let { carousel, item } = this.#handleNewItem(onClick);
      if (param instanceof HTMLElement) {
        item.append(param);
      } else {
        item.innerHTML += param.item || param;
        let description = param.caption;
        if (description) {
          let caption = document.createElement('figcaption');
          caption.textContent = description;
          item.append(caption);
        }
      }
      carousel.appendChild(item);
    } catch (e) {
      console.log(e);
      throw new Error('App Carousel Error: unable to add carousel item', { cause: e });
    }
  }
}

if (window) {
  window.customElements.define('app-carousel', AppCarousel);
}