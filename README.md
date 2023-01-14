# Word-Add-in-testing

Attempt at getting a simple API call from text input to work in an Office add-in using the React framework, OpenAI's GPT3 as the example.

Ultimately shelved due to issues getting the boilerplate class-based React components to work with what I know of the modern standard.

## Other Ideas

Could try from scratch, making a vanilla JS page and constructing a webpack for Office for that.

# How to use

Required: Node, Node Package Manager, Office 365

Navigate to base folder and run 

`npm install`

create a `config.js` file in `./src` with the following:

```
const openAIAPIKey = "YOUR-API-KEY-HERE"

module.exports = openAIAPIKey
```

if you plan to continue sharing this code and wish to keep your API key private. If not, the key can be hardcoded however you like!

Development environment:

`npm run dev-server`

leave that terminal open, and in a new window:

`npm run start`

which should load MS Word.
