(()=>{"use strict";class t extends HTMLElement{constructor(t){super(),this.name=t,this.attachShadow({mode:"open"})}static parseAttribute(t,e){let n=(new DOMParser).parseFromString(t,"text/html").querySelector("*");return n&&n.hasAttribute(e)?n.getAttribute(e):null}render(t){t?t.append(this):document.currentScript.insertAdjacentElement("afterend",this)}}window&&window.customElements.define("app-table",class extends t{constructor(){super(),this.columns=[],this.shadowRoot.innerHTML='\n      <style>\n        :host {\n          display: inline-block;\n          font-family: sans-serif;\n          border-radius: 5px;\n        }\n\n        :host table {\n          border-spacing: 0;\n          box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;\n          border-radius: 5px;\n        }\n        \n        :host table thead {\n          border-radius: 5px;\n          background-color: #1D438A;\n        }\n\n        :host table thead tr {\n          border-radius: 5px 5px 0 0;\n          color: #fefefe;\n          text-align: left;\n        }\n\n        :host table thead tr th:first-child {\n          border-radius: 5px 0 0 0;\n        }\n        :host table thead tr th:last-child {\n          border-radius: 0 5px 0 0;\n        }\n        :host table td {\n          border-radius: 5px;\n        }\n        :host table th, :host table td {\n          padding: 12px 15px;\n        }\n\n        :host td:nth-of-type(even) {\n          background: #F2F2F2;\n        }\n      </style>\n\n      <table id="app-table">\n        <caption id="app-table-caption"></caption>\n        <thead id="app-table-head"></thead>\n        <tbody id="app-table-body"></tbody>\n        <tfoot id="app-table-footer"></tfoot>\n      </table>\n    '}#t(){return this.shadowRoot.querySelector("#app-table-footer")}#e(){return this.shadowRoot.querySelector("#app-table-head")}#n(){return this.shadowRoot.querySelector("#app-table-body")}setCaption(t){document.querySelector("app-table").shadowRoot.querySelector("#app-table-caption").textContent=t}addRow(t,...e){let n=this.#n(),a=document.createElement("tr"),i=document.createElement("td");i.textContent=t,a.appendChild(i),e.forEach((t=>{let e=document.createElement("td");e.textContent=t,a.appendChild(e)})),n.appendChild(a)}addColumn(t){this.columns.push(t);let e=this.#e(),n=e.querySelector("tr")||document.createElement("tr"),a=document.createElement("th");a.textContent=t,n.appendChild(a),e.innerHTML=null,e.appendChild(n)}});class e extends t{constructor(){super(),this.callback=null,this.shadowRoot.innerHTML='\n      <style id="app-form-styles">\n        :host {\n          background-color: #ffffff;\n          display: inline-block;\n          min-width: 300px;\n          border-radius: 5px;\n        }\n\n        :host form {\n          max-width: 900px;\n          padding: 8px;\n          border-radius: 5px;\n          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);\n          font-family: \'Arial\', sans-serif;\n          display: flex;\n          flex-direction: column;\n          justify-content: center;\n          align-items: center;\n        }\n        :host form.hide {\n          background: none;\n          box-shadow: none;\n          border: none\n        }\n\n        :host fieldset {\n          border-radius: 8px;\n          border: thin solid lightgrey;\n          padding: 0 20px 4px 20px;\n          margin-bottom: 12px;\n          background-color: #ffffff;\n        }\n        :host fieldset.hide {\n          background: none;\n          box-shadow: none;\n          border: none;\n        }\n\n        :host #form-legend {\n          display: none;\n        }\n\n        :host #form-heading {\n          font-weight: bold;\n          font-size: 18px;\n          color: #333333;\n        }\n\n        :host input,\n        button {\n          width: 100%;\n          padding: 8px;\n          margin-bottom: 8px;\n          border: 1px solid #cccccc;\n          border-radius: 4px;\n          box-sizing: border-box;\n          font-size: 14px;\n        }\n\n        :host button[type="submit"] {\n          background-color: #003B4A;\n          width: 100px;\n          color: #ffffff;\n          cursor: pointer;\n        }\n\n        :host button[type="submit"]:hover {\n          background-color: #00BFB2;\n        }\n        :host label {\n          display: block;\n          color: #333333;\n          font-weight: lighter;\n          margin: 8px 0;\n        }\n        :host .label-text {\n          padding-left: 4px;\n        }\n        :host label:has(select) {\n          display: flex;\n          flex-direction: column;\n        }\n        :host label select {\n          padding: 8px;\n          border: thin solid lightgrey;\n          border-radius: 5px;\n        }\n        :host .radio-inputs {\n          margin: 16px 0;\n        }\n        :host .radio-inputs p {\n          margin: 0;\n        }\n        :host .radio-option {\n          border: thin solid lightgrey;\n          border-radius: 5px;\n          display: flex;\n          flex-direction: row;\n          justify-content: flex-start;\n          align-items: center;\n          padding: 4px;\n          margin: 2px 0;\n        }\n        :host .radio-option input {\n          width: auto;\n          margin: 0 8px;\n        }\n      </style>\n\n      <form id="app-form-container">\n        <fieldset id="app-form-inputs"></fieldset>\n        <button id="app-form-submit-btn" type="submit">Submit</button>\n      </form>\n    '}static normalizeLabel(t){return t.replace(/\s+/g,"-").toLowerCase()}static createInputLabel(t){let e=document.createElement("label"),n=document.createElement("span");return n.textContent=t,n.classList.add("label-text"),e.append(n),e}static createTextInput(t,n,a){let i=document.createElement("input"),o=e.createInputLabel(n);o.setAttribute("for",t);let{required:r}=a||{};if(i.setAttribute("type","text"),i.setAttribute("name",t),i.setAttribute("id",t),o.appendChild(i),r){i.setAttribute("required",!0);let t=document.createElement("span");t.textContent="*",t.setAttribute("style","color: red; font-size: 1em; margin: 0 4px;"),o.prepend(t)}return o}static createOptionInput(t,n,a){let i=e.createInputLabel(n);i.setAttribute("for",t);let o=document.createElement("select");return o.setAttribute("id",t),o.setAttribute("name",t),a.forEach((t=>{let e=document.createElement("option");t.value&&t.text?(e.setAttribute("value",t.value),e.textContent=t.text):(e.setAttribute("value",t.replace(/\s+/g,"-").toLowerCase()),e.textContent=t),o.appendChild(e)})),i.appendChild(o),i}static createRadioInput(t,n,a){let i=document.createElement("section");i.setAttribute("id",`${t}-input-container`),i.classList.add("radio-inputs");let o=document.createElement("p");return o.textContent=n,o.classList.add("label-text"),i.appendChild(o),a.forEach((n=>{let a=document.createElement("div");a.classList.add("radio-option");let o=document.createElement("label");o.setAttribute("for",n.value||e.normalizeLabel(n)),o.textContent=n.text||n;let r=document.createElement("input");r.setAttribute("type","radio"),r.setAttribute("id",n.value||e.normalizeLabel(n)),r.setAttribute("name",t),a.appendChild(r),a.appendChild(o),i.appendChild(a)})),i}#a(){return this.#i().getElementsByTagName("fieldset")[0]}#i(){return this.shadowRoot.querySelector("#app-form-container")}connectedCallback(){this.#i().addEventListener("submit",this.handleSubmit)}handleSubmit=t=>{t.preventDefault();const e={};let n=[...t.target.getElementsByTagName("input"),...t.target.getElementsByTagName("select")];for(let t of n)e[t.id]="radio"===t.type?t.checked:t.value;this.callback?this.callback(e):console.warn("No Form Submission event, provide a callback to onSubmit")};onSubmit(t){if("function"!=typeof t)throw new Error("App Form Error: callback must be a function");this.callback=t}setLegend(t){let e=this.shadowRoot.getElementById("form-legend"),n=this.shadowRoot.getElementById("form-heading");e?(e.textContent=t,n.textContent=t):(e=document.createElement("legend"),e.setAttribute("id","form-legend"),e.setAttribute("aria-hidden","true"),e.textContent=t,n=document.createElement("h3"),n.setAttribute("id","form-heading"),n.textContent=t,this.#a().prepend(n),this.#a().prepend(e))}setButtonText(t){this.shadowRoot.querySelector("#app-form-submit-btn").textContent=t}addDatePicker(t){let n=this.#a(),a=t.id?t.id:e.normalizeLabel(t),i=e.createInputLabel(t.label||t),o=document.createElement("input");i.setAttribute("for",a),o.setAttribute("type","date"),o.setAttribute("id",a),o.setAttribute("name",a),i.appendChild(o),n.appendChild(i)}addRadioInput(t){let n=this.#a();try{n.append(e.createRadioInput(t.id,t.label,t.values))}catch(t){throw new Error("App Form Error: unable to create radio input",{cause:t})}}addOptionInput(t){let n=this.#a();try{n.append(e.createOptionInput(t.id,t.label,t.values))}catch(t){throw new Error("App Form Error: unable to create option input",{cause:t})}}addTextInput(t){let n=this.#a();try{n.append(e.createTextInput(t.id,t.label,{required:t.required}))}catch(t){throw console.log(t),new Error("App Form Error: unable to create text input",{cause:t})}}setBackgroundColor(t){let e=this.#i(),n=e.getElementsByTagName("style")[0]||document.createElement("style");n.innerText+=`:host form { background-color: ${t};}`,e.append(n)}setBackground(t){let e=this.#i(),n=this.#a();switch(t){case"none":e.classList.add("hide"),n.classList.remove("hide");break;case"transparent":e.classList.add("hide"),n.classList.add("hide");break;default:e.classList.add(t),n.classList.add(t)}}}window&&window.customElements.define("app-form",e);window&&window.customElements.define("app-nav",class extends t{constructor(){super(),this.shadowRoot.innerHTML="\n      <style id=\"app-nav-styles\">\n        :host {\n          background-color: #ffffff;\n          display: inline-block;\n          font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n        }\n        :host(.full), :host .full {\n          display: block;\n          width: 100%;\n        }\n\n        :host #app-nav-container {\n          color: #ffffff;\n          background-color: #1D438A;\n          overflow: hidden;\n          border-radius: 5px;\n          display:inline-block;\n        }\n\n        :host #app-navigation {\n          display: inline-block;\n          height: 100%;\n        }\n\n        :host h2 {\n          display: inline-block;\n          margin: 8px 20px;\n          vertical-align: top;\n        }\n\n        :host nav a {\n          color: inherit;\n          float: left;\n          display: block;\n          text-align: center;\n          padding: 14px 16px;\n          text-decoration: none;\n        }\n\n        :host nav a:hover {\n          background-color: lightgrey;\n        }\n        :host nav a.active-location {\n          background-color: #555555;\n        }\n\n        @media screen and (max-width: 600px) {\n          :host #app-nav-container, :host #app-navigation {\n            display: flex;\n            flex-direction: column;\n            align-items: center;\n            width: 100%\n          }\n          :host a {\n            width: 100%;\n          }\n        }\n      </style>\n\n      <div id=\"app-nav-container\">\n        <nav id=\"app-navigation\"></nav>\n      </div>\n    "}connectedCallback(){let t=Array.from(this.#o().children);for(let e in t){let n=t[e].href,a=new URL(n).pathname+new URL(n).search+new URL(n).hash;location.pathname===a&&t[e].classList.add("active-location")}}#i(){return this.shadowRoot.querySelector("#app-nav-container")}#o(){return this.#i().querySelector("#app-navigation")}addItem(t,e){let n=this.#o();const a=document.createElement("a");a.href=e,a.textContent=t,n.appendChild(a)}addTitle(t){let e=this.#i();const n=document.createElement("h2");n.textContent=t,e.prepend(n)}setType(t){let e=this.#i();"full"===t&&(this.shadowRoot.host.classList.add("full"),e.classList.add("full")),console.log(t)}setBackgroundColor(t){this.#i().setAttribute("style",`background-color: ${t};`)}setTextColor(t){let e=this.#i(),n=e.getElementsByTagName("style")[0]||document.createElement("style");n.innerText+=`:host #app-nav-container { color: ${t}; }`,e.append(n)}});window&&window.customElements.define("app-menu",class extends t{constructor(){super(),this.shadowRoot.innerHTML='\n      <style id="app-menu-styles">\n        :host {\n         font-family: \'Arial\', sans-serif;\n        }\n        :host #app-menu-container {\n          display: inline-block;\n          border-radius: 5px;\n          box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;\n          background-color: #ffffff;\n        }\n        :host #app-menu-list {\n          padding: 0;\n          display: flex;\n          justify-content: center;\n          align-items: center;\n        }\n        :host #app-menu-list.vertical {\n          margin: 8px 0;\n          min-width: 200px;\n          flex-direction: column;\n        }\n        :host #app-menu-list.horizontal {\n          margin: 2px 2px;\n          min-width: 300px;\n          flex-direction: row;\n        }\n        :host .app-menu-list-button {\n          background: none;\n          border: none;\n          border-radius: 5px;\n          font: inherit;\n          cursor: pointer;\n          width: 100%;\n          height: 100%;\n          padding: 0 8px;\n        }\n        :host #app-menu-list.vertical .app-menu-list-item {\n          width: 85%;\n        }\n        :host #app-menu-list.horizontal .app-menu-list-item {\n          min-width: 150px;\n          text-align: center;\n        }\n        :host .app-menu-list-item {\n          list-style: none;\n          border-radius: 5px;\n          width: 100%;\n          height: 30px;\n          line-height: 20px;\n          font-size: 1em;\n          text-size-adjust: 100%;\n          -webkit-text-size-adjust: 100%;\n          margin: 4px 0;\n        }\n        :host .app-menu-list-button.active-list-item {\n          background-color: darkgrey;\n        }\n        :host .app-menu-list-item:hover {\n          background-color: #efefef;\n        }\n        :host .app-menu-list-item:active {\n          animation-name: shrink;\n          animation-duration: 100ms;\n        }\n        :host #app-menu-list.vertical .app-menu-list-button {\n          text-align: left;\n        }\n        @keyframes shrink {\n          0% {\n            font-size: 1em;\n          }\n          50% {\n            font-size: .9em;\n          }\n          100% {\n            font-size: 1em;\n          }\n        }\n      </style>\n\n      <div id="app-menu-container">\n        <ul id="app-menu-list" class="vertical"></ul>\n      </div>\n    '}connectedCallback(){let t=this.#r(),e=Array.from(t.children);t.addEventListener("click",(t=>{let n=t.target;e.forEach((t=>{let e=t.querySelector("button");e===n?e.classList.add("active-list-item"):e.classList.remove("active-list-item")}))}))}#r(){return this.shadowRoot.querySelector("#app-menu-list")}setType(t){let e=this.#r();switch(t){case"vertical":e.classList.remove("horizontal"),e.classList.add("vertical");break;case"horizontal":e.classList.remove("vertical"),e.classList.add("horizontal");break;default:throw new Error("App Menu Error: unable to set type "+t)}}addItem(t,e){let n=this.#r(),a=document.createElement("li"),i=document.createElement("button");i.classList.add("app-menu-list-button"),a.classList.add("app-menu-list-item"),i.textContent=t,a.append(i),e&&i.addEventListener("click",e),n.appendChild(a)}});class n extends t{constructor(){super(),this.rotateInterval=null,this.shadowRoot.innerHTML='\n      <style id="app-carousel-styles">\n        :host #app-carousel-container {\n          position: relative;\n          height: 100%;\n        }\n        :host #app-carousel-container.hero {\n          height: 80vh;\n        }\n        :host #app-carousel-items {\n          width: 100%;\n          height: 100%;\n          display: flex;\n          flex-direction: row;\n          justify-content: center;\n          align-items: center;\n        }\n        :host #app-carousel-controls {\n          position: absolute;\n          height: 100%;\n          width: 100%;\n          top: 0;\n          left: 0;\n          display: flex;\n          flex-direction: row;\n          justify-content: space-between;\n        }\n        :host #app-carousel-controls #prev-button,\n        :host #app-carousel-controls #next-button {\n          z-index: 10001;\n          top: 0;\n          cursor: pointer;\n          margin: 0 50px;\n        }\n        :host #app-carousel-controls .arrow-left {\n          width: 0;\n          height: 0;\n          border-top: 20px solid transparent;\n          border-bottom: 20px solid transparent;\n          border-right: 20px solid #000;\n        }\n        :host #app-carousel-controls .arrow-right {\n          width: 0;\n          height: 0;\n          border-top: 20px solid transparent;\n          border-bottom: 20px solid transparent;\n          border-left: 20px solid #000;\n        }\n        :host .app-carousel-item {\n          position: relative;\n          height: 100%;\n          display: flex;\n          flex-direction: column;\n          justify-content: center;\n          align-items: center;\n          z-index: 9999;\n        }\n        :host .app-carousel-item .cta {\n          position: absolute;\n          bottom: 40%;\n          z-index: 10000;\n        }\n        :host .app-carousel-item figcaption {\n          position: absolute;\n          display: inline-block;\n          width: calc(100% - 16px);\n          min-height: 20%;\n          padding: 8px;\n          bottom: 0;\n          text-align: center;\n          background: rgba(220,220,220,0.5);\n          font-family: Ariel, sans-serif;\n          font-size: 1.25em;\n          text-shadow: 1px 1px 1px #fff;\n        }\n        :host .app-carousel-item.hidden {\n          display: none;\n        }\n        :host #app-carousel-items.right .app-carousel-item.active {\n          animation: appearLeft 250ms ease-in-out;\n        }\n        :host #app-carousel-items.right .app-carousel-item:not(.active) {\n          animation: removeRight 250ms ease-in-out;\n        }\n        :host #app-carousel-items.left .app-carousel-item.active {\n          animation: appearRight 250ms ease-in-out;\n        }\n        :host #app-carousel-items.left .app-carousel-item:not(.active) {\n          animation: removeLeft 250ms ease-in-out;\n        }\n\n        @keyframes removeRight {\n          0%  {\n            transform: translateX(0px);\n          }\n          100% {\n            transform: translateX(100vw);\n          }\n        }\n        @keyframes removeLeft {\n          0% {\n            transform: translateX(0px);\n          }\n          100% {\n            transform: translateX(-100vw);\n          }\n        }\n        @keyframes appearRight {\n          0% {\n            transform: translateX(100vw);\n          }\n          100% {\n            transform: translateX(0px);\n          }\n        }\n        @keyframes appearLeft {\n          0%  {\n            transform: translateX(-100vw);\n          }\n          100% {\n            transform: translateX(0px);\n          }\n        }\n      </style>\n\n      <section id="app-carousel-container" class="hero">\n        <div id="app-carousel-items" class="right"></div>\n        <div id="app-carousel-controls">\n          <button id="prev-button"><div data-testid="prev-arr" class="arrow-left"></div></button>\n          <button id="next-button"><div data-testid="next-arr" class="arrow-right"></div></button>\n        </div>\n      </section>\n    '}static#s(t,e){try{let n=document.createElement("button");return n.textContent=t,n.classList.add("cta"),e&&n.addEventListener("click",e),n}catch(t){throw new Error("Unable to create call to action button",{cause:t})}}static#l(){let t=document.createElement("figure");return t.classList.add("app-carousel-item"),t}static#d(t,e){t.classList.remove("active"),setTimeout((()=>{t.classList.add("hidden")}),220),e.classList.remove("hidden"),e.classList.add("active")}connectedCallback(){this.#p(this.#c),this.shadowRoot.querySelector("#prev-button").addEventListener("click",(()=>{this.#h("left"),this.#c()})),this.shadowRoot.querySelector("#next-button").addEventListener("click",(()=>{this.#h("right"),this.#u()}))}disconnectedCallback(){clearInterval(this.rotateInterval)}#p(t,e){parseInt(e)?this.rotateInterval=setInterval(t,e):0!==this.rotateInterval&&(this.rotateInterval=setInterval(t,6e3))}#h(t="right"){let e=this.#m();clearInterval(this.rotateInterval),"left"===t?(this.#p(this.#u),e.classList.remove("right"),e.classList.add("left")):(this.#p(this.#c),e.classList.remove("left"),e.classList.add("right"))}#u=()=>{let t=Array.from(this.#m().children);if(t.length>0)for(let e=0;e<t.length;e++){let a=t[e],i=t[e+1];if(a.classList.contains("active")&&i){n.#d(a,i);break}if(a.classList.contains("active")&&!i){n.#d(a,t[0]);break}}};#c=()=>{let t=Array.from(this.#m().children);if(t.length)for(let e=t.length-1;e>=0;e--){let a=t[e],i=t[e-1];if(a.classList.contains("active")&&i){n.#d(a,i);break}if(a.classList.contains("active")&&!i){n.#d(a,t[t.length-1]);break}}};#f(t=null){let e=this.#m(),a=Array.from(e.children),i=n.#l();if(t){let{onClick:e,label:a}=t,o=null;"function"==typeof e&&a?(i.addEventListener("click",e),o=n.#s(a)):"function"==typeof e?(i.addEventListener("click",e),o=n.#s("Click Here")):(i.addEventListener("click",t),o=n.#s("Click Here")),i.append(o)}return a.length?i.classList.add("hidden"):i.classList.add("active"),{carousel:e,item:i}}#m(){return this.#b().querySelector("#app-carousel-items")}#b(){return this.shadowRoot.querySelector("#app-carousel-container")}setInterval(t){let e=this.#m().classList.contains("right")?"right":"left";this.rotateInterval&&clearInterval(this.rotateInterval),parseInt(t)>0?this.rotateInterval=setInterval("right"===e?this.#c:this.#u,t):this.rotateInterval=0}addImage(t,e){let{carousel:n,item:a}=this.#f(e),i=document.createElement("img");if(t.caption){let e=document.createElement("figcaption");e.textContent=t.caption,a.append(e)}t.description&&i.setAttribute("alt",t.description),t.url?i.setAttribute("src",t.url):i.setAttribute("src",t),a.append(i),n.appendChild(a)}addItem(t,e){try{let{carousel:n,item:a}=this.#f(e);if(t instanceof HTMLElement)a.append(t);else{a.innerHTML+=t.item||t;let e=t.caption;if(e){let t=document.createElement("figcaption");t.textContent=e,a.append(t)}}n.appendChild(a)}catch(t){throw console.log(t),new Error("App Carousel Error: unable to add carousel item",{cause:t})}}}window&&window.customElements.define("app-carousel",n);class a extends t{constructor(){super(),this.shadowRoot.innerHTML='\n      <style id="app-list-styles">\n        p, h1, h2, h3, h4, h5, h6{\n          margin: 0;\n        }\n        :host {\n          font-family: Ariel, sans-serif;\n        }\n        :host #app-list-container {\n          display: inline-block;\n          border-radius: 5px;\n          box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;\n          background-color: #ffffff;\n        }\n        :host #app-list-title {\n          font-weight: lighter;  \n          text-align: center;\n          padding: 16px 32px;\n          padding-bottom: 16px;\n          box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);\n        }\n        :host #app-list-items {\n          list-style: none;\n          padding: 0;\n          margin: 0;\n        }\n        :host #app-list-items.vertical {\n          display: flex;\n          flex-direction: column;\n          justify-content: center;\n          align-items: center;\n        }\n        :host #app-list-items.vertical .app-list-item {\n          width: calc(100% - 32px);\n          margin: 2px 0;\n        }\n        :host #app-list-items.horizontal {\n          display: flex;\n          flex-direction: row;\n          justify-content: flex-start;\n          align-items: center;\n        }\n        :host #app-list-items.horizontal .app-list-item {\n          width: calc(90% - 32px);\n          margin: 0 2px;\n        }\n        :host #app-list-items.grid {\n          display: grid;\n          grid-template-columns: 1fr 1fr 1fr;\n          grid-template-rows: 1fr;\n        }\n        :host #app-list-items.grid .app-list-item {\n          min-width: 100px;\n          min-height: 100px;\n          margin: 2px;\n          border-radius: 5px;\n        }\n        :host .app-list-item {\n          padding: 16px;\n          background: rgba(244, 244, 244, 0.5);\n          backdrop-filter: blur(10px);\n          display: flex;\n          flex-direction: column;\n          justify-content: center;\n        }\n      </style>\n      <div id="app-list-container"></div>\n    '}static#g=["grid","vertical","horizontal"];static#x(t){let e=document.createElement("h4");return e.textContent=t,e.classList.add("app-list-item-title"),e}static#y(t){let e=document.createElement("p");return e.textContent=t,e.classList.add("app-list-item-text"),e}static#l(t){let e=document.createElement("li");return e.classList.add("app-list-item"),t instanceof HTMLElement?e.append(t):"string"==typeof t&&(e.innerHTML=t),e}static#v(t){let e=null;return e="ul"===t||"ol"===t?document.createElement(t):document.createElement("ul"),e.setAttribute("id","app-list-items"),e.classList.add("vertical"),e}static#w(t){console.log(t)}#L(){let t=this.#r();t||(t=a.#v(),this.#b().append(t));let e=Array.from(t.children);return e.length&&a.#w(e),t}#r(){return this.#b().querySelector("#app-list-items")}#b(){return this.shadowRoot.querySelector("#app-list-container")}setType(t){let e=this.#L();try{a.#g.forEach((n=>{t===n?e.classList.add(n):e.classList.remove(n)}))}catch(t){throw new Error("Unable to set list type")}}setTitle(t){let e=this.#b(),n=e.querySelector("#app-list-title");n||(n=document.createElement("h2"),n.setAttribute("id","app-list-title"),e.prepend(n)),n.textContent=t}addText(t){let{title:e,text:n}=t,i=a.#l();if(e){let t=a.#x(e);i.append(t)}let o=n?a.#y(n):a.#y(t);i.append(o),this.#L().append(i)}addItem(t){let e=this.#L(),n=a.#l(t);e.append(n)}}window&&window.customElements.define("app-list",a)})();