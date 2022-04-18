/* eslint-disable no-undef */


describe('Test Suite for Settings Page', function(){
    it('Loggin IN', function(){
        cy.visit('/')
    
        cy.get('#loginEmail').type('tester1@email.com')
    
        cy.get('#loginPassword').type('123')
    
        cy.get('#loginButton').click()
    
        cy.url().should('include', '/home')
      })

      it('Changing a Display Picture', function(){

        cy.visit('./home')

        cy.get('.settings').click()

        const picture = 'Amazon.jpeg'

        cy.get('.userDPUpload').attachFile(picture)
      })

      it('Updating Bio', function(){

        cy.get('.userBio').clear()
        cy.get('.userBio').type('Upcoming SWE @Meta')
        cy.get('#updateBioID').click()
      })

      it('Uploading/Updating a Resume', function(){

        cy.visit('./home')

        cy.get('.settings').click()

        const picture = 'Test_Resume1.pdf'

        cy.get('.ResumeID').attachFile(picture)

        cy.reload()
      })

      it('Adding New Education', function(){

        cy.get('#addEducationID').click()

        cy.get('.newNameEducation').type('University of Florida')
        cy.get('.newDatesEducation').type('Aug 2021 - May 2023')
        cy.get('.newDescriptionEducation').type('Masters in CS')
        cy.get('#addingNewEducationID').click()

      })

      it('Adding New Experience', function(){

        cy.get('#addExperienceID').click()

        cy.get('.newNameExperience').type('FaceBook')
        cy.get('.newDatesExperience').type('May 2023 -  present')
        cy.get('.newDescriptionExperience').type('Senior SWE')
        cy.get('#addingNewExperienceID').click()

      })

      it('Adding New Projects', function(){

        cy.get('#addProjectID').click()

        cy.get('.newNameProjects').type('Twitter Clone')
        cy.get('.newDescriptionProjects').type('Developed a Twitter clone using React js, Node js')
        cy.get('#addingNewProjectID').click()

      })

})