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
    cy.viewport('macbook-15')
      .wait(500)
      .checkA11y();

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

    cy.findByText('Frontend Engineer').focus();

    checkA11y();
  });

  it('has no detectable a11y violations on landing page dark mode', () => {
    cy.findByText('Projects')
      .click()
      .findByLabelText('Switch between Dark and Light mode')
      .click({ force: true })
      .findByText('Malcolm')
      .click();

    cy.wait(1000); // landing page animation

    checkA11y();

    cy.findByText('Frontend Engineer').focus();

    checkA11y();
  });

  it('has no detectable a11y violations on projects page', () => {
    cy.findByText('Projects').click();
    checkA11y();
  });

  it('has no detectable a11y violations on projects page dark mode', () => {
    cy.findByText('Projects')
      .click()
      .findByLabelText('Switch between Dark and Light mode')
      .click({ force: true });
    checkA11y();
  });

  it('has no detectable a11y violations on workshops page', () => {
    cy.findByText('Workshops').click();
    checkA11y();
  });

  it('has no detectable a11y violations on workshops page dark mode', () => {
    cy.findByText('Workshops')
      .click()
      .findByLabelText('Switch between Dark and Light mode')
      .click({ force: true });
    checkA11y();
  });

  it('has no detectable a11y violations on workshop landing page', () => {
    cy.findByText('Workshops')
      .click()
      .findByText('JavaScript: The React Parts')
      .click()
      .wait(2000); // wait for animation
    checkA11y();
  });

  it('has no detectable a11y violations on workshop content page', () => {
    cy.findByText('Workshops')
      .click()
      .findByText('JavaScript: The React Parts')
      .click()
      .findByText('Start')
      .click();
    checkA11y();

    cy.queryByText('Edit')
      .click()
      .checkA11y();
  });

  it('has no detectable a11y violations on workshop content page dark mode', () => {
    cy.findByText('Workshops')
      .click()
      .findByText('JavaScript: The React Parts')
      .click()
      .findByText('Start')
      .click()
      .findByLabelText('Switch between Dark and Light mode')
      .click({ force: true });
    checkA11y();

    cy.queryByText('Edit')
      .click()
      .checkA11y();
  });

  it('has no detectable a11y violations on blogs page', () => {
    cy.findByText('Read Blog').click();
    checkA11y();
  });

  it('has no detectable a11y violations on blogs page dark mode', () => {
    cy.findByText('Read Blog')
      .click()
      .findByLabelText('Switch between Dark and Light mode')
      .click({ force: true });
    checkA11y();
  });

  it('has no detectable a11y violations on blog post', () => {
    cy.findByText('Read Blog')
      .click()
      .get('.blog-list-item')
      .first()
      .click();
    checkA11y();

    cy.findByTestId('prevBtn').click();
    checkA11y();

    cy.findByTestId('prevBtn').click();
    checkA11y();
  });

  it('has no detectable a11y violations on blog post dark mode', () => {
    cy.findByText('Read Blog')
      .click()
      .get('.blog-list-item')
      .first()
      .click()
      .findByLabelText('Switch between Dark and Light mode')
      .click({ force: true });
    checkA11y();

    cy.findByTestId('prevBtn').click();
    checkA11y();

    cy.findByTestId('prevBtn').click();
    checkA11y();
  });
});
