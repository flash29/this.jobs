/* eslint-disable no-undef */


describe('Testing the Navigation Bar', function(){

    it('Loggin IN', function(){
        cy.visit('/')
    
        cy.get('#loginEmail').type('tester1@email.com')
    
        cy.get('#loginPassword').type('123')
    
        cy.get('#loginButton').click()
    
        cy.url().should('include', '/home')
      })

    it('Navigation to Connections', function(){
        cy.visit('./home')
        cy.get('.connections').click()
        cy.url().should('include', '/connections')
    })

    it('Navigation to Jobs', function(){
        cy.visit('./home')
        cy.get('.jobs').click()
        cy.url().should('include', '/jobs')
    })

    it('Navigation to Settings', function(){
        cy.visit('./home')
        cy.get('.settings').click()
        cy.url().should('include', '/settings')
    })

    it('Navigation to Home', function(){
        cy.visit('./jobs')
        cy.get('.home').click()
        cy.url().should('include', '/home')
    })

    it('Logging Out', function(){
        cy.get('.logout').click()
        cy.url().should('include', '/')
    })
})