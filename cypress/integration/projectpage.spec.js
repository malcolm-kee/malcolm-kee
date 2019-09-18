/// <reference types="Cypress" />

describe('homepage', () => {
  beforeEach(() => {
    cy.visit('/projects');
  });

  it('able to load', () => {
    cy.findAllByText('Past Projects');
  });

  it.only('loads all the projects', () => {
    cy.findByText('Generative Arts')
      .click()
      .findByText('Live')
      .click()
      .location('pathname')
      .should('include', 'generative-art');
  });
});
