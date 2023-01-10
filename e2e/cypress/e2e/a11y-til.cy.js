/// <reference types="Cypress" />

// initAxe fails silently (axe is not injected), not sure why
describe.skip('Accessibility checks on Today I Learnt', () => {
  beforeEach(() => {
    cy.visit('https://malcolmkee.com');
    cy.initAxe();
    cy.wait(500);
  });

  it.only('has no a11y violation on til landing page', () => {
    cy.findAllByText('TIL').first().click().checkA11yResponsive();
  });

  it('has no a11y violation on til content', () => {
    cy.findByText('TIL')
      .click()
      .get('.til-item')
      .first()
      .click()
      .checkA11yResponsive();

    cy.findByText('All Notes')
      .click()
      .get('.til-item')
      .eq(1)
      .click()
      .checkA11yResponsive();

    cy.findByText('All Notes')
      .click()
      .get('.til-item')
      .eq(2)
      .click()
      .checkA11yResponsive();
  });
});
