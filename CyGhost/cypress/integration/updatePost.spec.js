cy.faker = require('faker');

var featureId =2;
var ghostVersion;
var baseGhostURL;
var currentScenarioId;
var currentStepId;
var screenshotTaken = false;

describe('Hacer update de un post', () => {

	beforeEach(() => {		
		baseGhostURL = Cypress.config('baseGhostURL');
		ghostVersion = Cypress.config('ghostVersion');
		cy.visit(baseGhostURL);
		currentStepId = 0;
		cy.wait(3000)
	})

	it('Hacer update de un post con toda la info correcta', () => {
		currentScenarioId = 1;

		LoginToPrivateSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		NavigateToPublishedPostsList();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		let fakeTitle = cy.faker.lorem.words(1);
		let fakeDescription = cy.faker.lorem.words(12);

		NavigateToFirstPostOnList();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;


		UpdatePost(fakeTitle, fakeDescription);
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		SaveUpdatedPost();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(300);
		currentStepId++;

		cy.get(".gh-publishmenu-button").contains('Updated').should('be.visible');


	})


	it('Hacer update de un post sin autor', () => {
		currentScenarioId = 2;

		LoginToPrivateSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		NavigateToPublishedPostsList();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		NavigateToFirstPostOnList();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;


		RemoveAutorFromPost();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		SaveUpdatedPost();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(300);
		currentStepId++;

		cy.contains('Update failed').should('be.visible');


	})


	it('Actualizar el estado de post de published a draft', () => {
		currentScenarioId = 3;

		LoginToPrivateSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		NavigateToPublishedPostsList();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		NavigateToFirstPostOnList();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		SetPostAsUnpublished();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(300);
		currentStepId++;

		cy.contains('Unpublished').should('be.visible');


	})


	it('Actualizar un post de estado draft a published', () => {
		currentScenarioId = 4;

		LoginToPrivateSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		NavigateToDraftPostsList();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		NavigateToFirstPostOnList();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		SaveUpdatedPost();
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


	
	function NavigateToPublishedPostsList() {

		cy.visit(baseGhostURL + 'ghost/#/posts?type=published');
		cy.wait(3000);

	}

	function NavigateToDraftPostsList() {

		cy.visit(baseGhostURL + 'ghost/#/posts?type=draft');
		cy.wait(3000);

	}

	
	function NavigateToFirstPostOnList() {

		cy.get("a[title='Edit this post']").first().click({force: true});		
		cy.wait(3000);

	}


	function NavigateToNewPostSection() {
		cy.visit(baseGhostURL + 'ghost/#/editor/post');
		cy.wait(3000);
	}

	function UpdatePost(fakeTitle, fakeDescription) {

		cy.get(".gh-editor-title").type(fakeTitle + '{downarrow}');		
		cy.wait(1000);
		cy.get(".koenig-editor__editor").type(fakeDescription);
	}

	function SaveUpdatedPost() {

		cy.get('.gh-editor-header .gh-publishmenu-trigger').click({ force: true });
		cy.wait(1000);
		cy.get('.gh-publishmenu-button').click({ force: true });
		cy.wait(300);
	}


	function RemoveAutorFromPost()
	{
		cy.get('span[aria-label="remove element"]').click({ force: true });
		cy.wait(1000);	

	}


	function SetPostAsUnpublished()
	{
		cy.get('.gh-editor-header .gh-publishmenu-trigger').click({ force: true });
		cy.wait(1000);
		cy.contains('Unpublished').click({force: true});
		cy.wait(300);
		cy.get('.gh-publishmenu-button').click({ force: true });
		cy.wait(300);
	}

	

})


