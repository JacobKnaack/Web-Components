'use strict';

import AppElement from "../../lib/element/AppElement";

export default class AppButton extends AppElement {
  constructor() {
    super('button', {
      value: AppElement.handleAttribute,
    });
    this.shadowRoot.prepend(AppElement.combineStyles(
      AppElement.createStyles(`#${this.element.id}`,`
        background-color: rgba(51, 51, 51, 0.05);
        border-radius: 8px;
        border-width: 0;
        color: #333333;
        cursor: pointer;
        display: inline-block;
        font-family: "Haas Grot Text R Web", "Helvetica Neue", Helvetica, Arial, sans-serif;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        list-style: none;
        margin: 0;
        padding: 10px 12px;
        text-align: center;
        transition: all 200ms;
        vertical-align: baseline;
        white-space: nowrap;
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
      `),
      AppElement.createStyles(`#${this.element.id}:hover`,`
        box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
      `),
      AppElement.createStyles(`#${this.element.id}:active`,`
        background-color: rgba(51, 51, 51, 1);
        color: white;
      `)
    ));
  }
}

if (window) {
  window.customElements.define('app-button', AppButton); 
}
