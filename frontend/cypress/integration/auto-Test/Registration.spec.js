/* eslint-disable jest/valid-expect */
/* eslint-disable no-undef */

describe('Test Suite for Registration page', ()=>{
    beforeEach(() => {
        cy.visit('/registration')
      })

      const uuid = () => Cypress._.random(0, 1e6)
      const id = uuid()

    const emailId =  `${id}@email.com`;
    const password = "123";
    const name = 'Tester Two';


    it('Registering the user', ()=>{
    

        cy.request('POST', 'http://localhost:8080/auth/register', {
            userName : name, 
            userEmail : emailId, 
            password : password
          })
          .should(( response ) => {
             expect(response.status).to.eq(201);
          })
  
    })

    it('Empty Credentials', function(){
      cy.visit('/registration')
      cy.get('#submitID').click()
  
      cy.url().should('include', '/registration')
    })

    it('Checking Entered Details', function(){
  
      cy.visit('/registration')

      cy.get('#nameID').type('Tester One').should('have.value', 'Tester One')
  
      cy.get('#emailID').type('tester1@email.com').should('have.value', 'tester1@email.com')
  
      cy.get('#passwordID').type('123').should('have.value', '123')
  
    })

    it('Existing User Credentials', function(){
      cy.visit('/registration')

      cy.get('#nameID').type('Tester One').should('have.value', 'Tester One')
  
      cy.get('#emailID').type('tester1@email.com').should('have.value', 'tester1@email.com')
  
      cy.get('#passwordID').type('123').should('have.value', '123')
  
      cy.get('#submitID').click()
  
      cy.url().should('include', '/registration')
    })

    it('Registring and Navigating Users', function(){
      cy.visit('/registration')

      cy.get('#nameID').type('Tester One')
  
      cy.get('#emailID').type(`${emailId}`)
  
      cy.get('#passwordID').type('123')
  
      cy.get('#submitID').click()
  
      cy.url().should('include', '/')
    })


});
  