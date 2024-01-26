(function($, window, document, undefined) {
  "use strict";
  Drupal.behaviors.cy = {
    attach: function(context, settings) {
      describe("organism: myWestern menu", (() => {
        beforeEach((() => {
          cy.visit("/patterns/organisms/navigation/my-western-menu");
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