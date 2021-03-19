const path = require( "path" );
const fs = require('fs-extra');
const compareImages = require("resemblejs/compareImages");
const cypress = require('cypress')
const conf=require('./config.json');
const now = new Date();

async function DoProcess()
{

    for(let i=0;i< conf.features.length;i++)
    {
        let feature=conf.features[i];
        DoWriteFeatureHeader(feature);
        for(let j=0;j<feature.Scenarios.length;j++)
        {
            let scenario=feature.Scenarios[j];
            DoWriteScenarioHeader(scenario);

            let baseReferencePath=conf.reference.basepath+'feature-'+feature.Id+'/scenario-'+scenario.Id+'/';
            let baseTargetPath=conf.target.basepath+'feature-'+feature.Id+'/scenario-'+scenario.Id+'/';

            
            
            let files=fs.readdirSync(baseReferencePath);
            
            

            for(let k=0;k<files.length;k++)
            {
                let file=files[k];
                let fileName=file.split('/').pop();
                let stepNumber=fileName.split('.')[0].split('-')[1];

                let refFile=baseReferencePath+fileName;
                let targetFile=baseTargetPath+fileName;

                if (!fs.existsSync(targetFile))
                    targetFile=null;

                await DoCompare(refFile,targetFile,feature,scenario,stepNumber);
            };

            



        }
    }

}




async function DoCompare(referenceFile, targetFile, feature, scenario , stepNumber)
{

    console.log('Process: '+ feature.Id+"|"+ scenario.Id+"|"+stepNumber );

    let resultInfo = '';

    featureId=feature.Id;
    scenarioID=scenario.Id;


    if (targetFile!=null)
    {
        const options = {
            output: {
                errorColor: {
                    red: 255,
                    green: 0,
                    blue: 255
                },
                errorType: "movement",
                transparency: 0.3,
                largeImageThreshold: 1200,
                useCrossOrigin: false,
                outputDiff: true
            },
            scaleToSameSize: true,
            ignore: "antialiasing"
        };
        
        const data = await compareImages(
            await fs.readFile(referenceFile),
            await fs.readFile(targetFile),
            options
        );

        resultInfo = 
                "isSameDimensions: "+data.isSameDimensions+"</br>"+
                "dimensionDifference: "+ JSON.stringify(data.dimensionDifference)+"</br>"+
                "rawMisMatchPercentage: "+ data.rawMisMatchPercentage+"</br>"+
                "misMatchPercentage: "+ data.misMatchPercentage+"</br>"+
                "diffBounds: "+ JSON.stringify(data.diffBounds)+"</br>"+
                "analysisTime: "+data.analysisTime;

        await fs.writeFile("results/images/"+'feature-'+featureId+"-scenario-"+scenarioID+"-step-"+stepNumber+"-diff.png", data.getBuffer());	

        fs.copyFileSync(referenceFile, "results/images/"+'feature-'+featureId+"-scenario-"+scenarioID+"-step-"+stepNumber+"-ref.png" );
        fs.copyFileSync(targetFile, "results/images/"+'feature-'+featureId+"-scenario-"+scenarioID+"-step-"+stepNumber+"-target.png" );
        
    }
    else
    {
        resultInfo='Archivo a comparar no existente';
        fs.copyFileSync(referenceFile, "results/images/"+'feature-'+featureId+"-scenario-"+scenarioID+"-step-"+stepNumber+"-ref.png" );                
    }

    await DoWriteResults(feature,scenario,stepNumber,resultInfo);

}


async function DoWriteResults(feature, scenario , stepNumber,resultInfo)
{
    featureId=feature.Id;
    scenarioID=scenario.Id;

    var now = new Date();

    try {
		var htmlFile = fs.readFileSync('results/index.html', 'utf8');		
	} catch(e) {
		console.log('Error:', e.stack);
	}
	
	//let rowModel='<hr><div class="row text-center"><div class="col-12"><b>@0</b></div><br><br><div class="row"><div class="col-lg-1 col-md-12"><b>@1</b></div><div class="col-lg-3 col-md-4 text-center"><h3>Referencia</h3>@2</div><div class="col-lg-3 col-md-4 text-center"><h3>Version anterior</h3>@3</div><div class="col-lg-3 col-md-4 text-center"><h3>Imagen de comparación</h3>@4</div><div class="col-lg-2 col-md-12"><h3>Estadística de Resemble</h3>@5</div></div>';
    let rowModel='<hr><div class="row text-center">    <div class="col-12"><h3>@0</h3></div></div></br></br><div class="row">        <div class="col-4 text-center">        <h3>Referencia</h3>@2    </div>    <div class="col-4 text-center">        <h3>\r\nVersion anterior</h3>@3    </div>    <div class="col-4 text-center">        <h3>\r\nImagen de comparación</h3>@4    </div>    <div class="col-12 bg-light">        <h3>\r\nEstadística de Resemble</h3>@5    </div></div>\r\n';
	
    let refNames='feature-'+featureId+"-scenario-"+scenarioID+"-step-"+stepNumber;

    rowModel=rowModel.replace(/@0/i,'Step: '+stepNumber);	
	rowModel=rowModel.replace(/@2/i,"<img src='images/"+refNames+"-ref.png' class='imageFormat'  onerror='this.src=\"wrongImg.png\"' /> <a target='_blank' href='images/"+refNames+"-ref.png' >Zoom</a> ");
	rowModel=rowModel.replace(/@3/i,"<img src='images/"+refNames+"-target.png' class='imageFormat'  onerror='this.src=\"wrongImg.png\"' /> <a  target='_blank' href='images/"+refNames+"-target.png'>Zoom</a>");
	rowModel=rowModel.replace(/@4/i,"<img src='images/"+refNames+"-diff.png' class='imageFormat'  onerror='this.src=\"wrongImg.png\"' /><a  target='_blank' href='images/"+refNames+"-diff.png'>Zoom</a> ");
	rowModel=rowModel.replace(/@5/i,resultInfo);
	rowModel+="\n<!--ReplaceThis-->";
	
	htmlFile=htmlFile.replace(/<!--ReplaceThis-->/i , rowModel);
	
	fs.writeFileSync('results/index.html',htmlFile, 'utf8');


}

async function DoWriteFeatureHeader(feature)
{
    try {
		var htmlFile = fs.readFileSync('results/index.html', 'utf8');		
	} catch(e) {
		console.log('Error:', e.stack);
	}
	
	//let rowModel='<hr><div class="row text-center"><div class="col-12"><b>@0</b></div><br><br><div class="row"><div class="col-lg-1 col-md-12"><b>@1</b></div><div class="col-lg-3 col-md-4 text-center"><h3>Referencia</h3>@2</div><div class="col-lg-3 col-md-4 text-center"><h3>Version anterior</h3>@3</div><div class="col-lg-3 col-md-4 text-center"><h3>Imagen de comparación</h3>@4</div><div class="col-lg-2 col-md-12"><h3>Estadística de Resemble</h3>@5</div></div>';
    let rowModel='<div class="row bg-secondary"><div class="col-lg-12 text-center text-white"><h1 class="mt-5">Feature:'+feature.Description+'</h1><h1 class="mt-3">Date:'+now+'</h1></div></div><br>';
	rowModel+="\n<!--ReplaceThis-->";

	htmlFile=htmlFile.replace(/<!--ReplaceThis-->/i , rowModel);
	
    
	fs.writeFileSync('results/index.html',htmlFile, 'utf8');


}


async function DoWriteScenarioHeader(scenario)
{
    try {
		var htmlFile = fs.readFileSync('results/index.html', 'utf8');		
	} catch(e) {
		console.log('Error:', e.stack);
	}
	
	
    let rowModel='<div class="row bg-info"><div class="col-lg-12 text-center text-white"><h1 class="mt-5">Scenario:'+scenario.Description+'</h1></div></div><br>';
	rowModel+="\n<!--ReplaceThis-->";

	htmlFile=htmlFile.replace(/<!--ReplaceThis-->/i , rowModel);
	
	fs.writeFileSync('results/index.html',htmlFile, 'utf8');


}


function start() {
    return DoProcess();
  }

(async() => {
    console.log('before start');
  
    await start();
    
    console.log('after start');
  })();