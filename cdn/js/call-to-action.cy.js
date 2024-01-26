(function(window, document, undefined) {
  "use strict";
  describe("atom: CTA links", (() => {
    beforeEach((() => {
      cy.visit("/patterns/atoms/links/call-to-action");
    }));
    context("automated accessibility tests", (() => {
      it("passes axe core accessibility tests", (() => {
        cy.injectAxe();
        cy.checkA11y(".theme-doc-markdown");
      }));
    }));
  }));
})(this, this.document);