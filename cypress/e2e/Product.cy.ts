describe("name", ()=>{
  beforeEach(() =>{
    cy.visit("/index")
  })

  it('should be loaded on page.', function () {
    cy.get('.title').should("have.text", "AJcompare Home")
  });
})
