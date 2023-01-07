/* eslint-disable cypress/no-unnecessary-waiting */
describe("page list works correctly", function () {
  beforeEach(function () {
    cy.visit("/list");
  });

  it("should disable buttons", function () {
    cy.get("input").clear();
    cy.get('button[type="submit"]').should("be.disabled");
    cy.get('[data-testid="addToTail"]').should("be.disabled");
    cy.get('[data-testid="addByIndex"]').should("be.disabled");
    cy.get('[data-testid="deleteByIndex"]').should("be.disabled");
  });

  it("should add default list", function () {
    const arr = [0, 34, 8, 1];

    cy.get('[class^="list-page_box"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");

    cy.get("@allCircle").each(($el, index) => {
      expect($el).to.contain(arr[index]);
      expect($el).to.have.css("border", "4px solid rgb(0, 50, 255)");
    });

    cy.get('[class^="list-page_box"]')
      .find('[class^="circle_content"]')
      .first()
      .should("contain", "head");

    cy.get('[class^="list-page_box"]')
      .find('[class^="circle_content"]')
      .last()
      .should("contain", "tail");
  });

  it("should add element to head", function () {
    cy.get("input[type='text']").type(5);
    cy.get('button[type="submit"]').should("not.be.disabled").click();

    cy.get('[class^="list-page_box"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");

    cy.get("@allCircle")
      .first()
      .should("contain", "5")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .should("have.css", "width", "56px");

    cy.wait(1000);

    cy.get("@allCircle")
      .first()
      .should("contain", "5")
      .should("have.css", "border", "4px solid rgb(127, 224, 81)");

    cy.wait(500);

    cy.get("@allCircle")
      .first()
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");

    cy.get('[class^="list-page_box"]')
      .find('[class^="circle_content"]')
      .first()
      .should("contain", "head");
  });

  it("should add element to tail", function () {
    cy.get("input[type='text']").type(5);
    cy.get('[data-testid="addToTail"]').should("not.be.disabled").click();

    cy.get('[class^="list-page_box"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");

    cy.get("@allCircle")
      .eq(3)
      .should("contain", "5")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .should("have.css", "width", "56px");

    cy.wait(1000);

    cy.get("@allCircle")
      .last()
      .should("contain", "5")
      .should("have.css", "border", "4px solid rgb(127, 224, 81)");

    cy.wait(500);

    cy.get("@allCircle")
      .last()
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");

    cy.get('[class^="list-page_box"]')
      .find('[class^="circle_content"]')
      .last()
      .should("contain", "tail");
  });

  it("should add element by index", function () {
    cy.get("input[type='text']").type(5);
    cy.get("input[type='number']").type(2);
    cy.get('[data-testid="addByIndex"]').should("not.be.disabled").click();

    cy.get('[class^="list-page_box"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");

    for (let i = 0; i < 3; i++) {
      cy.wait(1000);

      cy.get("@allCircle")
        .eq(i)
        .should("contain", "5")
        .should("have.css", "border", "4px solid rgb(210, 82, 225)")
        .should("have.css", "width", "56px");

      cy.get("@allCircle")
        .eq(i + 1)
        .should("have.css", "border", "4px solid rgb(210, 82, 225)");
    }

    cy.wait(1000);

    cy.get("@allCircle")
      .eq(2)
      .should("contain", "5")
      .should("have.css", "border", "4px solid rgb(127, 224, 81)")
      .should("have.css", "width", "80px");

    cy.wait(500);

    cy.get("@allCircle")
      .eq(2)
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");
  });

  it("should delete element from head", function () {
    cy.get('[data-testid="deleteFromHead"]').should("not.be.disabled").click();

    cy.get('[class^="list-page_box"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");

    cy.get("@allCircle")
      .eq(1)
      .should("contain", "0")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .should("have.css", "width", "56px");

    cy.wait(1000);

    cy.get("@allCircle")
      .first()
      .should("contain", "34")
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .should("have.css", "width", "80px");

    cy.get('[class^="list-page_box"]')
      .find('[class^="circle_content"]')
      .first()
      .should("contain", "head");
  });

  it("should delete element from tail", function () {
    cy.get('[data-testid="deleteFromTail"]').should("not.be.disabled").click();

    cy.get('[class^="list-page_box"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");

    cy.get("@allCircle")
      .last()
      .should("contain", "1")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .should("have.css", "width", "56px");

    cy.wait(1000);

    cy.get("@allCircle")
      .last()
      .should("contain", "8")
      .should("have.css", "border", "4px solid rgb(0, 50, 255)")
      .should("have.css", "width", "80px");

    cy.get('[class^="list-page_box"]')
      .find('[class^="circle_content"]')
      .last()
      .should("contain", "tail");
  });

  it("should delete element by index", function () {
    cy.get("input[type='number']").type(2);
    cy.get('[data-testid="deleteByIndex"]').should("not.be.disabled").click();

    cy.get('[class^="list-page_box"]')
      .find('[class^="circle_content"]')
      .find('[class^="circle_circle"]')
      .as("allCircle");

    for (let i = 0; i < 3; i++) {
      cy.wait(1000);

      cy.get("@allCircle")
        .eq(i)
        .should("have.css", "border", "4px solid rgb(210, 82, 225)")
        .should("have.css", "width", "80px");
    }

    cy.wait(1000);

    cy.get("@allCircle")
      .eq(3)
      .should("contain", "8")
      .should("have.css", "border", "4px solid rgb(210, 82, 225)")
      .should("have.css", "width", "56px");

    cy.wait(1000);

    cy.get("@allCircle")
      .eq(2)
      .should("contain", "1")
      .should("have.css", "border", "4px solid rgb(0, 50, 255)");
  });
});
