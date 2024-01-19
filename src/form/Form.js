'use strict';

export default class AppForm extends HTMLElement {
  constructor() {
    super();
    this.callback = null;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <link id="style-link" rel="stylesheet" href="./form.css">

      <form id="app-form-container">
        <fieldset id="app-form-inputs"></fieldset>
        <button id="app-form-submit-bttn" type="submit">Submit</button>
      </form>
    `;
  }

  // can we generate proper HTML and CSS from some sort of template?
  static generateRoot(shadowRootTemplate) {}
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
    console.log(this);
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
