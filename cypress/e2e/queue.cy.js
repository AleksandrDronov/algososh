/* eslint-disable cypress/no-unnecessary-waiting */
describe("page stack works correctly", function () {
  beforeEach(function () {
    cy.visit("/queue");
  });

  it("should disable buttons", function () {
    cy.get("input").clear();
    cy.get('button[type="submit"]').should("be.disabled");
    cy.get('button[type="button"][class^="text"]').should("be.disabled");
    cy.get('button[type="reset"]').should("be.disabled");
  });

  it("should add element", function () {
    for (let i = 1; i < 4; i++) {
      cy.get("input").type(i);
      cy.get('button[type="submit"]').should("not.be.disabled").click();

      cy.get('[class^="queue-page_box"]')
        .find('[class^="circle_content"]')
        .find('[class^="circle_circle"]')
        .as("allCircle");

      cy.get("@allCircle").should(async ($allCircle) => {
        expect($allCircle[i - 1]).to.have.css(
          "border",
          "4px solid rgb(210, 82, 225)"
        );

        await new Cypress.Promise((resolve) => setTimeout(resolve, 500));

        expect($allCircle[i - 1]).to.contain(i);
        expect($allCircle[i - 1]).to.have.css(
          "border",
          "4px solid rgb(0, 50, 255)"
        );
      });

      cy.get('[class^="queue-page_box"]')
        .find('[class^="circle_content"]')
        .eq(0)
        .should("contain", "head");
      cy.get('[class^="queue-page_box"]')
        .find('[class^="circle_content"]')
        .eq(i - 1)
        .should("contain", "tail");
    }
  });

  it("should delete element", function () {
    for (let i = 1; i < 4; i++) {
      cy.get("input").type(i);
      cy.get('button[type="submit"]').should("not.be.disabled").click();
      cy.wait(500);
    }

    cy.get('button[type="button"][class^="text"]')
      .should("not.be.disabled")
      .click();

    cy.get('[class^="queue-page_box"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");

    cy.get("@allCircle").should(async ($allCircle) => {
      expect($allCircle[0]).to.have.css(
        "border",
        "4px solid rgb(210, 82, 225)"
      );
      await new Cypress.Promise((resolve) => setTimeout(resolve, 500));

      expect($allCircle[0]).to.contain("");
    });

    cy.get('[class^="queue-page_box"]')
      .find('[class^="circle_content"]')
      .eq(1)
      .should("contain", "head");
  });

  it("should delete all elements", function () {
    for (let i = 1; i < 4; i++) {
      cy.get("input").type(i);
      cy.get('button[type="submit"]').should("not.be.disabled").click();
      cy.wait(500);
    }

    cy.get('button[type="reset"]').should("not.be.disabled").click();

    cy.get('[class^="queue-page_box"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");

    cy.get("@allCircle").should("contain", "");
  });
});
