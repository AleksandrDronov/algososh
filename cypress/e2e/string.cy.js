import { def, changing, modified } from "./constants";

describe("page string works correctly", function () {
  beforeEach(function () {
    cy.visit("/recursion");
  });

  it("should disable button", function () {
    cy.get("input").clear();
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("should reverse string", function () {
    cy.get("input").type("Hello");
    cy.get('button[type="submit"]').should("not.be.disabled").click();

    cy.get('[class^="string_box"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");

    cy.get("@allCircle").should(async ($allCircle) => {
      expect($allCircle).to.have.length(5);
      const letters = ["H", "e", "l", "l", "o"];
      let start = 0;
      let end = 4;

      while (start <= end) {
        expect($allCircle[start]).to.contain(letters[start]);
        expect($allCircle[start]).to.have.css(
          "border",
          def
        );
        start++;
      }

      await new Cypress.Promise((resolve) => setTimeout(resolve, 500));

      start = 0;
      end = 4;

      while (start <= end) {
        expect($allCircle[start]).to.have.css(
          "border",
          changing
        );
        expect($allCircle[end]).to.have.css(
          "border",
          changing
        );

        await new Cypress.Promise((resolve) => setTimeout(resolve, 1000));

        expect($allCircle[start]).to.contain(letters[end]);
        expect($allCircle[end]).to.contain(letters[start]);

        expect($allCircle[start]).to.have.css(
          "border",
          modified
        );
        expect($allCircle[end]).to.have.css(
          "border",
          modified
        );
        start++;
        end--;
      }
    });
  });
});
