'use strict';

import AppComponent from '../../lib/AppComponent/index.js';

export default class AppForm extends AppComponent {
  constructor() {
    super();
    this.callback = null;
    this.shadowRoot.innerHTML = `
      <style id="app-form-styles">
        :host {
          background-color: #ffffff;
          display: inline-block;
          min-width: 300px;
          border-radius: 5px;
        }

        :host form {
          max-width: 900px;
          padding: 8px;
          border-radius: 5px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          font-family: 'Arial', sans-serif;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        :host form.hide {
          background: none;
          box-shadow: none;
          border: none
        }

        :host fieldset {
          border-radius: 8px;
          border: thin solid lightgrey;
          padding: 0 20px 4px 20px;
          margin-bottom: 12px;
          background-color: #ffffff;
        }
        :host fieldset.hide {
          background: none;
          box-shadow: none;
          border: none;
        }

        :host #form-legend {
          display: none;
        }

        :host #form-heading {
          font-weight: bold;
          font-size: 18px;
          color: #333333;
        }

        :host input,
        button {
          width: 100%;
          padding: 8px;
          margin-bottom: 8px;
          border: 1px solid #cccccc;
          border-radius: 4px;
          box-sizing: border-box;
          font-size: 14px;
        }

        :host button[type="submit"] {
          background-color: #003B4A;
          width: 100px;
          color: #ffffff;
          cursor: pointer;
        }

        :host button[type="submit"]:hover {
          background-color: #00BFB2;
        }
        :host label {
          display: block;
          color: #333333;
          font-weight: lighter;
          margin: 8px 0;
        }
        :host .label-text {
          padding-left: 4px;
        }
        :host label:has(select) {
          display: flex;
          flex-direction: column;
        }
        :host label select {
          padding: 8px;
          border: thin solid lightgrey;
          border-radius: 5px;
        }
        :host .radio-inputs {
          margin: 16px 0;
        }
        :host .radio-inputs p {
          margin: 0;
        }
        :host .radio-option {
          border: thin solid lightgrey;
          border-radius: 5px;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          padding: 4px;
          margin: 2px 0;
        }
        :host .radio-option input {
          width: auto;
          margin: 0 8px;
        }
      </style>

      <form id="app-form-container">
        <fieldset id="app-form-inputs"></fieldset>
        <button id="app-form-submit-btn" type="submit">Submit</button>
      </form>
    `;
  }
  static normalizeLabel(text) {
    return text.replace(/\s+/g, '-').toLowerCase();
  }
  static createInputLabel(text) {
    let label = document.createElement('label');
    let labelText = document.createElement('span');
    labelText.textContent = text;
    labelText.classList.add('label-text');
    label.append(labelText);
    return label;
  }
  static createTextInput(name, text, options) {
    let input = document.createElement('input');
    let label = AppForm.createInputLabel(text);
    label.setAttribute('for', name);
    let { required } = options ? options : {};
    input.setAttribute('type', 'text');
    input.setAttribute('name', name);
    input.setAttribute('id', name);
    label.appendChild(input);
    if (required) {
      input.setAttribute('required', true);
      let span = document.createElement('span');
      span.textContent = '*';
      span.setAttribute('style', 'color: red; font-size: 1em; margin: 0 4px;')
      label.prepend(span);
    }
    return label;
  }
  static createOptionInput(name, text, values) {
    let label = AppForm.createInputLabel(text);
    label.setAttribute('for', name);
    let input = document.createElement('select');
    input.setAttribute('id', name);
    input.setAttribute('name', name);
    values.forEach(value => {
      let option = document.createElement('option');
      if (value.value && value.text) {
        option.setAttribute('value', value.value);
        option.textContent = value.text;
      } else {
        option.setAttribute('value', value.replace(/\s+/g, '-').toLowerCase());
        option.textContent = value;
      }
      input.appendChild(option);
    });
    label.appendChild(input);
    return label;
  }
  static createRadioInput(name, text, values) {
    let container = document.createElement('section');
    container.setAttribute('id', `${name}-input-container`);
    container.classList.add('radio-inputs');
    let label = document.createElement('p');
    label.textContent = text;
    label.classList.add('label-text');
    container.appendChild(label);
    values.forEach(value => {
      let optionContainer  = document.createElement('div');
      optionContainer.classList.add('radio-option');
      let inputText = document.createElement('label');
      inputText.setAttribute('for', value.value || AppForm.normalizeLabel(value));
      inputText.textContent = value.text || value;
      let button = document.createElement('input');
      button.setAttribute('type', 'radio');
      button.setAttribute('id', value.value || AppForm.normalizeLabel(value));
      button.setAttribute('name', name);
      optionContainer.appendChild(button);
      optionContainer.appendChild(inputText);
      container.appendChild(optionContainer);
    });
    return container;
  }

  #getInputs() {
    return this.#getElement().getElementsByTagName('fieldset')[0];
  }
  #getElement() {
    return this.shadowRoot.querySelector('#app-form-container');
  }
  connectedCallback() {
    let formContainer = this.#getElement();
    formContainer.addEventListener('submit', this.handleSubmit);
  }
  handleSubmit = (e) => {
    e.preventDefault();

    const values = {}
    let formInputs = [
      ...e.target.getElementsByTagName('input'),
      ...e.target.getElementsByTagName('select')
    ];
    for (let el of formInputs) {
      values[el.id] = el.type === 'radio' ? el.checked : el.value; 
    }
    if (this.callback) {
      this.callback(values);
    } else {
      console.warn('No Form Submission event, provide a callback to onSubmit');
    }
  }
  onSubmit(callback) {
    if (typeof callback === 'function') {
      this.callback = callback;
    } else {
      throw new Error('App Form Error: callback must be a function');
    }
  }
  setLegend(text) {
    let legendEl = this.shadowRoot.getElementById('form-legend');
    let headingEl = this.shadowRoot.getElementById('form-heading');
    if (legendEl) {
      legendEl.textContent = text;
      headingEl.textContent = text;
    } else {
      legendEl = document.createElement('legend');
      legendEl.setAttribute('id', 'form-legend');
      legendEl.setAttribute('aria-hidden', 'true');
      legendEl.textContent = text;
      headingEl = document.createElement('h3');
      headingEl.setAttribute('id', 'form-heading');
      headingEl.textContent = text;
      this.#getInputs().prepend(headingEl);
      this.#getInputs().prepend(legendEl);
    }
  }
  setButtonText(text) {
    let submitButton = this.shadowRoot.querySelector('#app-form-submit-btn');
    submitButton.textContent = text;
  }
  addDatePicker(params) {
    let inputs = this.#getInputs();
    let id = params.id ? params.id : AppForm.normalizeLabel(params);
    let label = AppForm.createInputLabel(params.label || params);
    let input = document.createElement('input');
    label.setAttribute('for', id);
    input.setAttribute('type', 'date');
    input.setAttribute('id', id);
    input.setAttribute('name', id);
    label.appendChild(input);
    inputs.appendChild(label);
  }
  addRadioInput(params) {
    let inputs = this.#getInputs();
    try {
      inputs.append(AppForm.createRadioInput(params.id, params.label, params.values));
    } catch (e) {
      throw new Error('App Form Error: unable to create radio input', { cause: e });
    }
  }
  addOptionInput(params) {
    let inputs = this.#getInputs();
    try {
      inputs.append(AppForm.createOptionInput(params.id, params.label, params.values));
    } catch(e) {
      throw new Error('App Form Error: unable to create option input', { cause: e });
    }
  }
  addTextInput(params) {
    let inputs = this.#getInputs();
    try {
      inputs.append(AppForm.createTextInput(
        params.id,
        params.label,
        { required: params.required }
      ));
    } catch(e) {
      console.log(e);
      throw new Error('App Form Error: unable to create text input', { cause: e });
    }
  }
  setBackgroundColor(colorValue) {
    let container = this.#getElement();
    let styles = container.getElementsByTagName('style')[0] || document.createElement('style');
    styles.innerText += `:host form { background-color: ${colorValue};}`
    container.append(styles);
  }
  setBackground(backgroundType) {
    let container = this.#getElement();
    let fieldset = this.#getInputs();
    switch(backgroundType) {
      case 'none':
        container.classList.add('hide');
        fieldset.classList.remove('hide');
        break;
      case 'transparent':
        container.classList.add('hide');
        fieldset.classList.add('hide');
        break;
      default:
        container.classList.add(backgroundType);
        fieldset.classList.add(backgroundType);
    }
  }
}

if (window) {
  window.customElements.define('app-form', AppForm);
}
