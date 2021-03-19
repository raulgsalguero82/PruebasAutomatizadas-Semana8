function GetScenario(featureid, scenarioid)
{
	var features=Cypress.config("features");
	var scenario=null;
	for (let i=0;i<features.length;i++)
	{
		if (features[i].id===featureid)
		{
			for (let i=0;i<features.length;i++)
			{
				if (features[i].Scenarios[j].Id===scenarioid){
					return features[i].Scenarios[j];
				}
			}
		}
	}
	
	throw new Error('Invalid Feature/Scenario: '+ featureid+'/'+scenarioid);
}



function SaveScreenShoot(featureid, scenarioid, stepid)
{
	var ghostVersion=cy.config('ghostVersion');
	cy.screenshot('ghost-'+ghostVersion+'/'+'feature-'+featureid+'/scenario-'+scenarioid+'/step-'+stepid, {
		  
	});	
	
}


function LoginToPrivateSection()
{
	cy.visit(baseURL+'/ghost/#/signin');
	cy.wait(500);
	cy.get('form').within(() => {
			cy.get('input[name="identification"]').type(Cypress.config("username"));
			cy.get('input[name="password"]').type(Cypress.config("password"))
			cy.get('button.login.gh-btn.gh-btn-blue').click({ force: true });
			cy.wait(1000);
		})
	
}


function NavigateToNewPostSection()
{
	var baseURL=Cypress.config('baseGhostURL');
	cy.visit(baseURL+'/ghost/#/staff');
	cy.wait(1000);
}

function PopulateNewPost(fakeTitle,fakeDescription)
{
	cy.get(".gh-editor-title").type(fakeTitle);
	cy.get(".koenig-editor__editor").type(fakeDescription);
	cy.wait(1000);
}

function SaveNewPost()
{
	cy.get(".gh-editor-header").within(() => {
		cy.get('gh-publishmenu-trigger').click({ force: true });
		cy.wait(1000);
	});

	
}

