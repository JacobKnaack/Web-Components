'use strict';

import AppElement from '../../lib/element/AppElement';

export default class AppHeading extends AppElement {
  constructor() {
    super('heading', {
      "type": AppElement.setElement,
    });
    this.shadowRoot.prepend(AppElement.combineStyles(
      AppElement.createStyles(`#${this.element.id}`,`
        font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial,sans-serif;
        font-size: 2rem;
        font-weight: 700;
        font-style: normal;
        line-height: 26.4px;
        display: block;
        margin: 12px 0;
      `),
      AppElement.createStyles(`h2#${this.element.id}`,`
        margin: 8px 0;
        font-size: 1.8rem;
        font-weight: 500;
        font-style: normal;
        line-height: 24px;
      `),
      AppElement.createStyles(`h3#${this.element.id}`,`
        margin: 8px 0;
        font-size: 1.6rem;
        font-weight: 500;
        font-style: normal;
        line-height: 24px;
      `),
      AppElement.createStyles(`h4#${this.element.id}`,`
        margin: 8px 0;
        font-size: 1.4rem;
        font-weight: 300;
        font-style: normal;
        line-height: 24px;
      `),
      AppElement.createStyles(`h5#${this.element.id}`,`
        margin: 8px 0;
        font-size: 1.2rem;
        font-weight: 300;
        font-style: normal;
        line-height: 24px;
      `),
      AppElement.createStyles(`h6#${this.element.id}`,`
        margin: 8px 0;
        font-size: 1rem;
        font-weight: 300;
        font-style: normal;
        line-height: 24px;
      `)
    ));
  }
}

if (window) {
  window.customElements.define('app-heading', AppHeading);
}