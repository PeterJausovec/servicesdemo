# Azure Container Apps (ACA) samples
Repo contains sample Azure Container App populating diagnostics data to [Microsoft Azure Application Insights](https://azure.microsoft.com/en-us/services/application-insights/)


* service-a
  Angular.js sample application with Node.js backend. 
* service-b
  ASP.NET Core sample service.

# Configuration
Set ```APPINSIGHTS_INSTRUMENTATIONKEY``` environment variable before running ```docker-compose up```
```
export APPINSIGHTS_INSTRUMENTATIONKEY=488811fc-e1e1-4ba2-9278-f38ce88559c2
```

# Running App locally
```
docker-compose up --build
```

# Deploying to ACS cluster
TBD