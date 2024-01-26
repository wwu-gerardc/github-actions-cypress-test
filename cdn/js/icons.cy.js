(function(window, document, undefined) {
  "use strict";
  describe("atom: icons", (() => {
    beforeEach((() => {
      cy.visit("/patterns/atoms/icons");
    }));
    context("automated accessibility tests", (() => {
      it("passes axe core accessibility tests", (() => {
        cy.injectAxe();
        cy.checkA11y(".theme-doc-markdown");
      }));
    }));
  }));
})(this, this.document);