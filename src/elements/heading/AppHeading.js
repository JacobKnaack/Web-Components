'use strict';

import AppElement from '../../lib/element/AppElement';

export default class AppHeading extends AppElement {
  constructor() {
    super('heading', {
      "type": AppElement.setElement,
    });
    this.onMount = (element) => {
      let baseStyles = `
        font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,sans-serif;
        display: block;
        font-style: normal;
      `.trim();
      switch(element.tagName) {
        case'H1':
          this.shadowRoot.prepend(AppElement.createStyles(`#${this.element.id}`, `
            ${baseStyles}
            font-size: 2rem;
            font-weight: 700;
            line-height: 26.4px;
            margin: 12px 0;
          `));
          break;
        case'H2':
          this.shadowRoot.prepend(AppElement.createStyles(`h2#${this.element.id}`, `
            ${baseStyles}
            font-size: 1.8rem;
            font-weight: 500;
            line-height: 24px;
            margin: 8px 0;
          `));
          break;
        case'H3':
          this.shadowRoot.prepend(AppElement.createStyles(`h3#${this.element.id}`, `
            ${baseStyles}
            margin: 8px 0;
            font-size: 1.6rem;
            font-weight: 500;
            line-height: 24px;
          `));
          break;
        case'H4':
          this.shadowRoot.prepend(AppElement.createStyles(`h4#${this.element.id}`, `
            ${baseStyles}
            margin: 8px 0;
            font-size: 1.4rem;
            font-weight: 300;
            line-height: 24px;
          `));
          break;
        case'H5':
          this.shadowRoot.prepend(AppElement.createStyles(`h5#${this.element.id}`, `
            ${baseStyles}
            margin: 8px 0;
            font-size: 1.2rem;
            font-weight: 300;
            line-height: 24px;
          `));
          break;
        case'H6':
          this.shadowRoot.prepend(AppElement.createStyles(`h6#${this.element.id}`, `
            ${baseStyles}
            margin: 8px 0;
            font-size: 1rem;
            font-weight: 300;
            line-height: 24px;
          `));
          break;
        default:
          this.shadowRoot.prepend(AppElement.createStyles(`#${this.element.id}`, `
            ${baseStyles}
            font-size: 2rem;
            font-weight: 700;
            line-height: 26.4px;
            margin: 12px 0;
          `));
      }
    }
  }
}

if (window) {
  window.customElements.define('app-heading', AppHeading);
}