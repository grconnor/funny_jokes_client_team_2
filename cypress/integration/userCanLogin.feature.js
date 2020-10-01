describe("User authenticates", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("successfully with valid credentials", () => {
    cy.get('[data-cy="login"]').click();
    cy.get('[data-cy="login-form"]').within(() => {
      cy.get('[data-cy="email"]').type("user@mail.com");
      cy.get('[data-cy="password"]').type("password");
      cy.get('[data-cy="button"]').contains('Submit').click()
    });
    cy.get('[data-cy="message"]').should("contain", "Hi user@mail.com");
  });
  it("unsuccessfully with invalid credentials", () => {
    cy.get('[data-cy="login"]').click();
    cy.get('[data-cy="login-form"]').within(() => {
      cy.get('[data-cy="email"]').type("user@mail.com");
      cy.get('[data-cy="password"]').type("wrongpassword");
      cy.get('[data-cy="button"]').contains('Submit').click()
    });
    cy.get('[data-cy="message"]').should("contain", "Invalid login credentials. Please try again.");
  });
});