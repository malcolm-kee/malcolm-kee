/// <reference types="Cypress" />

describe('homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('able to load', () => {
    cy.getAllByText('Malcolm Kee');
  });

  it('able to fill up contact form', () => {
    cy.getByLabelText('Your Name')
      .type('Malcolm Kee')
      .getByLabelText('Your Email')
      .type('malcolm@malcolmkee.com')
      .getByLabelText('Message')
      .type(
        `How are you?
      E2E test are great!`
      )
      .getByText('Send')
      .click();

    cy.location('pathname').should('include', 'message-received');
  });

  it('will validate before submit contact form', () => {
    cy.getByLabelText('Your Name')
      .type('Malcolm Kee')
      .getByLabelText('Your Email')
      .type('malcolm@malcolmkee.com')
      .getByText('Send')
      .click();

    cy.location('pathname').should('not.include', 'message-received');
  });
});
