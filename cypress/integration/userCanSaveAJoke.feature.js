describe("Authenticated user can save a Joke", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/auth/sign_in",
      response: "fixture:login.json",
      headers: {
        uid: "user@mail.com",
      },
    });
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/jokes",
      response: "fixture:randomJokeResponse.json",
    });
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/jokes",
      response: "fixture:saveJokeResponse.json",
      headers: {
        uid: "user@mail.com",
      },
    });

    cy.visit("/");

    cy.get('[data-cy="login"]').click();
    cy.get('[data-cy="login-form"]').within(() => {
      cy.get('[data-cy="email"]').type("user@mail.com");
      cy.get('[data-cy="password"]').type("password");
      cy.get('[data-cy="button"]').click();
    });
  });

  it("User can see the save joke button", () => {
    cy.get("[data-cy='save-joke-button']").should("not.exist");
    cy.get('[data-cy="joke"]').click();
    cy.get("[data-cy='random-joke']").within(() => {
      cy.contains(
        "Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady."
      );
    });

    cy.get('[data-cy="save-joke-button"]').click();
    cy.get('[data-cy="saved-joke-message"]').should(
      "contain",
      "Your joke has been saved"
    );
  });
});
