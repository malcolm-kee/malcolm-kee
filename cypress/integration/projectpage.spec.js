/// <reference types="Cypress" />

describe('homepage', () => {
  beforeEach(() => {
    cy.visit('/projects');
  });

  it('able to load', () => {
    cy.getAllByText('Past Projects');
  });
});
