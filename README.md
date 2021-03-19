# PruebasAutomatizadas-Semana8

# RipPuppet (Rip para la exploración automatizada de la aplicación)

* Pre-requisitos: 
a- Cypress
b- nodejs
c- Ejecutar npm install

* Ejecución: 

node index.js url headless


# CyGhost (Ejecucion de escenarios de prueba y generacion de capturas paso a paso)

* Pre-requisitos: 

a- Cypress
b- Faker (Desde la carpeta cyGhost ejecutar npm install faker --save-dev )

* Configuración:
Modificar los siguientes parámetros en el fichero cypress.json para que coincidan con los parámetros de la instancia de ghost a probar
	"ghostVersion" : "3.40.5" ,
	"baseGhostURL" : "http://localhost:2368/" ,
	"username" : "XXXXX" , 
	"password" : "YYYYYY"

* Ejecución: 

Desde el directorio cyGhost ejecutar el comando npx cypress run

* Resultados: 

Dentro del folder cypress/screenshots va a encontrar la siguiente estructura de directorios con las capturas de los escenarios descritos en el fichero cypress.json

├───screenshots  
│   │   └───ghost-3.40.5 (De  
│   │       └───feature-3  
│   │           ├───scenario-1  
│   │           ├───scenario-2  
│   │           ├───scenario-3  
│   │           └───scenario-4  
│   ├───updatePage.spec.js  
│   │   └───ghost-3.40.5  
│   │       └───feature-4  
│   │           ├───scenario-1  
│   │           ├───scenario-2  
│   │           ├───scenario-3  
│   │           └───scenario-4  
│   ├───updatePost.spec.js  
│   │   └───ghost-3.40.5  
│   │       └───feature-2  
│   │           ├───scenario-1  
│   │           ├───scenario-2  
│   │           ├───scenario-3  
│   │           └───scenario-4  
│   └───updateSettings.spec.js  
│       └───ghost-3.40.5  
│           └───feature-1  
│               ├───scenario-1  
│               ├───scenario-2  
│               ├───scenario-3  
│               └───scenario-4  


# visualRegresor (Generación de regresiones visuales)

* Pre-requisitos: 

a- Node
b- Desde el directorio visualRegresor , ejecutar el comando npm install
c- Asegúrese de copiar los resultados de la ejecución de las capturas de producidas por CyGhost dentro de la carpeta visualRegresor/source de tal manera que se obtenga el siguiente formato de directorios

├───3.10.0  
│   ├───feature-1  
│   │   ├───scenario-1  
│   │   ├───scenario-2  
│   │   ├───scenario-3  
│   │   └───scenario-4  
│   ├───feature-2  
│   │   ├───scenario-1  
│   │   ├───scenario-2  
│   │   ├───scenario-3  
│   │   └───scenario-4  
│   └───feature-3  
│       ├───scenario-1  
│       ├───scenario-2  
│       ├───scenario-3  
│       └───scenario-4  
└───3.40.5  
    ├───feature-1  
    │   ├───scenario-1  
    │   ├───scenario-2  
    │   ├───scenario-3  
    │   └───scenario-4  
    ├───feature-2  
    │   ├───scenario-1  
    │   ├───scenario-2  
    │   ├───scenario-3  
    │   └───scenario-4  
    └───feature-3  
        ├───scenario-1  
        ├───scenario-2  
        ├───scenario-3  
        └───scenario-4

 d- Modificar los parámetros en el fichero config.json dentro de la carpeta visualRegresor para que se ajusten a las carpetas y versiones a ejecutar

* Ejecución: 

Desde la carpeta visualRegresor ejecutar node index.js

* Resultados: 

Dentro de la carpeta visualRegresor/results encontra el fichero index.html que contiene el fichero generado a partir de la ejecución .
