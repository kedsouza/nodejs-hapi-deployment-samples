# Sample Hapi API Application able to deploy to Linux Azure App Services
Hapi Dev Documentation: https://hapi.dev/tutorials/?lang=en_US

## Run Locally
`git clone url`

`cd nodejs-hapi-deployment-samples`

`npm install`

`npm start`

## Considerations before deployment to App Service
* Make sure to reference the PORT varaible, initalizing the hapi server.
  
  More information: https://docs.microsoft.com/en-us/azure/app-service/configure-language-nodejs?pivots=platform-linux

* Make the hapi service address is not set to 'localhost', and set to '0.0.0.0'

  More information: https://hapi.dev/api/?v=20.1.0#-serveroptionsaddress 

* Consider listing to hapi request events, to log all errors.

  More information: https://hapi.dev/api/?v=20.1.0#server.events



