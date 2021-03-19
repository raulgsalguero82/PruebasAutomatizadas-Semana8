describe('Testing Login Feature', () => {
	beforeEach(() => {
		const baseGhostURL = Cypress.config('baseGhostURL')
		cy.visit(baseGhostURL + 'ghost/#/signin')

		cy.wait(3000)
	})

	it('should login correctly', () => {
		cy.get('form').within(() => {
			cy.get('input[name="identification"]').type(Cypress.config('username'), { force: true })
			cy.get('input[name="password"]').type(Cypress.config('password'), { force: true })
			cy.get('button.login.gh-btn.gh-btn-blue').click({ force: true })
		})

		cy.wait(3000)
		cy.get('span.gh-user-email').scrollIntoView().should('be.visible')
	})

	it('should return error when password is incorrect', () => {
		cy.get('form').within(() => {
			cy.get('input[name="identification"]').type('example@example.com')
			cy.get('input[name="password"]').type('test123456903323')
			cy.get('button.login.gh-btn.gh-btn-blue').click({ force: true })
		})
		cy.wait(3000)
		cy.get('p.main-error').scrollIntoView().should('be.visible')
	})
})
