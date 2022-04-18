/* eslint-disable no-undef */
//usually tests need to include
//Arrange - set up initial state
//Act - take an action
//Assert - make an assumption




describe('Home Page Test Suite', function(){

  it('Loggin IN', function(){
    cy.visit('/')

    cy.get('#loginEmail').type('tester1@email.com')

    cy.get('#loginPassword').type('123')

    cy.get('#loginButton').click()

    cy.url().should('include', '/home')
  })

  it('Post Data Write', function(){

    cy.visit('/home')

    cy.get('.textBox').type('Hi We are Hiring at Amazon').should('have.value', 'Hi We are Hiring at Amazon')

    cy.get('select').select('Job-Recruitment').should('have.value', 'Job-Recruitment')

  })

  it('Publish a post', function(){

    cy.visit('/home')

    cy.get('.textBox').type('Hi We are Hiring at Amazon')

    const picture = 'Amazon.jpeg'

    cy.get('#inputPhotoPost').attachFile(picture)

    cy.get('select').select('Job-Recruitment')

    cy.get('.postButton').click()

  })

  it('Add a comment on a post', function(){

    cy.get('#CommentInputPlace').first().type('If you are interested please send me a connection request')


  })

})



