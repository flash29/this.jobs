/* eslint-disable no-undef */


describe('Test Suite for Connections DashBoard', function(){
    it('Loggin IN', function(){
        cy.visit('/')
    
        cy.get('#loginEmail').type('tester1@email.com')
    
        cy.get('#loginPassword').type('123')
    
        cy.get('#loginButton').click()
    
        cy.url().should('include', '/home')
      })

    it('Checking the Navigation Bar of Connection Dashboard', function(){
        cy.visit('/connections')
        cy.get('span').contains('My Connections').click()
        cy.get('span').contains('Pending Requests').click()
        cy.get('span').contains('Suggestions').click()
    })

    it('Checking your friend circle', function(){
        cy.visit('/connections')
        cy.get('span').contains('My Connections').click()
        cy.get('.jobTitleList5').first().click()
    })
      
})