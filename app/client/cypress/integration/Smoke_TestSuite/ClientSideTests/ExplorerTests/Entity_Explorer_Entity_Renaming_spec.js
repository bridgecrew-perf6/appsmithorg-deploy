const explorer = require("../../../../locators/explorerlocators.json");
const firstApiName = "First";
const secondApiName = "Second";

describe("Api Naming conflict on a page test", function() {
  it.skip("expects actions on the same page cannot have identical names", function() {
    cy.log("Login Successful");
    // create an API
    cy.NavigateToAPI_Panel();
    cy.CreateAPI(firstApiName);

    // create another API
    cy.NavigateToAPI_Panel();
    cy.CreateAPI(secondApiName);

    // try to rename one of the APIs with an existing API name
    cy.hoverAndClickParticularIndex(2);
    cy.selectAction("Rename");
    //cy.RenameEntity(tabname);
    cy.get(explorer.editEntity)
      .last()
      .type(firstApiName, { force: true });
    //cy.RenameEntity(firstApiName);
    cy.validateMessage(firstApiName);
    cy.ClearSearch();
    cy.DeleteAPIFromSideBar();
    cy.DeleteAPIFromSideBar();
  });
});

describe("Api Naming conflict on different pages test", function() {
  it("it expects actions on different pages can have identical names", function() {
    cy.log("Login Successful");
    // create a new API
    cy.NavigateToAPI_Panel();
    cy.CreateAPI(firstApiName);

    // create a new page and an API on that page
    cy.Createpage("Page2");
    cy.NavigateToAPI_Panel();
    cy.CreateAPI(secondApiName);
    cy.hoverAndClickParticularIndex(2);
    cy.selectAction("Rename");
    //cy.RenameEntity(tabname);
    cy.get(explorer.editEntity)
      .last()
      .type(firstApiName, { force: true });
    cy.VerifyPopOverMessage(firstApiName + " is already being used.");

    // delete API and Page2
    cy.DeleteAPIFromSideBar();
    cy.get(".t--entity-name")
      .contains("Page2")
      .trigger("mouseover");
    cy.hoverAndClick();
    cy.selectAction("Delete");
    cy.DeletepageFromSideBar();
    // delete API created on Page 1
    cy.DeleteAPIFromSideBar();
  });
});

describe("Entity Naming conflict test", function() {
  it.skip("expects JS objects and actions to not have identical names on the same page.", function() {
    cy.log("Login Successful");

    // create JS object and name it
    cy.createJSObject('return "Hello World";');
    cy.RenameEntity(firstApiName);

    // create API and rename it, expect error to occur
    cy.NavigateToAPI_Panel();
    cy.CreateAPI(secondApiName);
    cy.hoverAndClickParticularIndex(2);
    cy.selectAction("Rename");
    cy.get(explorer.editEntity)
      .last()
      .type(secondApiName, { force: true });
    cy.VerifyPopOverMessage(secondApiName + " is already being used.", true);
    cy.ClearSearch();

    cy.deleteJSObject();
    cy.DeleteAPIFromSideBar();
    cy.NavigateToHome();
  });
});
