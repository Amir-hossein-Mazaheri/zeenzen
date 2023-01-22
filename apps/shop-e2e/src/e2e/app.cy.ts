describe('Shop Integration Test', () => {
  it('Should display correct user firstname and lastname after signin and after updating profile', () => {
    cy.signin();

    cy.findByText(/Test User/i)
      .should('exist')
      .click();

    cy.findByRole('menuitem', {
      name: /پروفایل من/i,
    })
      .should('exist')
      .click();

    cy.findByLabelText(/نام:/i).should('exist').clear().type('امیرحسین');

    cy.findByLabelText(/نام خانوادگی/i)
      .should('exist')
      .clear()
      .type('مظاهری');

    cy.findByLabelText(/رمز عبور فعلی/i)
      .should('exist')
      .type('123456');

    cy.findByRole('button', {
      name: /اعمال تغییرات/i,
    }).click();

    cy.reload();

    cy.visit('/');

    cy.findByText(/امیرحسین مظاهری/i).should('exist');
  });
});
