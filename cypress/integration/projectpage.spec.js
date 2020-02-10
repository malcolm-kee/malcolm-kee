/// <reference types="Cypress" />

describe('homepage', () => {
  beforeEach(() => {
    cy.visit('/projects').wait(1000); // wait for hydration
  });

  it('able to load', () => {
    cy.findAllByText('Past Projects');
  });

  it('loads all the projects', () => {
    cy.findByText('Generative Arts')
      .click()
      .wait(500);
    cy.findByText('Live')
      .click()
      .location('pathname')
      .should('include', 'generative-art');
  });
});
