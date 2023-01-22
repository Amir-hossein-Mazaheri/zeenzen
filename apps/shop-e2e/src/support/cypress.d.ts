/// <reference types="@testing-library/cypress" />

declare namespace Cypress {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Chainable<Subject> {
    signin(role?: UserRole): void;

    logout();
  }
}
