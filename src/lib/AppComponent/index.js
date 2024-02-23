'use strict';

export default class AppComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }
  static parseAttribute(string, attribute) {
    let parser = new DOMParser();
    let doc = parser.parseFromString(string, 'text/html');
    let element = doc.querySelector('*');
    if (element && element.hasAttribute(attribute)) {
      return element.getAttribute(attribute);
    } else {
      return null
    }
  }

  render(element) {
    if (element) {
      element.append(this);
    } else {
      document.currentScript.insertAdjacentElement('afterend', this);
    }
  }
}
