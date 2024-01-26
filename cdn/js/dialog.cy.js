(function(window, document, undefined) {
  "use strict";
  describe("molecule: dialog", (() => {
    beforeEach((() => {
      cy.visit("/patterns/molecules/dialog");
    }));
    context("automated accessibility tests", (() => {
      it("passes axe core accessibility tests", (() => {
        cy.injectAxe();
        cy.checkA11y(".theme-doc-markdown");
      }));
    }));
  }));
})(this, this.document);