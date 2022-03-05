<reference types="cypress" />
import React from 'react';

describe('Test Suite for Registration page', ()=>{
    beforeEach(() => {
        cy.visit('/registration')
      })

    const emailId =  'tester51@email.com';
    const password = "123";
    const name = 'Tester Two';


    it('Login Check for the user', ()=>{
    

        cy.request('POST', 'http://localhost:8080/auth/register', {
            userName : name, 
            userEmail : emailId, 
            password : password
          })
          .should(( response ) => {
             expect(response.status).to.eq(201);
          })
  
    })


});
  