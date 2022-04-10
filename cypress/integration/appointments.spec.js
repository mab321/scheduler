

describe("Booking", () => {
  beforeEach(() => {
    // reset db
    cy.request("GET","/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  })

  it("should book an interview", () => {

    cy.get("[alt=Add]").first().click();
  
   // set student name, choose interviewer and save
    cy.get("[data-testid=student-name-input]")
      .type("Luke Skywalker");
    
    cy.get("[alt='Sylvia Palmer']").click();

    cy.contains('Save').click();
    
    // Confirm booked appointment
    cy.contains(".appointment__card--show","Luke Skywalker" );
    cy.contains(".appointment__card--show", "Sylvia Palmer");

  });
  
  it("Should edit interview", () => {
    // force click edit button
    cy.get("[alt='Edit']")
      .click({force: true});
    
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("chewbacca");
    
    cy.get("[alt='Tori Malcolm']").click();

    cy.contains('Save').click();
    // check that both student name and interviewer were edited
    cy.contains(".appointment__card--show","chewbacca" );
    cy.contains(".appointment__card--show","Tori Malcolm" );

  });
 
  it("should cancel an interview", () => {
    // get delete button
    cy.get("[alt='Delete']")
      .click({force: true}); // forcing a click overrides the actionable checks of cypress and fire automatically

    cy.contains("Confirm").click();
  // check that the first appointment is deleted
    cy.contains(".appointment__card--show","Archie Cohen" ).should("not.exist");

  });
})