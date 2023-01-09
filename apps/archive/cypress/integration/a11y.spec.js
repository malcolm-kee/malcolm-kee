/// <reference types="Cypress" />
/// <reference types="../support" />

describe(`Accessibility checks`, () => {
  beforeEach(() => {
    cy.visit('/').initAxe().wait(500);
  });

  it(`has no detectable a11y violations on landing page`, () => {
    cy.wait(1000).checkA11yResponsive();

    cy.findByText('Software Engineer').focus().checkA11yResponsive();
  });

  it('has no detectable a11y violations on projects page', () => {
    cy.findByText('Projects').click().checkA11yResponsive();
  });

  it('has no detectable a11y violations on blogs page', () => {
    cy.findByText('Read Blog').click().wait(1000).checkA11yResponsive();

    cy.findAllByRole('listitem')
      .first()
      .find('a')
      .focus()

      .checkA11y();
  });

  it('has no detectable a11y violations on blog post', () => {
    cy.findByText('Read Blog')
      .click()
      .get('.blog-list-item')
      .first()
      .click()
      .checkA11yResponsive();

    cy.findByTestId('prevBtn').click().checkA11yResponsive();

    cy.findByTestId('prevBtn').click().checkA11yResponsive();
  });

  it('has no detectable a11y violations on all tags page', () => {
    cy.findByText('Read Blog').click();

    cy.findByText('All tags').click();
    cy.checkA11yResponsive();
  });

  it(`has no detectable a11y violations on tag page`, () => {
    cy.findByText('Read Blog').click();
    cy.findByText('All tags').click().wait(1000);
    cy.findAllByRole('listitem').first().click().checkA11yResponsive();
  });
});
