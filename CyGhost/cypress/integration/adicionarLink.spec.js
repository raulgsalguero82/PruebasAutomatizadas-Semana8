import faker from 'faker'

describe('Testing Adicionar Link Feature', () => {
	const fakeWord = faker.random.word()
	beforeEach(() => {
		cy.visit('http://localhost:2368/ghost/#/signin')
		cy.wait(3000)
		cy.get('form').within(() => {
			cy.get('input[name="identification"]').type(Cypress.config('username'))
			cy.get('input[name="password"]').type(Cypress.config('password'))
			cy.get('button.login.gh-btn.gh-btn-blue').click({ force: true })
		})
		cy.wait(3000)
		cy.visit('http://localhost:2368/ghost/#/settings/design')
		cy.wait(3000)
	})

	it('should add new link correctly', () => {
		cy.get('input[placeholder="Label"].ember-text-field.gh-input.ember-view')
			.last()
			.type(fakeWord, { force: true })
		cy.wait(3000)
		cy.get('button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view').click({ force: true })
		cy.wait(3000)
		cy.get('button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view > span').should('be.visible')
		// cy.visit('http://localhost:2368/ghost')

		// cy.visit('http://localhost:2368/ghost/#/settings/design')
		// cy.wait(3000)
		// cy.get('.gh-blognav-container').last().scrollIntoView()
		// cy.get('.gh-blognav-label.ember-view > .ember-text-field.gh-input.ember-view').contains(
		// 	fakeWord,
		// 	{
		// 		matchCase: false
		// 	}
		// )
	})

	it('should return error when no label is entered', () => {
		const form = cy
			.get('input.ember-text-field.gh-input.ember-view')
			.first()
			.type('test', { force: true })
		form.clear()
		cy.wait(3000)
		cy.get('button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view').click({ force: true })

		cy.wait(3000)
		cy.get('.gh-blognav-label > p.response').contains('You must specify a label')
	})
})

// .gh-blognav-container.gh-blognav.sortable-objects.draggable-object.gh-blognav-grab.gh-blognav-line
