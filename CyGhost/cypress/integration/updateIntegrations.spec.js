cy.faker = require('faker');

var featureId =3;
var ghostVersion;
var baseGhostURL;
var currentScenarioId;
var currentStepId;
var screenshotTaken = false;

describe('Actualizar integraciones con terceros', () => {

	beforeEach(() => {		
		baseGhostURL = Cypress.config('baseGhostURL');
		ghostVersion = Cypress.config('ghostVersion');
		cy.visit(baseGhostURL);
		currentStepId = 0;
		cy.wait(3000)
	})

	it('Hacer update de la información de integración con slack', () => {
		currentScenarioId = 1;

		LoginToPrivateSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		NavigateToSlackSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		let fakeURL = cy.faker.internet.url();
		let fakeUserName = cy.faker.name.firstName();

		
		UpdateSlackInfo(fakeURL, fakeUserName);
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		SaveIntegrationsSectionChanges();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(300);
		currentStepId++;

		cy.get(".gh-canvas-header button").contains('Saved').should('be.visible');


	})


	it('Enviar noticación de prueba de slack', () => {
		currentScenarioId = 2;

		LoginToPrivateSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		NavigateToSlackSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;
		
		SendSlackNotification();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;


		cy.contains('Sent').should('be.visible');


	})


	it('Habilitar/Deshabilitar AMP', () => {
		currentScenarioId = 3;

		LoginToPrivateSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		NavigateToAMPSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		ClickAMP();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;
	

		ClickAMP();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		cy.contains('Google Analytics Tracking ID').should('be.visible');


	})


	it('Actualizar el track de seguimiento de google', () => {
		currentScenarioId = 4;

		LoginToPrivateSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		NavigateToAMPSection();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;

		UpdateGoogleTrack();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(1000);
		currentStepId++;
	

		SaveIntegrationsSectionChanges();
		SaveScreenShoot(featureId, currentScenarioId, currentStepId)
		cy.wait(300);
		currentStepId++;

		cy.get(".gh-canvas-header button").contains('Saved').should('be.visible');


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



	function NavigateToSlackSection() {

		cy.visit(baseGhostURL + 'ghost/#/settings/integrations/slack');
		cy.wait(3000);

	}

	function NavigateToAMPSection() {

		cy.visit(baseGhostURL + 'ghost/#/settings/integrations/amp');
		cy.wait(3000);

	}


	function UpdateSlackInfo(url, username)
	{
		cy.get("input[name='slack[url]']").clear({force: true}).type(url,{force: true});
		cy.wait(1000);
		cy.get("input[name='slack[username]']").clear({force: true}).type(username,{force: true});

		cy.wait(1000);


	}

	function SaveIntegrationsSectionChanges()
	{
		cy.get('.gh-canvas-header button').click({ force: true });
		cy.wait(1000);

	};
	

	function SendSlackNotification()
	{
		cy.get(".gh-btn-green").click({force: true});
		cy.wait(300);
	}


	function ClickAMP()
	{
		cy.get(".input-toggle-component").click({force: true});
		cy.wait(300);
	}


	function UpdateGoogleTrack()
	{

		let newFake=cy.faker.random.number({ min: 55555, max: 65555});
		cy.get('input[name="amp_gtag_id"]').clear({force: true}).type(newFake,{force: true});
		cy.wait(300);
	}

})


