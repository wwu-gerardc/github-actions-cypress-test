(function(window, document, undefined) {
  "use strict";
  describe("atom: lists", (() => {
    beforeEach((() => {
      cy.visit("/patterns/atoms/lists");
    }));
    context("automated accessibility tests", (() => {
      it("passes axe core accessibility tests", (() => {
        cy.injectAxe();
        cy.checkA11y(".theme-doc-markdown");
      }));
    }));
  }));
})(this, this.document);