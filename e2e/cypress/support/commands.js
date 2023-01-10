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
      {
        id: 'color-contrast',
        enabled: false,
      },
      {
        id: 'link-in-text-block',
        enabled: false,
      },
    ],
  });
});

Cypress.Commands.add('checkA11yResponsive', () => {
  cy.viewport('macbook-15').wait(500);
  cy.checkA11y();

  cy.viewport('ipad-2').wait(500);
  cy.checkA11y();

  cy.viewport('iphone-5').wait(500);
  cy.checkA11y();
});
