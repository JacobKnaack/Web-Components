'use strict';

export default class AppForm extends HTMLElement {
  constructor() {
    super();
    this.callback = null;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          padding: 8px;
          max-width: 900px;
          margin: 0 auto;
        }
        :host fieldset {
          display: flex;
          flex-direction: column;
        }
        :host input {
            margin: 0 4px;
          }
        :host label {
          margin: 4px;
        }
      </style>
      <form id="app-form-container">
        <fieldset id="app-form-inputs"></fieldset>
        <button id="app-form-submit-bttn" type="submit">Submit</button>
      </form>
    `;
  }

  static getElement() {
    let container = document.querySelector('app-form');
    return container.shadowRoot.querySelector('#app-form-container');
  }
  static getInputs() {
    return AppForm.getElement().getElementsByTagName('fieldset')[0];
  }
  static createTextInput(name, text) {
    let input = document.createElement('input');
    let label = document.createElement('label');
    input.type = 'text';
    input.name = name;
    input.id = name;
    label.textContent = text;
    label.for = name;
    label.appendChild(input);
    return label;
  }

  connectedCallback() {
    let formContainer = AppForm.getElement();
    formContainer.addEventListener('submit', this.handleSubmit);
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const values = {}
    let formInputs = e.target.getElementsByTagName('input');
    for (let el of formInputs) {
      values[el.id] = el.value; 
    }
    console.log(this);
    this.callback(values);
  }
  onSubmit(callback) {
    this.callback = callback;
    console.log(this);
  }
  setLegend(text) {
    let formContainer = AppForm.getElement();
    let legendEl = formContainer.getElementsByTagName('legend')[0];
    if (legendEl) {
      legendEl.textContent = text;
    } else {
      legendEl = document.createElement('legend');
      legendEl.innerText = text;
      AppForm.getInputs().prepend(legendEl);
    }
  }
  addInput(type, id, labelText) {
    let inputs = AppForm.getInputs();
    switch(type) {
      case 'text':
        inputs.append(AppForm.createTextInput(id, labelText));
        break;
      default:
        throw new Error('Error creating new input');
    }
  }
}

if (window) {
  window.customElements.define('app-form', AppForm);
}