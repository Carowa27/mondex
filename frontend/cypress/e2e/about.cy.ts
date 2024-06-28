describe("about should work as expected", () => {
  it("should render cards with information on about", () => {
    cy.visit("http://localhost:5173/about");

    //get lang
    cy.get("#main-menu").should("exist");
    cy.get("#main-menu").click();

    cy.get("#main-menu-language-se").then(($lang) => {
      //if se
      if ($lang.hasClass("font-weight-bold")) {
        cy.get("#about-card-examprj-header").contains("Exam Projekt", {
          matchCase: false,
        });
        cy.get("#about-card-purpose-header").contains("Syfte", {
          matchCase: false,
        });
        cy.get("#about-card-goal-header").contains("Mål", {
          matchCase: false,
        });
        //if en
      } else {
        cy.get("#about-card-examprj-header").contains("exam project", {
          matchCase: false,
        });
        cy.get("#about-card-purpose-header").contains("purpose", {
          matchCase: false,
        });
        cy.get("#about-card-goal-header").contains("goal", {
          matchCase: false,
        });
      }
    });
  });

  //render cards row on desktop
  it("should include cards in row on desktop", () => {
    cy.visit("http://localhost:5173/about");
    cy.viewport("macbook-13");

    cy.get("#about-container")
      .should("have.class", "row my-1")
      .children()
      .should("have.length", 3);
  });

  //render cards column on mobile
  it("should include cards in column on mobile", () => {
    cy.visit("http://localhost:5173/about");
    cy.viewport("iphone-x");

    cy.get("#about-container")
      .should("have.class", "column my-1")
      .children()
      .should("have.length", 3);
  });
});
