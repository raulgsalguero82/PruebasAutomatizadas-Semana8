cy.faker = require('faker');

var featureId =1;
var ghostVersion;
var baseGhostURL;
var currentScenarioId;
var currentStepId;
var screenshotTaken = false;

describe('Hacer update de los settings del cms', () => {

	beforeEach(() => {		
		baseGhostURL = Cypress.config('baseGhostURL');
		ghostVersion = Cypress.config('ghostVersion');
		cy.visit(baseGhostURL);
		currentStepId = 0;
		cy.wait(3000)
	})

	it('Hacer update de los campos de titulo y descripción', () => {
		currentScenarioId = 1;

		LoginToPrivateSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		NavigateToSettingSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		let fakeTitle = cy.faker.lorem.words(1);
		let fakeDescription = cy.faker.lorem.words(2);

		ExpandTitleDescriptionSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;


		ChangeTitleAndDescription(fakeTitle, fakeDescription);
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		SaveUpdateSettings();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(300);
		currentStepId++;

		cy.contains('Saved').should('be.visible');


	})


	it('Hacer update de los campos de titulo y descripción', () => {
		currentScenarioId = 2;

		LoginToPrivateSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		NavigateToSettingSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		ExpandTimeZone();		
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;


		ChangeTimeZone();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		SaveUpdateSettings();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(300);
		currentStepId++;

		cy.contains('Saved').should('be.visible');


	})

	it('Hacer update de la metadata del sitio', () => {
		currentScenarioId = 3;

		LoginToPrivateSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		NavigateToSettingSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		let fakeTitle = cy.faker.lorem.words(1);
		let fakeDescription = cy.faker.lorem.words(2);

		ExpandMetadataSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;


		ChangeMetaData(fakeTitle, fakeDescription);
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		SaveUpdateSettings();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(300);
		currentStepId++;

		cy.contains('Saved').should('be.visible');


	})

	it('Hacer update de la metadata de twitter del sitio', () => {
		currentScenarioId = 4;

		LoginToPrivateSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		NavigateToSettingSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		let fakeTitle = cy.faker.lorem.words(1);
		let fakeDescription = cy.faker.lorem.words(2);

		ExpandTwitterSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;


		ChangeTwitterMetaData(fakeTitle, fakeDescription);
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		SaveUpdateSettings();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(300);
		currentStepId++;

		cy.contains('Saved').should('be.visible');


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


	
	function NavigateToSettingSection() {

		cy.visit(baseGhostURL + 'ghost/#/settings/general');
		cy.wait(3000);

	}

	
	function SaveUpdateSettings() {

		cy.get('.gh-canvas-header button').scrollIntoView();
		cy.get('.gh-canvas-header button').click({ force: true });		
		cy.wait(300);
	}


	function ExpandTitleDescriptionSection()
	{

		cy.get(".gh-setting-first").first().contains("Expand").click({force : true});
		cy.wait(300);
	}
	

	function ExpandTimeZone()
	{
		cy.get(".gh-setting").first().contains("Expand").click({force : true});
		cy.wait(300);
	}

	function ChangeTitleAndDescription(newTitle,newDescription)
	{

		cy.get(".gh-setting-first input").then($elements => {
			cy.wrap($elements[0]).clear({force: true}).type(newTitle,{force: true});
			cy.wrap($elements[1]).clear({force: true}).type(newDescription,{force: true});
			cy.wait(300);
		});		
		
		
	}


	function ChangeTimeZone()
	{
		
		let newTimeZone=cy.faker.random.number({
			'min': -5,
			'max': 5
		});

		cy.get("#timezone").get("option").then($elements => {

			for(let i=0;i<$elements.length;i++)
			{
				if($elements[i].text.indexOf(' '+newTimeZone)>0 )
				{
				
					cy.get("#timezone").select( $elements[i].value,{force: true} );			
					cy.wait(300);
					return;
				}
			}

		});

	}


	function ExpandMetadataSection()
	{

		cy.get(".gh-setting-content").then($elements => {
			cy.wrap($elements[6]).parent().within(($container) => {

				cy.get("button").click({force: true});
				cy.wait(300);

			});
		});
		
		
	}


	function ExpandTwitterSection()
	{
		cy.get(".gh-setting-content").then($elements => {
			cy.wrap($elements[7]).parent().within(($container) => {

				cy.get("button").click({force: true});
				cy.wait(300);

			});
		});
	}

	function ChangeMetaData(newTitle, newDescription)
	{
		cy.get("#metaTitle").scrollIntoView();

		cy.get("#metaTitle").clear({force: true}).type(newTitle);
		cy.get("#metaDescription").clear({force: true}).type(newDescription);
	}


	function ChangeTwitterMetaData(newTitle, newDescription)
	{
		cy.get("#twitterTitle").scrollIntoView();

		cy.get("#twitterTitle").clear({force: true}).type(newTitle);
		cy.get("#twitterDescription").clear({force: true}).type(newDescription);
	}
	

})


