'use strict';

export default class AppTable extends HTMLElement {
  constructor() {
    super();
    this.columns = [];
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          font-family: sans-serif;
        }

        :host table {
          border-spacing: 0;
          box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
          border-radius: 5px;
        }
        
        :host table thead {
          border-radius: 5px;
          background-color: #009879;
        }

        :host table thead tr {
          border-radius: 5px;
          color: #fefefe;
          text-align: left;
        }

        :host table th, :host table td {
          padding: 12px 15px;
        }

        :host td:nth-of-type(even) { background: #F2F2F2; }
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
  render(element) {
    if (element) {
      element.append(this);
    } else {
      document.currentScript.insertAdjacentElement('afterend', this);
    }
  }
}

if (window) {
  window.customElements.define('app-table', AppTable);
}