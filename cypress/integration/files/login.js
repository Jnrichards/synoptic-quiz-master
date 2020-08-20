describe("login", () => {
  it("should successfully log into our app", () => {
      cy.login()
    //   cy.get('#\31').click().wait(3000).get('#\34 ').click().wait(3000).get('#\33 ').click()
  })
  it("should beable to play the alex rider quiz", () => {
    cy.visit("/")
    cy.get('a').click()
    cy.get('[href="/account/public/"]')
      .click()
      .get(":nth-child(1) > .card > .card-body > a > .btn")
      .click()
      .get("[data-testid=choice1]")
      .click()
      .wait(3000)
      .get("[data-testid=choice4]")
      .click()
      .wait(3000)
      .get("[data-testid=choice1]")
      .click()
      cy.get('[tabindex="-1"] > div').contains("100.00")
  })


})
