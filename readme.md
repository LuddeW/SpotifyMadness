# Spotify madness

## Getting started
### Install dependencies
In your terminal while standing at the root of the project:
```
npm i && cd client && npm i && cd ..
```

### Setup workspace (VS Code)
Install the following extensions:
* EditorConfig for VS Code
* ESLint
* Prettier - Code formatter
* stylelint

Setup autoformatting on save for JavaScript files by adding the following to your Workspace settings:
```
{
  "[javascript]": {
    "editor.formatOnSave": true
  }
}
```

### Setup .env
To make request to the Spotify API you need to make sure the server has a valid `clientId` and `clientSecret` from Spotify.
Create a new file in the root of the repository and name it `.env`.
Copy the content from `.env.template` and paste it into `.env` but add real values for `CLIENT_ID` and `CLIENT_SECRET`.

## Developing
When developing the application you need to start 2 servers, the client development server and the api server.

### Api server
From the root of the project:
```
npm run start:dev
```
This will start the api server with livereload whenever a file is saved.

### Client development server
Go to the `./client` folder and start the server by typing:
```
npm run start
```
Open your browser and navigate to http://localhost:3005


## Project structure

```
.
+-- client
|   +-- public
|       +-- index.html (Contains all HTML for the project)
|   +-- src
|       +-- styles (Contains all styling)
|           +-- main.scss (Entry point for all styling, imports other .scss files)
|       +-- index.js (Entry point for application)
+-- server // (Empty for now)
```

