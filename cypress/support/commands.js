// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import '@testing-library/cypress/add-commands';
import 'cypress-axe';

Cypress.Commands.add('initAxe', () => {
  cy.injectAxe();
  cy.configureAxe({
    rules: [
      {
        id: 'region',
        enabled: false,
      },
      {
        id: 'landmark-complementary-is-top-level',
        enabled: false,
      },
      {
        id: 'landmark-unique',
        enabled: false,
      },
    ],
  });
});

Cypress.Commands.add('checkA11yResponsive', () => {
  cy.viewport('macbook-15')
    .wait(500)
    .checkA11y();

  cy.viewport('ipad-2')
    .wait(500)
    .checkA11y();

  cy.viewport('iphone-5')
    .wait(500)
    .checkA11y();
});
