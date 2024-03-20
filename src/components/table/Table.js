'use strict';

import AppComponent from '../../lib/component/AppComponent.js';

export default class AppTable extends AppComponent {
  constructor() {
    super();
    this.columns = [];
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          font-family: sans-serif;
          border-radius: 5px;
        }

        :host table {
          border-spacing: 0;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
          border-radius: 5px;
        }
        
        :host table thead {
          border-radius: 5px;
          background-color: #1D438A;
        }

        :host table thead tr {
          border-radius: 5px 5px 0 0;
          color: #fefefe;
          text-align: left;
        }

        :host table thead tr th:first-child {
          border-radius: 5px 0 0 0;
        }
        :host table thead tr th:last-child {
          border-radius: 0 5px 0 0;
        }
        :host table td {
          border-radius: 5px;
        }
        :host table th, :host table td {
          padding: 12px 15px;
        }

        :host td:nth-of-type(even) {
          background: #F2F2F2;
        }
      </style>

      <table id="app-table">
        <caption id="app-table-caption"></caption>
        <thead id="app-table-head"></thead>
        <tbody id="app-table-body"></tbody>
        <tfoot id="app-table-footer"></tfoot>
      </table>
    `;
  }
  #getFooter() {
    return this.shadowRoot.querySelector('#app-table-footer');
  }
  #getHead() {
    return this.shadowRoot.querySelector('#app-table-head');
  }
  #getBody() {
    return this.shadowRoot.querySelector('#app-table-body');
  }
  setCaption(text) {
    let container = document.querySelector('app-table');
    container.shadowRoot.querySelector('#app-table-caption').textContent = text;
  }
  addRow(value, ...args) {
    let tableBody = this.#getBody();
    let row = document.createElement('tr');
    let cell = document.createElement('td');
    cell.textContent = value;
    row.appendChild(cell);

    args.forEach(value => {
      let cell = document.createElement('td');
      cell.textContent = value;
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  }
  addColumn(value) {
    this.columns.push(value);
    let head = this.#getHead();
    let headRow = head.querySelector('tr') || document.createElement('tr');

    let cell = document.createElement('th');
    cell.textContent = value;
    headRow.appendChild(cell);

    head.innerHTML=null;
    head.appendChild(headRow);
  }
}

if (window) {
  window.customElements.define('app-table', AppTable);
}