/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    initAxe(): Chainable<undefined>;
    checkA11yResponsive(): Chainable<undefined>;
  }
}
