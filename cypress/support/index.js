import './commands';

Cypress.on('window:before:load', win => {
  // because this is called before any scripts
  // have loaded - the ga function is undefined
  // so we need to create it.
  win.ga = cy.stub().as('ga');
});
