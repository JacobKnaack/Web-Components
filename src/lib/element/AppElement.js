'use strict';

export const elementTypes = {
  button: 'button',
  text: 'p',
  heading: 'h1',
  input: 'input',
  link: 'a',
  surface: 'div',
  image: 'img'
};
export const attributeTypes = {
  label: ['for'],
}

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
          for (let node of mutation.addedNodes) {
            if (node instanceof HTMLElement) {
              this.updateInnerHTML(node);
            } else {
              if (node.textContent && node.textContent.trim()) {
                this.updateTextContent();
              }
            }
          }
        }
      }
    });

    // Observe changes to child nodes
    this.observer.observe(this, { childList: true });
  }
  static createElement(name, config = {}) {
    let element = document.createElement(name);
    for (let attribute in config.attributes) {
      element.setAttribute(attribute, config.attributes[attribute]);
    }
    if (config.textContent) {
      element.textContent = config.textContent;
    }
    return element;
  }
  static setElement(key, type, replace) {
    let newElement = document.createElement(type);
    if (replace.id) {
      newElement.setAttribute('id', replace.id);
    }
    replace.parentNode.replaceChild(newElement, replace);
    return newElement;
  }
  static mapValueToAttribute(key, value, element) {
    element.setAttribute(key, value);
  }
  static mapValueToParent(elementName, elementText, child) {
    let element = AppElement.createElement(elementName, {
      textContent: elementText
    });
    if (child) element.appendChild(child);
    return element;
  }
  static handleAttribute(name, value, element) {
    element.setAttribute(name, value);
  }
  static createStyles(selectors, css) {
    let styles = document.createElement('style');
    styles.innerHTML = `
      :host ${selectors} {${css}}
    `;
    return styles;
  }
  static combineStyles(...args) {
    let combined = document.createElement('style');
    for (let stylesheet of args) {
      combined.innerHTML += stylesheet.innerHTML
    }
    return combined
  }
  connectedCallback() {
    for (let key in this.attributeList) {
      if (this.hasAttribute(key)) {
        let value = this.getAttribute(key);
        let result = this.attributeList[key](key, value, this.element);
        if (result) {
          this.element = result;
          this.shadowRoot.append(result);
        }
      }
    }
  }
  updateInnerHTML(node) {
    this.element.appendChild(node);
  }
  updateTextContent() {
    this.element.textContent = this.textContent.trim();
  }
}
