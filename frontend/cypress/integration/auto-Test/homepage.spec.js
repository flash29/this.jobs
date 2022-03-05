<reference types="cypress" />
import React from 'react';

describe('Test Suite for Home Page', ()=>{
    beforeEach(() => {
        cy.visit('/')
      })

      

      it('Check Home Page elements visibility and buttons', () => {

        cy
          .get('.NavBar')
          .should('be.visible');

          cy
          .get('.title')
          .should('be.visible');

          cy
          .get('.SearchBar')
          .should('be.visible');

          cy
          .get('.iconsHolder')
          .should('be.visible');


          cy
          .get('.PostBox')
          .should('be.visible');

          cy
          .get('.commentBox')
          .should('be.visible');

          cy
          .get('.CardType')
          .should('be.visible');

          cy
          .get('.CardType')
          .contains('Like')

          cy
          .get('.CardType')
          .contains('Comment')

          cy
          .get('.dropdown')
          .click()

          cy
          .get('.icon')
          .click()

          cy
          .get('.likeBox')
          .click()

          cy
          .get('.commentBox')
          .click({ multiple: true })

          cy
          .get('.CommentAddButton')
          .click()


        


      })

      it('Checking Navigation in home page', ()=>{
        const pages = ['connections', 'jobs', 'settings', 'login']

        // cy.get('a').each(page => {
        //  cy.request(page.prop('href'))
        //   })

        // cy.get('connections').click()
        // cy.location('pathname').should('eq', '/blog' )
        //   cy.go('back')
      
        // pages.forEach(page => {
      
        //   cy.contains(page).click()
        //   cy.location('pathname').should('eq', `/${page}`)
        //   cy.go('back')
      
        // })
      });

      it('Feed Data Test', ()=>{
        cy.request('http://localhost:8080/feed')
        .should((response) => {
          expect(response.status).to.eq(200)
        })

      });

      it('Post Test', ()=>{

        cy.request('POST', 'http://localhost:8080/post', {
          createdBy : 'user1', 
            content : 'jbk', 
            tag : 'Knowledge Sharing', 
            attachments : ''
        })
        .should((response) => {
          expect(response.status).to.eq(200)
        })

      });



    //  cy.get('.todo-list li').should('have.length', 2)
      
})


