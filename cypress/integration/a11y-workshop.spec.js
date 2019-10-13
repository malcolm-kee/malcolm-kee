/// <reference types="Cypress" />

describe('Accessibility checks on Workshop Materials', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.initAxe();
    cy.wait(500);
  });

  it('has no detectable a11y violations on workshops page', () => {
    cy.findByText('Workshops')
      .click()
      .checkA11yResponsive();
  });

  it('has no detectable a11y violations on workshops page dark mode', () => {
    cy.findByText('Workshops')
      .click()
      .findByLabelText('Switch between Dark and Light mode')
      .click({ force: true })
      .checkA11yResponsive();
  });

  it('has no detectable a11y violations on workshop landing page', () => {
    cy.findByText('Workshops')
      .click()
      .get('.workshop-item')
      .last()
      .click()
      .checkA11yResponsive();

    cy.findByText('All Workshops')
      .click()
      .get('.workshop-item')
      .first()
      .click()
      .checkA11yResponsive();

    cy.findByText('All Workshops')
      .click()
      .findByText('JavaScript: The React Parts')
      .click()
      .wait(2000) // wait for animation
      .checkA11yResponsive();
  });

  it('has no detectable a11y violations on workshop content page', () => {
    cy.findByText('Workshops')
      .click()
      .findByText('JavaScript: The React Parts')
      .click()
      .findByText('Start')
      .click()
      .checkA11yResponsive();

    cy.queryByText('Edit')
      .click()
      .checkA11yResponsive();
  });

  it('has no detectable a11y violations on workshop content page dark mode', () => {
    cy.findByText('Workshops')
      .click()
      .findByText('JavaScript: The React Parts')
      .click()
      .findByText('Start')
      .click()
      .findByLabelText('Switch between Dark and Light mode')
      .click({ force: true })
      .checkA11yResponsive();

    cy.queryByText('Edit')
      .click()
      .checkA11yResponsive();
  });
});