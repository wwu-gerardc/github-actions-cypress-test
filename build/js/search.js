(function($, window, document, undefined) {
  "use strict";
  Drupal.behaviors.search = {
    attach: function(context, settings) {
      if ((typeof context == "undefined" || typeof context != "undefined" && context == document) && typeof window !== "undefined") {
        const search_template = document.createElement("template");
        search_template.innerHTML = `\n    <form class="search-area" method="get" action="https://search.wwu.edu/">\n      <label for="search-box" class="search-label">Search:</label>\n      <input id="search-box" name="q" type="search">\n      <button class="submit-search">\n        <span class="component-icon" aria-hidden="true"><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg></span>\n        <span class="toggle-text">Go</span>\n      </button>      \n    </form>\n    `;
        class WWUSearch extends HTMLElement {
          constructor() {
            super();
          }
          connectedCallback() {
            /* Create the custom element by appending the template */
            this.appendChild(search_template.content.cloneNode(true));
          }
        }
        window.customElements.define("wwu-search", WWUSearch);
      }
    }
  };
})(jQuery, this, this.document);