/// <reference types="Cypress" />

describe('homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('able to load', () => {
    cy.findAllByText('Malcolm Kee');
  });

  it('able to fill up contact form', () => {
    cy.findByLabelText('Your Name')
      .type('Malcolm Kee')
      .findByLabelText('Your Email')
      .type('malcolm@malcolmkee.com')
      .findByLabelText('Message')
      .type(
        `How are you?
      E2E test are great!`
      )
      .findByText('Send')
      .click()
      .location('pathname')
      .should('include', 'message-received');
  });

  it('will validate before submit contact form', () => {
    cy.findByLabelText('Your Name')
      .type('Malcolm Kee')
      .findByLabelText('Your Email')
      .type('malcolm@malcolmkee.com')
      .findByText('Send')
      .click()
      .location('pathname')
      .should('not.include', 'message-received');
  });
});
