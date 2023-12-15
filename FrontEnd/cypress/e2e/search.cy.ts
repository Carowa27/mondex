describe("searchpage should work as expected", () => {
  it("should render searchpage", () => {
    cy.visit("http://localhost:5173/search");

    //get lang
    cy.get("#main-menu").should("exist");
    cy.get("#main-menu").click();

    cy.get("#main-menu-language-se").then(($lang) => {
      //if se
      if ($lang.hasClass("font-weight-bold")) {
        cy.get("#search-header").contains("Sök", {
          matchCase: false,
        });
      } else {
        cy.get("#search-header").contains("search", {
          matchCase: false,
        });
      }
    });
  });

  //render search form on desktop
  it("should render form for search on desktop", () => {
    cy.visit("http://localhost:5173/search");
    cy.viewport("macbook-13");

    cy.get("#search-form").should("exist");
    cy.get("#search-form-container")
      .should("have.class", "d-flex justify-content-start")
      .children()
      .should("have.length", 2);
  });

  //render search form on mobile
  it("should render form for search on mobile", () => {
    cy.visit("http://localhost:5173/search");
    cy.viewport("iphone-x");

    cy.get("#search-form").should("exist");
    cy.get("#search-form-container")
      .should("have.class", "d-flex justify-content-around")
      .children()
      .should("have.length", 2);
  });
});
