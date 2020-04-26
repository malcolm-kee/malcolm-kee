/// <reference types="Cypress" />

describe('Accessibility checks on Today I Learnt', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.initAxe();
    cy.wait(500);
  });

  it('has no a11y violation on til landing page', () => {
    cy.findByText('Today I Learnt').click().checkA11yResponsive();
  });

  it('has no a11y violation on til landing page dark mode', () => {
    cy.findByText('Today I Learnt').click();
    cy.findByLabelText('Switch between Dark and Light mode')
      .click({ force: true })
      .checkA11yResponsive();
  });

  it('has no a11y violation on til content', () => {
    cy.findByText('Today I Learnt')
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

  it('has no a11y violation on til content dark mode', () => {
    cy.findByText('Today I Learnt').click();
    cy.findByLabelText('Switch between Dark and Light mode')
      .click({ force: true })
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
