describe("header should render as expected on different viewports", () => {
  //render header
  it("render header successfully", () => {
    cy.visit("http://localhost:5173");
    cy.get("#main-logo").should("exist");
  });

  //render menu mobile
  it("render menu successfully on mobile", () => {
    cy.viewport("iphone-x");
    cy.visit("http://localhost:5173");

    cy.get("#main-menu").should("exist");
    cy.get("#main-menu")
      .click()
      .then(() => {
        cy.get("#main-menu-language-se").contains("se", {
          matchCase: false,
        });
      });
  });

  //render language choices mobile
  it("render language choices successfully on mobile", () => {
    cy.viewport("iphone-x");
    cy.visit("http://localhost:5173");

    cy.get("#main-menu").should("exist");
    cy.get("#main-menu").click();
    cy.get("#main-menu-language-se").then(($lang) => {
      //if se
      if ($lang.hasClass("font-weight-bold")) {
        cy.get("#main-menu-searchpage").contains("sök", {
          matchCase: false,
        });
        cy.get("#main-menu-about").contains("Om EXsqrtl", {
          matchCase: false,
        });
        cy.get("#main-menu-login").contains("Logga in", {
          matchCase: false,
        });
        cy.get("#main-menu-language-en")
          .click()
          .then(() => {
            cy.get("#main-menu-searchpage").contains("Search", {
              matchCase: false,
            });
            cy.get("#main-menu-about").contains("about exsqrtl", {
              matchCase: false,
            });
            cy.get("#main-menu-login").contains("login", {
              matchCase: false,
            });
          });
        //if en
      } else {
        cy.get("#main-menu-searchpage").contains("search", {
          matchCase: false,
        });
        cy.get("#main-menu-about").contains("about exsqrtl", {
          matchCase: false,
        });
        cy.get("#main-menu-login").contains("login", {
          matchCase: false,
        });
        cy.get("#main-menu-language-sv")
          .click()
          .then(() => {
            cy.get("#main-menu-searchpage").contains("sök", {
              matchCase: false,
            });
            cy.get("#main-menu-about").contains("om exsqrtl", {
              matchCase: false,
            });
            cy.get("#main-menu-login").contains("Logga in", {
              matchCase: false,
            });
          });
      }
    });
  });

  //render menu desktop
  it("render menu w language choices successfully on desktop", () => {
    cy.viewport("macbook-13");
    cy.visit("http://localhost:5173");

    cy.get("#main-menu-language").should("exist");
    cy.get("#main-menu-language")
      .click()
      .then(() => {
        cy.get("#main-menu-language-se").then(($lang) => {
          //if se
          if ($lang.hasClass("font-weight-bold")) {
            cy.get("#main-menu-searchpage").contains("sök", {
              matchCase: false,
            });
            cy.get("#main-menu-about").contains("Om EXsqrtl", {
              matchCase: false,
            });
            cy.get("#main-menu-login").contains("Logga in", {
              matchCase: false,
            });
            cy.get("#main-menu-language-en")
              .click()
              .then(() => {
                cy.get("#main-menu-searchpage").contains("Search", {
                  matchCase: false,
                });
                cy.get("#main-menu-about").contains("about exsqrtl", {
                  matchCase: false,
                });
                cy.get("#main-menu-login").contains("login", {
                  matchCase: false,
                });
              });
            //if en
          } else {
            cy.get("#main-menu-searchpage").contains("search", {
              matchCase: false,
            });
            cy.get("#main-menu-about").contains("about exsqrtl", {
              matchCase: false,
            });
            cy.get("#main-menu-login").contains("login", {
              matchCase: false,
            });
            cy.get("#main-menu-language-sv")
              .click()
              .then(() => {
                cy.get("#main-menu-searchpage").contains("sök", {
                  matchCase: false,
                });
                cy.get("#main-menu-about").contains("om exsqrtl", {
                  matchCase: false,
                });
                cy.get("#main-menu-login").contains("Logga in", {
                  matchCase: false,
                });
              });
          }
        });
      });
  });

  //render theme choices
  it("render theme choices successfully", () => {
    cy.visit("http://localhost:5173");

    cy.get("#main-menu").should("exist");
    cy.get("#main-menu").click();

    cy.get("#main-menu-theme-container>.bi").then(($themeBtn) => {
      //if sun
      if ($themeBtn.hasClass("bi-brightness-high-fill")) {
        cy.get(".bi-brightness-high-fill").should(
          "have.css",
          "color",
          "rgb(255, 217, 82)"
        );
        cy.get(".bi-brightness-high-fill")
          .click()
          .then(() => {
            cy.get(".bi.bi-moon-fill").should(
              "have.css",
              "color",
              "rgb(85, 77, 66)"
            );
          });
        //if moon
      } else {
        cy.get(".bi.bi-moon-fill").should(
          "have.css",
          "color",
          "rgb(85, 77, 66)"
        );
        cy.get(".bi.bi-moon-fill")
          .click()
          .then(() => {
            cy.get(".bi-brightness-high-fill").should(
              "have.css",
              "color",
              "rgb(255, 217, 82)"
            );
          });
      }
    });
  });

  //redirect check
  it("redirect correctly from meny successfully on mobile", () => {
    cy.visit("http://localhost:5173");
    cy.viewport("iphone-x");

    cy.get("#main-menu").should("exist");
    cy.get("#main-menu").click();
    //searchpage
    cy.get("#main-menu-searchpage").click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:5173/search");
    });
    cy.get("#main-menu").click();
    //about page
    cy.get("#main-menu-about").click();
    cy.location().should((loc) => {
      expect(loc.href).to.eq("http://localhost:5173/about");
    });
    cy.get("#main-menu").click();
    //login page
    cy.get("#main-menu-login").click();
    //should redirect to url including("https://dev-exsqrtl.eu.auth0.com/")
  });
});
