/* eslint-disable no-undef */
//usually tests need to include
//Arrange - set up initial state
//Act - take an action
//Assert - make an assumption

describe('End-to End Tests - Login Page', ()=>{

  it('Test Login with Empty Details', function(){
    cy.visit('/')

    cy.get('#loginButton').click()

    cy.url().should('include', '/')
  })

  it('Checking Entered Details', function(){

    cy.visit('/')

    cy.get('#loginEmail').type('tester1@email.com').should('have.value', 'tester1@email.com')

    cy.get('#loginPassword').type('123').should('have.value', '123')

  })

  it('Wrong Credentials', function(){
    cy.visit('/')

    cy.get('#loginEmail').type('tester1@email.com')

    cy.get('#loginPassword').type('1234567')

    cy.get('#loginButton').click()

    cy.url().should('include', '/')
  })


  it('Valid Credentials', function(){
    cy.visit('/')

    cy.get('#loginEmail').type('tester1@email.com')

    cy.get('#loginPassword').type('123')

    cy.get('#loginButton').click()

    cy.url().should('include', '/home')
  })






})



