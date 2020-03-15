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
    cy.findByText('Workshops').click();
    cy.findByLabelText('Switch between Dark and Light mode')
      .click({ force: true })
      .checkA11yResponsive();
  });

  it('has no detectable a11y violations on workshop landing page', () => {
    cy.findByText('Workshops')
      .click()
      .get('.workshop-card')
      .last()
      .within(() => {
        cy.findByText('Learn').click();
      })
      .checkA11yResponsive();

    cy.findByText('All Workshops')
      .click()
      .get('.workshop-card')
      .first()
      .within(() => {
        cy.findByText('Learn').click();
      })
      .checkA11yResponsive();

    cy.findByText('All Workshops').click();
    cy.findByText('JavaScript: The React Parts')
      .closest('.workshop-card')
      .within(() => {
        cy.findByText('Learn').click();
      });

    cy.findByText('The React Parts')
      .wait(2000) // wait for animation
      .checkA11yResponsive();
  });

  it('has no detectable a11y violations on workshop content page', () => {
    cy.findByText('Workshops').click();
    cy.findByText('JavaScript: The React Parts')
      .closest('.workshop-card')
      .within(() => {
        cy.findByText('Learn').click();
      });
    cy.findByText('Start')
      .click()
      .checkA11yResponsive();

    cy.findByText('Edit')
      .click()
      .checkA11yResponsive();
  });

  it('has no detectable a11y violations on workshop content page dark mode', () => {
    cy.findByText('Workshops').click();
    cy.findByText('JavaScript: The React Parts')
      .closest('.workshop-card')
      .within(() => {
        cy.findByText('Learn').click();
      });
    cy.findByText('Start').click();
    cy.findByLabelText('Switch between Dark and Light mode')
      .click({ force: true })
      .checkA11yResponsive();

    cy.findByText('Edit')
      .click()
      .checkA11yResponsive();
  });
});
