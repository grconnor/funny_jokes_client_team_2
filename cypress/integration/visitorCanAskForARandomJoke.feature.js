describe("Visitor can press a button to get a randome joke", () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: "GET",
      url: "http://localhost:3000/api/v1/jokeGetter",
      response: "fixture:randomJokeResponse.json",
    });
    cy.visit("/");
  });
  it("visitor can see the button", () => {
    cy.get('[data-cy="joke-getter"]').should(
      "contain",
      "Get the joke you need right now"
    );
    cy.get('[data-cy="joke-getter"]').click();
  });
  it("shows joke", () => {
    cy.get("[data-cy='random-joke']").within(() => {
      cy.contains(
        "Why do trees seem suspicious on sunny days? Dunno, they're just a bit shady."
      );
      cy.contains("upvotes");
    });
  });
});
