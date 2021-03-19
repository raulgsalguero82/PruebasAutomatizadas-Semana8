import faker from 'faker'

describe('Testing Editar Perfil Feature', () => {
	const fakeName = faker.name.firstName()
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

		cy.get('.apps-grid > .apps-grid-cell > a').last().click({ force: true })
		cy.wait(3000)
	})

	it('should update name correctly', () => {
		const input = cy.get('input[placeholder="Full Name"].user-name')

		input.clear({ force: true })
		cy.wait(3000)
		cy.get('input[placeholder="Full Name"].user-name').type(fakeName, { force: true })
		cy.get('button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view').click({ force: true })

		cy.visit('http://localhost:2368/ghost/')
		cy.wait(3000)

		cy.visit('http://localhost:2368/ghost/#/staff')
		cy.wait(3000)
		cy.get('.apps-grid > .apps-grid-cell').contains(fakeName)
	})

	it('should return error when no name is entered', () => {
		cy.get('input[placeholder="Full Name"].user-name').clear({ force: true })
		cy.get('button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view').click()

		cy.wait(3000)
		cy.get('p.response').should('be.visible')
	})
})
