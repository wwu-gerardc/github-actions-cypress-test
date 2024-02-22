describe("molecule: image with description", () => {
  beforeEach(() => {
    cy.visit("/patterns/molecules/image-with-description")
    cy.get(".theme-doc-markdown").should("be.visible")
  })

  context("automated accessibility tests", () => {
    it("passes axe core accessibility tests", () => {
      cy.injectAxe()
      cy.checkA11y(".theme-doc-markdown")
    })
  })
})