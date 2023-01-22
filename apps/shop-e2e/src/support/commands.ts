import '@testing-library/cypress/add-commands';

import { UserRole } from '@zeenzen/data';

Cypress.Commands.add('signin', (role) => {
  cy.visit('/signin');

  let userEmail: string;

  switch (role) {
    case UserRole.Admin:
      userEmail = 'admin@test.com';
      break;

    case UserRole.Customer:
      userEmail = 'customer@test.com';
      break;

    case UserRole.Instructor:
      userEmail = 'instructor@test.com';
      break;

    default:
      userEmail = 'user@test.com';
      break;
  }

  cy.findByPlaceholderText(/ایمیل/i)
    .should('exist')
    .type(userEmail)
    .should('have.value', userEmail);

  cy.findByPlaceholderText(/رمز عبور/i)
    .should('exist')
    .type('123456')
    .should('have.value', '123456');

  cy.findByRole('button', {
    name: /ورود/i,
  })
    .should('exist')
    .click();

  cy.visit('/');
});

Cypress.Commands.add('logout', () => {
  cy.findByRole('img', {
    name: /user-avatar/i,
  })
    .should('exist')
    .click();

  cy.findByText(/خروج از حساب کاربری/i)
    .should('exist')
    .click();
});
