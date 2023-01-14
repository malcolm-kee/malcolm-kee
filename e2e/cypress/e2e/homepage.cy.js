/// <reference types="Cypress" />

describe.skip('homepage', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('able to load', () => {
    cy.findAllByText('Malcolm Kee');
  });

  it('able to fill up contact form', () => {
    cy.findByLabelText('Your Name').type('Malcolm Kee');
    cy.findByLabelText('Your Email').type('malcolm@malcolmkee.com');
    cy.findByLabelText('Message').type(
      `How are you?
      E2E test are great!`
    );
    /** we testing against actual site, let's don't submit the contact form */
    // .findByText('Send')
    // .click()
    // .location('pathname')
    // .should('include', 'message-received');
  });

  it('will validate before submit contact form', () => {
    cy.findByLabelText('Your Name').type('Malcolm Kee');
    cy.findByLabelText('Your Email').type('malcolm@malcolmkee.com');
    cy.findByText('Send')
      .click()
      .location('pathname')
      .should('not.include', 'message-received');
  });
});
