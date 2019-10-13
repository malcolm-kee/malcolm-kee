/// <reference types="Cypress" />

describe('Accessibility checks', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.initAxe();
    cy.wait(500);
  });

  it('has no detectable a11y violations on landing page', () => {
    cy.wait(1000).checkA11yResponsive();

    cy.findByText('Frontend Engineer')
      .focus()
      .checkA11yResponsive();
  });

  it('has no detectable a11y violations on landing page dark mode', () => {
    cy.findByText('Projects')
      .click()
      .findByLabelText('Switch between Dark and Light mode')
      .click({ force: true })
      .findByText('Malcolm')
      .click();

    cy.wait(1000).checkA11yResponsive();

    cy.findByText('Frontend Engineer')
      .focus()
      .checkA11yResponsive();
  });

  it('has no detectable a11y violations on projects page', () => {
    cy.findByText('Projects')
      .click()
      .checkA11yResponsive();
  });

  it('has no detectable a11y violations on projects page dark mode', () => {
    cy.findByText('Projects')
      .click()
      .findByLabelText('Switch between Dark and Light mode')
      .click({ force: true })
      .checkA11yResponsive();
  });

  it('has no detectable a11y violations on blogs page', () => {
    cy.findByText('Read Blog')
      .click()
      .wait(1000)
      .checkA11yResponsive();

    // focus doesn't trigger css style, don't know why
    /* cy.findAllByRole('listitem')
      .first()
      .find('a')
      .focus()
      .checkA11y(); */
  });

  it('has no detectable a11y violations on blogs page dark mode', () => {
    cy.findByText('Read Blog')
      .click()
      .findByLabelText('Switch between Dark and Light mode')
      .click({ force: true })
      .checkA11yResponsive();
  });

  it('has no detectable a11y violations on blog post', () => {
    cy.findByText('Read Blog')
      .click()
      .get('.blog-list-item')
      .first()
      .click()
      .checkA11yResponsive();

    cy.findByTestId('prevBtn')
      .click()
      .checkA11yResponsive();

    cy.findByTestId('prevBtn')
      .click()
      .checkA11yResponsive();
  });

  it('has no detectable a11y violations on blog post dark mode', () => {
    cy.findByText('Read Blog')
      .click()
      .get('.blog-list-item')
      .first()
      .click()
      .findByLabelText('Switch between Dark and Light mode')
      .click({ force: true })
      .checkA11yResponsive();

    cy.findByTestId('prevBtn')
      .click()
      .checkA11yResponsive();

    cy.findByTestId('prevBtn')
      .click()
      .checkA11yResponsive();
  });

  it('has no detectable a11y violations on all tags page', () => {
    cy.findByText('Read Blog')
      .click()
      .findByText('All tags')
      .click()
      .checkA11yResponsive();
  });

  it('has no detectable a11y violations on all tags page dark mode', () => {
    cy.findByText('Read Blog')
      .click()
      .findByText('All tags')
      .click()
      .findByLabelText('Switch between Dark and Light mode')
      .click({ force: true })
      .checkA11yResponsive();
  });

  it('has no detectable a11y violations on tag page', () => {
    cy.findByText('Read Blog')
      .click()
      .findByText('All tags')
      .click()
      .findAllByRole('listitem')
      .first()
      .click()
      .checkA11yResponsive();
  });

  it('has no detectable a11y violations on tag page dark mode', () => {
    cy.findByText('Read Blog')
      .click()
      .findByText('All tags')
      .click()
      .findAllByRole('listitem')
      .first()
      .click()
      .findByLabelText('Switch between Dark and Light mode')
      .click({ force: true })
      .checkA11yResponsive();
  });
});
