describe("homepage should work as expected", () => {
  it("should render cards with information on homepage", () => {
    cy.visit("http://localhost:5173");

    //get lang
    cy.get("#main-menu").should("exist");
    cy.get("#main-menu").click();

    cy.get("#main-menu-language-se").then(($lang) => {
      //if se
      if ($lang.hasClass("font-weight-bold")) {
        cy.get("#main-card-about-header").contains("Om EXsqrtl", {
          matchCase: false,
        });
        cy.get("#main-card-search-header").contains("sök", {
          matchCase: false,
        });
        cy.get("#main-card-account-header").contains("konto", {
          matchCase: false,
        });
        //if en
      } else {
        cy.get("#main-card-about-header").contains("About EXsqrtl", {
          matchCase: false,
        });
        cy.get("#main-card-search-header").contains("search", {
          matchCase: false,
        });
        cy.get("#main-card-account-header").contains("account", {
          matchCase: false,
        });
      }
    });
  });

  //render cards row on desktop
  it("should include cards in row on desktop", () => {
    cy.visit("http://localhost:5173");
    cy.viewport("macbook-13");

    cy.get("#homepage-container")
      .should("have.class", "row my-1")
      .children()
      .should("have.length", 3);
  });

  //render cards column on mobile
  it("should include cards in column on mobile", () => {
    cy.visit("http://localhost:5173");
    cy.viewport("iphone-x");

    cy.get("#homepage-container")
      .should("have.class", "column my-1")
      .children()
      .should("have.length", 3);
  });
});
