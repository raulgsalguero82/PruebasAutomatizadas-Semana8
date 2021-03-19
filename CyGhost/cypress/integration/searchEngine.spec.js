// Update Pagina:
// * (Positivo) Update un pagina ya publicado con toda la info correcta
// * (Negativo) Update de una pagina sin autor
// * (Positivo) Hacer unpublish de una pagina en estado publish y que pase a estado draft
// * (Positivo) Hacer publish de una pagina en estado draft y que este pase a estado publish
// Buscador:
// * (Positivo) Buscar un post por titulo que exista
// * (Positivo) buscar contenido que no exista
// * (Positivo) Abrir un post encontrado en la busqueda
// * (Positivo) Abrir la ventana de busqueda mediante el uso de ctrl+k

describe('Testing Search Feature', () => {
	beforeEach(() => {
		const baseGhostURL = Cypress.config('baseGhostURL')
		cy.visit(baseGhostURL + 'ghost/#/signin')

		cy.get('input[name="identification"]').type(Cypress.config('username'), { force: true })
		cy.get('input[name="password"]').type(Cypress.config('password'), { force: true })
		cy.get('button.login.gh-btn.gh-btn-blue').click({ force: true })
		cy.wait(3000)
		cy.get('.gh-nav-btn-search').click({ force: true })
	})

	it(' Buscar un post por titulo que exista', () => {
		const title = 'Welcome'

		cy.get('input[placeholder="Search site..."]').then(($elements) => {
			cy.wrap($elements[0]).clear({ force: true }).type(title, { force: true })
		})
		cy.wait(3000)
		cy.get('.ember-power-select-option').contains(title)
	})

	it('Buscar contenido que no exista', () => {
		const title = 'dsasdasds'
		cy.get('input[placeholder="Search site..."]').then(($elements) => {
			cy.wrap($elements[0]).clear({ force: true }).type(title, { force: true })
		})
		cy.wait(3000)
		cy.get('.ember-power-select-option').contains('No results found')
	})

	it('Abrir un post encontrado en la busqueda', () => {
		const title = 'Welcome'

		cy.get('input[placeholder="Search site..."]').then(($elements) => {
			cy.wrap($elements[0]).clear({ force: true }).type(title, { force: true })
		})
		cy.wait(3000)
		cy.get('.ember-power-select-option').first().click({ force: true })
	})
	it('Abrir la ventana de busqueda mediante el uso de ctrl+k', () => {
		cy.get('a').first().type('{ctrl}k', { force: true })
		cy.wait(3000)
		cy.get('input[placeholder="Search site..."]').should('be.visible')
	})
})
