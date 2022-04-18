/* eslint-disable no-undef */


describe('Test Suite for Search DashBaord', function(){
    it('Loggin IN', function(){
        cy.visit('/')
    
        cy.get('#loginEmail').type('tester1@email.com')
    
        cy.get('#loginPassword').type('123')
    
        cy.get('#loginButton').click()
    
        cy.url().should('include', '/home')
      })

      it('Enter Text', function(){
          cy.get('#searchInput').type('Tester').should('have.value', 'Tester' )
      })

      it('Search Text - People', function(){
        cy.get('#searchInput').clear()
        cy.get('#searchInput').type('Tester{enter}')
        cy.url().should('include', 'search?query=Tester')

    })

    it('Search Text - Jobs', function(){
        cy.get('#searchInput').clear()
        cy.get('#searchInput').type('Software{enter}')
        cy.get('#JobsID').click()
        cy.url().should('include', 'search?query=Software')

    })



})