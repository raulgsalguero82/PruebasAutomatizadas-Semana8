import faker from 'faker'

describe('Testing Invitar Usuario Feature', () => {
	const fakeEmail = faker.internet.email()
	beforeEach(() => {
		cy.visit('http://localhost:2368/ghost/#/signin')
		cy.wait(3000)
		cy.get('form').within(() => {
			cy.get('input[name="identification"]').type(Cypress.config('username'))
			cy.get('input[name="password"]').type(Cypress.config('password'))
			cy.get('button.login.gh-btn.gh-btn-blue').click({ force: true })
		})
		cy.wait(3000)
		cy.visit('http://localhost:2368/ghost/#/staff')
		cy.wait(3000)
		cy.get('button.gh-btn.gh-btn-green').click({ force: true })
		cy.wait(3000)
	})

	it('should invite an email correctly', () => {
		cy.get('input[name="email"]').type(fakeEmail)
		cy.get('button.gh-btn.gh-btn-green.gh-btn-icon.ember-view').click({ force: true })

		cy.wait(100000)

		cy.visit('http://localhost:2368/ghost')

		cy.wait(3000)
		cy.visit('http://localhost:2368/ghost/#/staff')
		cy.wait(3000)

		cy.get('.apps-grid-container > *').contains(fakeEmail)
	})

	it('should return error when no email is entered', () => {
		cy.get('button.gh-btn.gh-btn-green.gh-btn-icon.ember-view').click({ force: true })

		cy.wait(3000)
		cy.get('p.response').should('have.text', '\n    Please enter an email.\n\n    \n')
	})
})
