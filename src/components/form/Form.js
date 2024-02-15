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
          color: #333333;
          font-weight: lighter; 
        }
        :host label:has(select) {
          display: flex;
          flex-direction: column;
        }
        :host label select {
          padding: 8px;
        }
        :host .radio-inputs {
          margin: 16px 0;
        }
        :host .radio-inputs p {
          margin: 0;
        }
        :host .radio-option {
          border: thin solid grey;
          border-radius: 5px;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          align-items: center;
          padding: 4px;
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
  static createOptionInput(name, text, values) {
    let label = document.createElement('label');
    label.textContent=text;
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
    this.callback = callback;
  }
  setLegend(text) {
    let formContainer = this.#getElement();
    let legendEl = formContainer.getElementsByTagName('legend')[0];
    if (legendEl) {
      legendEl.textContent = text;
    } else {
      legendEl = document.createElement('legend');
      legendEl.innerText = text;
      this.#getInputs().prepend(legendEl);
    }
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
      inputs.append(AppForm.createTextInput(params.id, params.label));
    } catch(e) {
      throw new Error('App Form Error: unable to create text input', { cause: e });
    }
  }
  setBackgroundColor(colorValue) {
    let container = this.#getElement();
    let styles = container.getElementsByTagName('style')[0] || document.createElement('style');
    styles.innerText += `:host form { background-color: ${colorValue};}`
    container.append(styles);
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
  window.customElements.define('app-form', AppForm);
}
