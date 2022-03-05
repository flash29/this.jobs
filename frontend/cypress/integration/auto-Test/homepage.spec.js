<reference types="cypress" />
import React from 'react';



describe('Test Suite for login page', ()=>{
  beforeEach(() => {
    cy.visit('/')
  })

  it('Check Display for login Page', ()=>{ 
    cy
    .get('#formEmail')
    .should('be.visible');


    cy
    .get('#formPassword')
    .should('be.visible');

    cy
    .get('#loginButton')
    .click();

    
    cy.go('back');
    

    cy
    .get('#registrationButton')
    .contains('Register');

  });

  const emailId =  'tester1@email.com';
  const password = "123"

  it('Login Check for the user', ()=>{
    

      cy.request('POST', 'http://localhost:8080/auth/login', {
          useremail : emailId, 
            password : password
        })
        .should(( response ) => {
           expect(response.status).to.eq(200);

          window.localStorage.setItem('token', response.token);
          window.localStorage.setItem('userid', response.userId);


        })

  })


})

describe('Test Suite for Navigation Page', ()=>{
    beforeEach(() => {
        cy.visit('/connections')
      })

      it('Navigation Bar vists settings page', ()=> {

        // cy.get('a')
        // .should('have.attr', 'href').and('include', 'contact')
        // .then((href) => {
        //   cy.visit(href)
        // })

        cy.get('.settings').click({force: true})
        cy.url().should('include', '/settings')
      });

      it('Navigation Bar visits jobs page', ()=> {

        // cy.get('a')
        // .should('have.attr', 'href').and('include', 'contact')
        // .then((href) => {
        //   cy.visit(href)
        // })

        cy.get('.jobs').click({force: true})
        cy.url().should('include', '/jobs')
      });

      it('Navigation Bar visits logout page', ()=> {

        // cy.get('a')
        // .should('have.attr', 'href').and('include', 'contact')
        // .then((href) => {
        //   cy.visit(href)
        // })

        cy.get('.logout').click({force: true})
        cy.url().should('include', '/')
      });

      it('Navigation Bar visits home page', ()=> {

        // cy.get('a')
        // .should('have.attr', 'href').and('include', 'contact')
        // .then((href) => {
        //   cy.visit(href)
        // })

        cy.get('.home').click({force: true})
        cy.url().should('include', '/home')
      });
      
})


