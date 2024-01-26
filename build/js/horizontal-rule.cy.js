(function($, window, document, undefined) {
  "use strict";
  Drupal.behaviors.cy = {
    attach: function(context, settings) {
      describe("atom: horizontal rule", (() => {
        beforeEach((() => {
          cy.visit("/patterns/atoms/horizontal-rule");
        }));
        context("automated accessibility tests", (() => {
          it("passes axe core accessibility tests", (() => {
            cy.injectAxe();
            cy.checkA11y(".theme-doc-markdown");
          }));
        }));
      }));
    }
  };
})(jQuery, this, this.document);