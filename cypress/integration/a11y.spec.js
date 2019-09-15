/// <reference types="Cypress" />

describe('Accessibility checks', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.injectAxe();
    cy.configureAxe({
      rules: [
        {
          id: 'region',
          enabled: false,
        },
      ],
    });
    cy.wait(500);
  });

  function checkA11y() {
    cy.wait(500).checkA11y();

    cy.viewport('ipad-2')
      .wait(500)
      .checkA11y();

    cy.viewport('iphone-5')
      .wait(500)
      .checkA11y();
  }

  it('has no detectable a11y violations on landing page', () => {
    cy.wait(1000); // landing page animation

    checkA11y();
  });

  it('has no detectable a11y violations on landing page dark mode', () => {
    cy.getByText('Projects')
      .click()
      .getByLabelText('Switch between Dark and Light mode')
      .click({ force: true })
      .getByText('Malcolm')
      .click();

    cy.wait(1000); // landing page animation

    checkA11y();
  });

  it('has no detectable a11y violations on projects page', () => {
    cy.getByText('Projects').click();
    checkA11y();
  });

  it('has no detectable a11y violations on projects page dark mode', () => {
    cy.getByText('Projects')
      .click()
      .getByLabelText('Switch between Dark and Light mode')
      .click({ force: true });
    checkA11y();
  });

  it('has no detectable a11y violations on workshops page', () => {
    cy.getByText('Workshops').click();
    checkA11y();
  });

  it('has no detectable a11y violations on workshops page dark mode', () => {
    cy.getByText('Workshops')
      .click()
      .getByLabelText('Switch between Dark and Light mode')
      .click({ force: true });
    checkA11y();
  });

  it('has no detectable a11y violations on workshop landing page', () => {
    cy.getByText('Workshops')
      .click()
      .getByText('JavaScript: The React Parts')
      .click()
      .wait(2000); // wait for animation
    checkA11y();
  });

  it('has no detectable a11y violations on workshop content page', () => {
    cy.getByText('Workshops')
      .click()
      .getByText('JavaScript: The React Parts')
      .click()
      .getByText('Start')
      .click();
    checkA11y();

    cy.viewport('iphone-5')
      .getByLabelText('Toggle Table of Contents')
      .click()
      .wait(500)
      .checkA11y();
  });

  it('has no detectable a11y violations on blogs page', () => {
    cy.getByText('Read Blog').click();
    checkA11y();
  });

  it('has no detectable a11y violations on blogs page dark mode', () => {
    cy.getByText('Read Blog')
      .click()
      .getByLabelText('Switch between Dark and Light mode')
      .click({ force: true });
    checkA11y();
  });

  it('has no detectable a11y violations on blog post', () => {
    cy.getByText('Read Blog')
      .click()
      .get('.blog-list-item')
      .first()
      .click();

    checkA11y();
  });

  it('has no detectable a11y violations on blog post dark mode', () => {
    cy.getByText('Read Blog')
      .click()
      .get('.blog-list-item')
      .first()
      .click()
      .getByLabelText('Switch between Dark and Light mode')
      .click({ force: true });

    checkA11y();
  });
});
