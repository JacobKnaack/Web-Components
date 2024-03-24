'use strict';

import AppComponent from '../../lib/component/AppComponent.js';

export default class AppModal extends AppComponent {
  constructor() {
    super('app-modal');
    this.shadowRoot.innerHTML = `
      <style id="app-modal-styles">
        :host {
          font-family: Ariel, sans-serif;
        }
        :host #app-modal-background {
          z-index: 9999;
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(50, 50, 50, 0.5);
        }
        :host #app-modal-background.hidden {
          display: none;
        }
        :host #app-modal-container {
          z-index: 10000;
          position: relative;
          top: 20%;
          margin: 0 auto;
          min-width: 500px;
          min-height: 200px;
          padding: 20px;
          border: 1px solid #888;
          border-radius: 10px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* box shadow effect */
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        :host #app-modal-container #app-modal-heading {
          margin: 0 0 4px 0;
          
        }
        :host #app-modal-control {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          border: none;
        }
        :host #app-modal-control .app-modal-control-btn {
          margin: 0px 4px;
          border: 0;
          min-width: 75px;
          border-radius: 5px;
          box-sizing: border-box;
          padding: .25rem 8px;
          color: #111827;
          line-height: 1.25rem;
          text-align: center;
          box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          cursor: pointer;
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
        }
        :host #close-button {
          position: absolute;
          top: 8px;
          right: 12px;
          margin: 4px 0;
          background-color: transparent;
          color: #666666; /* Grey color */
          border: none;
          cursor: pointer;
          border-radius: 50%;
          font-size: 20px;
          line-height: 0;
          width: 25px;
          height: 25px;
          text-align: center;
        }
      </style>

      <div id="app-modal-background" class="hidden">
        <dialog id="app-modal-container">
          <button data-testid="modal-close" id="close-button">x</button>
        </dialog>
      </div>
    `;
  }
  connectedCallback() {
    let background = this.#getElement();
    let closeBtn = background.querySelector('#close-button');
    background.addEventListener('click', (e) => {
      if (e.target === background) {
        this.close();
      }
    });
    closeBtn.addEventListener('click', this.close);
  }

  #getElement() {
    return this.shadowRoot.querySelector('#app-modal-background');
  }
  #getDialog() {
    return this.#getElement().querySelector('#app-modal-container');
  }
  // Makes Modal visible
  show = () => {
    //
    let background = this.#getElement();
    let dialog = background.querySelector('#app-modal-container');
    dialog.setAttribute('open', true);
    background.classList.remove('hidden');
  }
  // Hides Modal contents
  close = (e) => {
    let background = this.#getElement();
    let dialog = background.querySelector('#app-modal-container');
    dialog.setAttribute('open', false);
    background.classList.add('hidden');
  }
  setHeading(headingText) {
    let dialog = this.#getDialog();
    let headingElement = dialog?.querySelector('#app-modal-heading') || document.createElement('h2');
    if (!headingElement.hasAttribute('id')) {
      headingElement.setAttribute('id', 'app-modal-heading');
    }
    headingElement.textContent = headingText;
    dialog.prepend(headingElement);
  }
  setBody(bodyText) {
    let dialog = this.#getDialog();
    let bodyElement = dialog?.querySelector('#app-modal-text') || document.createElement('p');
    if (!bodyElement.hasAttribute('id')) {
      bodyElement.setAttribute('id', 'app-modal-text');
    }
    bodyElement.textContent = bodyText;
    dialog.append(bodyElement);
  }
  addButton(buttonText, options) {
    let dialog = this.#getDialog();
    let modalControl = dialog?.querySelector('#app-modal-control') || document.createElement('fieldset');
    if (!modalControl.hasAttribute('id')) {
      modalControl.setAttribute('id', 'app-modal-control');
    }
    let button = document.createElement('button');
    button.classList.add('app-modal-control-btn');
    button.textContent = buttonText;
    button.addEventListener('click', options.onClick);
    modalControl.appendChild(button);
    dialog.append(modalControl);
  }
}

if (window) {
  window.customElements.define('app-modal', AppModal);
}
