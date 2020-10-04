describe("Visitor can press a button to get a random joke", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/jokes",
      response: "fixture:randomJokeResponse.json",
    });
    cy.visit("/");
  });

  it("visitor won't see upvotes before asking for a joke", () => {
    cy.get("[data-cy='upvotes']").should("not.exist");
  });

  it("displays joke", () => {
    cy.get('[data-cy="joke"]').click();
    cy.get("[data-cy='random-joke']").within(() => {
      cy.contains(
        "Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady."
      );
      cy.get("[data-cy='upvote']").should("contain", "upvotes: 5");
    });
  });
});
