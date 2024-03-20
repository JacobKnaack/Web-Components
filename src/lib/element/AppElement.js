'use strict';

const elementTypes = {
  button: 'button',
  text: 'p',
  heading: 'h1',
  input: 'input',
  link: 'a',
  surface: 'div',
  image: 'img'
};

export default class AppElement extends HTMLElement {
  constructor(type, attributeList) {
    let element = document.createElement(elementTypes[type]);
    element.setAttribute('id', `app-${type}`);
    super()
      .attachShadow({ mode: 'open'})
      .append(element);
    this.element = element;
    this.attributeList = attributeList || {};

    // Create a MutationObserver to observe changes to text content
    this.observer = new MutationObserver(mutationsList => {
      for (let mutation of mutationsList) {
        if (mutation.type === 'childList') {
          this.updateTextContent();
        }
      }
    });

    // Observe changes to child nodes
    this.observer.observe(this, { childList: true });
  }
  static setElement(elementType, replace) {
    let newElement = document.createElement(elementType);
    if (replace.id) {
      newElement.setAttribute('id', replace.id);
    }
    replace.parentNode.replaceChild(newElement, replace);
    return newElement;
  }
  static createStyles(selectors, css) {
    let styles = document.createElement('style');
    styles.innerHTML = `
      :host ${selectors} {${css}}
    `;
    return styles;
  }
  connectedCallback() {
    for (let key in this.attributeList) {
      if (Array.isArray(this.attributeList)) {
        // TODO, deal with a list of string values rather strings and functions;
      }
      if (this.hasAttribute(key)) {
        let value = this.getAttribute(key);
        this.element = this.attributeList[key](value, this.element);
      }
    }
  }
  updateTextContent() {
    this.element.textContent = this.textContent.trim();
  }
}
