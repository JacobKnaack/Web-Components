'use strict';

export default class AppForm extends HTMLElement {
  constructor() {
    super();
    this.callback = null;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style id="app-form-styles">
        :host {
          background-color: #ffffff;
          display: inline-block;
          min-width: 300px;
        }

        :host form {
          max-width: 900px;
          padding: 8px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          font-family: 'Arial', sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        :host fieldset {
          border: none;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          padding: 40px 20px 20px 20px;
          margin-bottom: 12px;
          background-color: #ffffff;
        }

        :host legend {
          position: relative;
          top: 28px;
          font-size: 18px;
          color: #333333;
          font-weight: bold;
          margin-bottom: 10px;
        }

        :host input,
        button {
          width: 100%;
          padding: 8px;
          margin-bottom: 16px;
          border: 1px solid #cccccc;
          border-radius: 4px;
          box-sizing: border-box;
          font-size: 14px;
        }

        :host button[type="submit"] {
          background-color: #4caf50;
          width: 100px;
          color: #ffffff;
          cursor: pointer;
        }

        :host button[type="submit"]:hover {
          background-color: #45a049;
        }

        :host label {
          display: block;
          margin-bottom: 8px;
          color: #333333;
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
    input.required = true;
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
    this.callback(values);
  }
  onSubmit(callback) {
    this.callback = callback;
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
  addInput(type, params) {
    let inputs = AppForm.getInputs();
    switch(type) {
      case 'text':
        inputs.append(AppForm.createTextInput(params.id, params.label));
        break;
      default:
        throw new Error('Error creating new input');
    }
  }
  setBackgroundColor(colorValue) {
    let container = AppForm.getElement();
    let styles = container.getElementsByTagName('style')[0] || document.createElement('style');
    styles.innerText += `:host form { background-color: ${colorValue};}`
    container.append(styles);
  }
}

if (window) {
  window.customElements.define('app-form', AppForm);
}
