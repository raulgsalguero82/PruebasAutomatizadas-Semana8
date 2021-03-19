import faker from 'faker'
describe('Testing CreacionTag Feature', () => {
	const fakeTag = faker.random.word()
	beforeEach(() => {
		cy.visit('http://localhost:2368/ghost/#/signin')
		cy.wait(3000)
		cy.get('form').within(() => {
			cy.get('input[name="identification"]').type(Cypress.config('username'))
			cy.get('input[name="password"]').type(Cypress.config('password'))
			cy.get('button.login.gh-btn.gh-btn-blue').click({ force: true })
		})
		cy.wait(3000)
		cy.visit('http://localhost:2368/ghost/#/tags')
		cy.wait(3000)
		cy.get('a.gh-btn.gh-btn-green').click({ force: true })
		cy.wait(3000)
	})

	it('should create a tag correctly', () => {
		cy.get('input[name="name"]').type(fakeTag, { force: true })
		cy.get('button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view').click({ force: true })

		cy.visit('http://localhost:2368/ghost/#/tags')
		cy.wait(3000)
		cy.get('li.gh-list-row.gh-tags-list-item.ember-view > *').contains(fakeTag)
	})

	it('should return error when no name is entered', () => {
		cy.get('button.gh-btn.gh-btn-blue.gh-btn-icon.ember-view').click()
		cy.wait(3000)
		cy.get('p.response').should(
			'have.text',
			'\n    You must specify a name for the tag.\n\n    \n\n    \n\n    \n'
		)
	})
})
