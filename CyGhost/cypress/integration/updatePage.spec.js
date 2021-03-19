cy.faker = require('faker');

var featureId= 4;
var ghostVersion;
var baseGhostURL;
var currentScenarioId;
var currentStepId;
var screenshotTaken = false;

describe('Hacer update de una pagina', () => {

	beforeEach(() => {		
		baseGhostURL = Cypress.config('baseGhostURL');
		ghostVersion = Cypress.config('ghostVersion');
		cy.visit(baseGhostURL);
		currentStepId = 0;
		cy.wait(3000)
	})

	it('Hacer update de una pagina con toda la info correcta', () => {
		currentScenarioId = 1;

		LoginToPrivateSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		NavigateToPublishedPagesList();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		let fakeTitle = cy.faker.lorem.words(1);
		let fakeDescription = cy.faker.lorem.words(12);

		NavigateToFirstPageOnList();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;


		UpdatePage(fakeTitle, fakeDescription);
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		SaveUpdatedPage();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(300);
		currentStepId++;

		cy.get(".gh-publishmenu-button").contains('Updated').should('be.visible');


	})


	it('Hacer update de una pagina sin autor', () => {
		currentScenarioId = 2;

		LoginToPrivateSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		NavigateToPublishedPagesList();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		NavigateToFirstPageOnList();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;


		RemoveAutorFromPage();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		SaveUpdatedPage();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(300);
		currentStepId++;

		cy.contains('Update failed').should('be.visible');


	})


	it('Actualizar el estado de una pagina de published a draft', () => {
		currentScenarioId = 3;

		LoginToPrivateSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		NavigateToPublishedPagesList();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		NavigateToFirstPageOnList();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		SetPageAsUnpublished();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(300);
		currentStepId++;

		cy.contains('Unpublished').should('be.visible');


	})


	it('Actualizar una pagina de estado draft a published', () => {
		currentScenarioId = 4;

		LoginToPrivateSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		NavigateToDraftPagesList();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		NavigateToFirstPageOnList();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		SaveUpdatedPage();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(300);
		currentStepId++;

		cy.contains('Published').should('be.visible');


	})





	function SaveScreenShoot(featureid, scenarioid, stepid) {
		var ghostVersion = Cypress.config('ghostVersion');

		screenshotTaken = false;
		cy.log("Screenshoot here!!!: " + 'ghost-' + ghostVersion + '/' + 'feature-' + featureid + '/scenario-' + scenarioid + '/step-' + stepid)
		return cy.screenshot('ghost-' + ghostVersion + '/' + 'feature-' + featureid + '/scenario-' + scenarioid + '/step-' + stepid);

	}


	function GetScenario(featureid, scenarioid) {
		var features = Cypress.config("features");
		var scenario = null;
		for (let i = 0; i < features.length; i++) {
			if (features[i].id === featureid) {
				for (let i = 0; i < features.length; i++) {
					if (features[i].Scenarios[j].Id === scenarioid) {
						return features[i].Scenarios[j];
					}
				}
			}
		}

		throw new Error('Invalid Feature/Scenario: ' + featureId + '/' + scenarioid);
	}




	function LoginToPrivateSection() {

		cy.visit(baseGhostURL + 'ghost/#/signin');
		cy.wait(3000);


		cy.get('input[name="identification"]').type(Cypress.config("username"), { force: true });
		cy.get('input[name="password"]').type(Cypress.config("password"), { force: true })
		cy.get('button.login.gh-btn.gh-btn-blue').click({ force: true });
		cy.wait(3000);

	}


	
	function NavigateToPublishedPagesList() {

		cy.visit(baseGhostURL + 'ghost/#/pages?type=published');
		cy.wait(3000);

	}

	function NavigateToDraftPagesList() {

		cy.visit(baseGhostURL + 'ghost/#/pages?type=draft');
		cy.wait(3000);

	}

	
	function NavigateToFirstPageOnList() {

		cy.get("a[title='Edit this page']").first().click({force: true});		
		cy.wait(3000);

	}


	function NavigateToNewPostSection() {
		cy.visit(baseGhostURL + 'ghost/#/editor/post');
		cy.wait(3000);
	}

	function UpdatePage(fakeTitle, fakeDescription) {

		cy.get(".gh-editor-title").type(fakeTitle + '{downarrow}');		
		cy.wait(1000);
		cy.get(".koenig-editor__editor").type(fakeDescription);
	}

	function SaveUpdatedPage() {

		cy.get('.gh-editor-header .gh-publishmenu-trigger').click({ force: true });
		cy.wait(1000);
		cy.get('.gh-publishmenu-button').click({ force: true });
		cy.wait(300);
	}


	function RemoveAutorFromPage()
	{
		cy.get('span[aria-label="remove element"]').click({ force: true });
		cy.wait(1000);	

	}


	function SetPageAsUnpublished()
	{
		cy.get('.gh-editor-header .gh-publishmenu-trigger').click({ force: true });
		cy.wait(1000);
		cy.contains('Unpublished').click({force: true});
		cy.wait(300);
		cy.get('.gh-publishmenu-button').click({ force: true });
		cy.wait(300);
	}

	

})


