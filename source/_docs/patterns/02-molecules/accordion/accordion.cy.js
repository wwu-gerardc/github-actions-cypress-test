import { runAutoA11yTests } from "../../../cypress/support/global"

describe("molecule: accordion", () => {
  beforeEach(() => {
    cy.visit("/patterns/molecules/accordion")
    cy.get(".theme-doc-markdown").should("be.visible")
    
    // Skip uncaught exception flags 
    // Alerts due to expand/collapse all controls not yet loaded 
    cy.on('uncaught:exception', (err, runnable) => {
      expect(err.message).to.include('Cannot read properties of null')
      return false
    })
  })

  runAutoA11yTests();

  context("manual accessibility tests", () => {
    it("accordion items are focusable", () => {
      const accordion_item1 = ".theme-doc-markdown wwu-accordion:first-of-type > [label='Cats'] > .title > .expand"
      const accordion_item2 = ".theme-doc-markdown wwu-accordion:first-of-type > [label='Dogs'] > .title > .expand"

     // On Tab: Focus moves from one accordion button to next button 
      cy.get(accordion_item1).focus()
      cy.get(accordion_item1).should("have.focus")
      if (Cypress.isBrowser("chrome")) {
        cy.get(accordion_item1).realPress("Tab")
      }
      if (Cypress.isBrowser("!chrome")) {
        cy.get(accordion_item1).tab()
      }
      cy.get(accordion_item2).should("have.focus")
    })
    
    it("accordion item toggles and announces states as expected", () => {
      const accordion_item_cat = ".theme-doc-markdown wwu-accordion:first-of-type > [label='Cats'] > .title"

      // Cats starts expanded (expanded="true" attribute), verify initial state
      cy.get(accordion_item_cat).find(".expand").should("have.attr", "aria-expanded", "true")
      cy.get(accordion_item_cat).siblings(".content").should("have.class", "is-expanded")

     // on Enter: accordion item content collapses, aria-expanded false
      cy.get(accordion_item_cat).find(".expand").focus()
      if (Cypress.isBrowser("chrome")) {
        cy.get(accordion_item_cat).find(".expand").realPress("Enter")
      }
      if (Cypress.isBrowser("!chrome")) {
        cy.get(accordion_item_cat).find(".expand").type("{enter}")
      }
      cy.get(accordion_item_cat).find(".expand").should("have.attr", "aria-expanded", "false")
      cy.get(accordion_item_cat).siblings(".content").should("not.have.class", "is-expanded")

     // on 2nd Enter: accordion item content expands, aria-expanded true
      if (Cypress.isBrowser("chrome")) {
        cy.get(accordion_item_cat).find(".expand").realPress("Enter")
      }
      if (Cypress.isBrowser("!chrome")) {
        cy.get(accordion_item_cat).find(".expand").type("{enter}")
      }
      cy.get(accordion_item_cat).find(".expand").should("have.attr", "aria-expanded", "true")
      cy.get(accordion_item_cat).siblings(".content").should("have.class", "is-expanded")
    })

    it("accordion item closes on Esc press", () => {
      const accordion_item_dog = ".theme-doc-markdown wwu-accordion:first-of-type > [label='Dogs'] > .title"

      // Dogs starts collapsed, verify initial state
      cy.get(accordion_item_dog).find(".expand").should("have.attr", "aria-expanded", "false")
      cy.get(accordion_item_dog).siblings(".content").should("not.have.class", "is-expanded")

     // Click to open the item
      cy.window().focus()
      cy.get(accordion_item_dog).find(".expand").click()
      cy.get(accordion_item_dog).find(".expand").should("have.attr", "aria-expanded", "true")
      cy.get(accordion_item_dog).siblings(".content").should("have.class", "is-expanded")

     // on Esc press: accordion item content collapses, aria-expanded false
      if (Cypress.isBrowser("chrome")) {
        cy.get(accordion_item_dog).find(".expand").realPress("Escape")
      }
      if (Cypress.isBrowser("!chrome")) {
        cy.get(accordion_item_dog).find(".expand").type("{esc}")
      }
      cy.get(accordion_item_dog).find(".expand").should("have.attr", "aria-expanded", "false") 
      cy.get(accordion_item_dog).siblings(".content").should("not.have.class", "is-expanded")
    })

    // On Enter: expand all button opens all items
    it("expand all button opens all accordion items", () => {
      const accordion1_item = ".theme-doc-markdown wwu-accordion:first-of-type wwu-accordion-item"

      // Setup: ensure all items start collapsed
      cy.get('.expand-all').should("be.visible")
      cy.get(".collapse-all").should("be.visible")
      cy.get(".collapse-all").click()
      // Wait for the first item's content to become invisible (state change complete)
      cy.get(accordion1_item).first().find(".content").should("not.have.class", "is-expanded")
      // Now verify all items are collapsed
      cy.get(accordion1_item).find(".content").not(":visible").should("have.length", 3)
      cy.get(accordion1_item).find(".expand").should("have.attr", "aria-expanded", "false")

      // Click expand-all button
      cy.get(".expand-all").focus()
      if (Cypress.isBrowser("chrome")) {
        cy.get(".expand-all").realPress("Enter")
      }
      if (Cypress.isBrowser("!chrome")) {
        cy.get(".expand-all").type("{enter}")
      }

      // Verify all items are expanded
      cy.get(accordion1_item).find(".content:visible").should('have.length', 3)
      cy.get(accordion1_item).find(".content").should("have.class", "is-expanded")
      cy.get(accordion1_item).find(".expand").should("have.attr", "aria-expanded", "true")
      cy.get(".expand-all").should("have.attr", "disabled")
    })

    // On Enter: collapse all button closes all items
    it("collapse all button closes all accordion items", () => {
      const accordion1_item = ".theme-doc-markdown wwu-accordion:first-of-type wwu-accordion-item"
      
      // Setup: ensure all items start expanded
      cy.get(".expand-all").focus()
      if (Cypress.isBrowser("chrome")) {
        cy.get(".expand-all").realPress("Enter")
      }
      if (Cypress.isBrowser("!chrome")) {
        cy.get(".expand-all").type("{enter}")
      }
      cy.get(accordion1_item).find(".content:visible").should('have.length', 3)
      cy.get(accordion1_item).find(".content").should("have.class", "is-expanded")
      cy.get(accordion1_item).find(".expand").should("have.attr", "aria-expanded", "true")

      // Click collapse-all button
      cy.get(".collapse-all").focus()
      if (Cypress.isBrowser("chrome")) {
        cy.get(".collapse-all").realPress("Enter")
      }
      if (Cypress.isBrowser("!chrome")) {
        cy.get(".collapse-all").type("{enter}")
      }

      // Verify all items are collapsed
      cy.get(accordion1_item).find(".content").not(":visible").should("have.length", 3)
      cy.get(accordion1_item).find(".content").should("not.have.class", "is-expanded")
      cy.get(accordion1_item).find(".expand").should("have.attr", "aria-expanded", "false")
      cy.get(".collapse-all").should("have.attr", "disabled")
    })

    // On Shift + Enter: all accordion items expand
    it("Shift + Enter opens all accordion items", () => {
      const accordion1_item = ".theme-doc-markdown wwu-accordion:first-of-type wwu-accordion-item"

      // Setup: ensure all items start collapsed
      cy.get(".collapse-all").click()
      cy.get(accordion1_item).find(".content").not(":visible").should("have.length", 3)
      cy.get(accordion1_item).find(".content").should("not.have.class", "is-expanded")
      cy.get(accordion1_item).find(".expand").should("have.attr", "aria-expanded", "false")

      // Focus on first item and press Shift+Enter to expand all
      cy.get(accordion1_item).first().find(".expand").focus()
      if (Cypress.isBrowser("chrome")) {
        cy.get(accordion1_item).first().find(".expand").realPress(["ShiftLeft", "Enter"])
      }
      if (Cypress.isBrowser("!chrome")) {
        cy.get(accordion1_item).first().find(".expand").type("{shift}{enter}")
      }

      // Verify all items are expanded
      cy.get(accordion1_item).find(".content:visible").should('have.length', 3)
      cy.get(accordion1_item).find(".content").should("have.class", "is-expanded")
      cy.get(accordion1_item).find(".expand").should("have.attr", "aria-expanded", "true")
    })

    // On Shift + Esc: all accordion items collapse
    it("Shift + Esc closes all accordion items", () => {
      const accordion1_item = ".theme-doc-markdown wwu-accordion:first-of-type wwu-accordion-item"

      // Setup: ensure all items start expanded
      cy.get(".expand-all").focus()
      if (Cypress.isBrowser("chrome")) {
        cy.get(".expand-all").realPress("Enter")
      }
      if (Cypress.isBrowser("!chrome")) {
        cy.get(".expand-all").type("{enter}")
      }
      cy.get(accordion1_item).find(".content:visible").should('have.length', 3)
      cy.get(accordion1_item).find(".content").should("have.class", "is-expanded")
      cy.get(accordion1_item).find(".expand").should("have.attr", "aria-expanded", "true")

      // Focus on first item and press Shift+Esc to close all
      cy.get(accordion1_item).first().find(".expand").focus()
      if (Cypress.isBrowser("chrome")) {
        cy.get(accordion1_item).first().find(".expand").realPress(["ShiftLeft", "Escape"])
      }
      if (Cypress.isBrowser("!chrome")) {
        cy.get(accordion1_item).first().find(".expand").type("{shift}{esc}")
      }

      // Verify all items are collapsed
      cy.get(accordion1_item).find(".content").not(":visible").should("have.length", 3)
      cy.get(accordion1_item).find(".content").should("not.have.class", "is-expanded")
      cy.get(accordion1_item).find(".expand").should("have.attr", "aria-expanded", "false")
    })
  })
})