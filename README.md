# JSDOM Web Components

Native Isomorphic Web Components built on top of the JavaScript Document Object Model. Extends existing HTML DOM Elements.

## Installation

Install via npm or CDN.

* Use npm install in your project

```bash
$npm install jsdom-web-components
```

* Use a CDN to get static content

```html
<script src="https://unpkg.com/jsdom-web-components@latest/dist/bundle.js"></script>
```

## Usage

Instantiate a new component using `document.createElement()` in your HTML / JavaScript.

```js
<html>
  <head>
    <title>My App</title>
    <script src="https://unpkg.com/jsdom-web-components@latest/dist/bundle.js"></script>
  </head>
  <body>
    <header>
      <h1>My Awesome Web Page</h1>
      <script>
        let nav = document.createElement('app-nav');
        nav.addItem('Github', 'https://github.com');
        nav.render();
      </script>
    </header>
  </body>
</html>
```

## Contributions

Please create issues and PRs if there are features or bugs that need addressing.
