describe("page fibonacci works correctly", function () {
  beforeEach(function () {
    cy.visit("/fibonacci");
  });

  it("should disable button", function () {
    cy.get("input").clear();
    cy.get('button[type="submit"]').should("be.disabled");
  });

  it("should return fibonacci", function () {
    cy.get("input").type("5");
    cy.get('button[type="submit"]').should("not.be.disabled").click();

    cy.get('[class^="fibonacci-page_box"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");

    const num = 5;
    const expected = [1, 1, 2, 3, 5, 8];

    cy.get("@allCircle").should(($allCircle) => {
      for (let i = 0; i < num + 1; i++) {
        expect($allCircle[i]).to.contain(expected[i]);
      }
    });
  });
});
