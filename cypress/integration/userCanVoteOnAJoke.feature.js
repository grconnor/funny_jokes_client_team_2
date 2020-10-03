describe("Authenticated user can vote on a Joke", () => {
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
      url: "http://localhost:3000/api/v1/votes",
      response: "fixture:voteJokeResponse.json",
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


  it("User can see the vote button", () => {

    cy.get("[data-cy='upvotes']").should("not.exist");
    cy.get('[data-cy="joke"]').click();
    cy.get("[data-cy='random-joke']").within(() => {
      cy.contains(
        "Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady."
      );
      cy.get("[data-cy='upvote']").should("contain", "upvotes: 5");
    });


    cy.get('[data-cy="vote-button"]').should("exist");

    cy.get('[data-cy="vote-button"]').click();
    cy.get('[data-cy="upvote"]').should("contain", 6);
    cy.get('[data-cy="vote-message"]').should(
      "contain",
      "Your vote has been submitted"
    );
  });
});
