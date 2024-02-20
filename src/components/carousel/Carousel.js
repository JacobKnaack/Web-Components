'use strict';

import AppComponent from '../../lib/component/index.js';

export default class AppCarousel extends AppComponent {
  constructor() {
    super();
    this.rotateInterval = null;
    this.shadowRoot.innerHTML = `
      <style id="app-carousel-styles">
        :host #app-carousel-container {
          position: relative;
        }
        :host #app-carousel-container.hero {
          height: 85vh;
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
        :host .app-carousel-item figcaption {
          position: absolute;
          bottom: 50%;
          text-align: center;
          width: 100%;
          display: inline-block;
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
          <button id="prev-button"><div class="arrow-left"></div></button>
          <button id="next-button"><div class="arrow-right"></div></button>
        </div>
      </section>
    `;
  }
  static #parseAttribute(string, attribute) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(string, 'text/html');
    let element = doc.querySelector('*');
    if (element && element.hasAttribute(attribute)) {
      return element.getAttribute(attribute);
    } else {
      return null
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
    if (this.rotateInterval !== 0) {
      this.rotateInterval = setInterval(this.#rotateLeft, 6000);
    }
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
  #setRotation(direction = 'right') {
    let items = this.#getItems();
    clearInterval(this.rotateInterval);
    switch(direction) {
      case 'left':
        this.rotateInterval = setInterval(this.#rotateLeft, 6000);
        items.classList.remove('right');
        items.classList.add('left');
        break;
      case 'right':
      default:
        this.rotateInterval = setInterval(this.#rotateRight, 6000);
        items.classList.remove('left');
        items.classList.add('right');
    }
  }
  #rotateRight = () => {
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
  #rotateLeft = () => {
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
  #handleNewItem(callback = null) {
    let carousel = this.#getItems();
    let items = Array.from(carousel.children);
    let item = AppCarousel.#createItem();
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
  rotationInt(duration) {
    let currentDirection = this.#getItems.classList.contains('right') ? 'right': 'left';
    if (this.rotateInterval) clearInterval(this.rotateInterval);
    if (duration > 0) {
      this.rotateInterval = setInterval(
        currentDirection === 'right' 
          ? this.#rotateRight
          : this.#rotateLeft
        , duration);
    } else {
      this.rotateInterval = 0
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
   * @param {Function} onClick 
   */
  addItem(param, onClick) {
    try {
      let { carousel, item } = this.#handleNewItem(onClick);
      if (param instanceof HTMLElement) {
        item.append(param);
      } else {
        item.innerHTML = param;
        let description = AppCarousel.#parseAttribute(param, 'data-caption');
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