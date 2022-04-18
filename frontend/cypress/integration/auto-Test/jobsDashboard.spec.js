/* eslint-disable no-undef */

describe('Jobs Page Test Suite', function(){

    it('Loggin IN', function(){
        cy.visit('/')
    
        cy.get('#loginEmail').type('tester1@email.com')
    
        cy.get('#loginPassword').type('123')
    
        cy.get('#loginButton').click()
    
        cy.url().should('include', '/home')
      })

    it('Apply for a job', function(){
  
      cy.visit('/jobs')
      cy.get('span').contains('Jobs').click()
      cy.get('.applyJobButton').click()
  
      
    })
  
    it('checks the applied jobs', function(){
  
      cy.visit('/jobs')
      cy.get('span').contains('My applications').click()
    })
  
    it('Post a new job', function(){
  
      cy.visit('/jobs')
      cy.get('span').contains('Employer View').click()
      cy.get('#companyNameInput').type('Meta')
      cy.get('#jobTitleInput').type('Systems Engineer')
      cy.get('#locationInput').type('San Fransisco, USA')
      cy.get('#descriptionInput').type('This is a Systems Engineer role in Meta where you have to be skilled in various computer science concepts and good in C, C++ and rust')
      cy.get('#salaryInput').type('200000')
      cy.get('#dateInput').type('2022-05-29')
      cy.get('#submitNewJobPosting').click()
  
    })
  
  
  
  })