/// <reference types="Cypress" />

describe('Accessibility checks', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
    cy.configureAxe({
      rules: [
        {
          id: 'region',
          enabled: false,
        },
      ],
    });
    cy.wait(500);
  });
  it('Has no detectable a11y violations on landing page', () => {
    cy.checkA11y();
  });

  it('Has no detectable a11y violations on projects page', () => {
    cy.getByText('Projects').click();
    cy.checkA11y();
  });
});
