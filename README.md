# Environment
* Jekyll
* Node 8.5
* Yarn 1

# Setup
* `yarn install`

# Dev
* Copy `.env--template` to `.end-dev` and fill the values 
* Execute the command `jekyll build --watch`
* Execute the command `npm run dev`

# Prod
* Copy `.env--template` to `.end-prod` and fill the values
* Execute the command `npm run prod`

# Deploy
* Copy `.env--template` to `.end-prod` and fill the values
* Install Google Cloud SDK
* Execute the command `jekyll build`
* Execute the command `gcloud app deploy`

