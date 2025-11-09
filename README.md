# Sprint 4 TypeScript and API

## Introduction

This repo contains the solution for the ITAcademy Sprint 4 (Jokes and weather apis using typescript).

![alt basic screenshot from the project](https://github.com/neuroflip/ITAcademy-frontend-shop/blob/main/etc/)

Take a look to the live demo at: [https://neuroflip.github.io/ITAcademy-Sprint4-TypeScript-API/](https://neuroflip.github.io/ITAcademy-Sprint4-TypeScript-API/)
<br>

## Install and run

1. Clone this repo:
```bash
$ git clone https://github.com/neuroflip/ITAcademy-Sprint4-TypeScript-API.git
```
2. Install the dependencies:
```bash
$ npm install
```
3. Run in dev mode:
```bash
$ npm run dev
```

4. Or run it on production mode:
```bash
$ npm run build
$ npm run preview
```

5. Run the tests:
```bash
$ npm run test
```

<br>

## Project structure

The code architecture is organized in modules. A module directory incapsulates all the code and the resources (typescript implementation, styles and tests) inside the its directory. Then, it is structured as follows:

| Directory | Content |
| -------- | -------- |
| /src/ | All the source code |
| -- /assets/images/ | All the static assets. Only images by now |
| -- <b>/ApiManager/</b> | An ApiManager to manage all the api access |
| ---- /test/ | Tests for the ApiManager module |
| -- <b>/JokesManager/</b> | A JokesManager to manage together the jokes api access and the tracking data for the jokes punctuation |
| ---- /styles/ | scss for the JokesManager |
| ---- /test/ | Tests for the JokesManager module |
| -- <b>/JokesTracker/</b> | A JokesTracker to manage the process to tracking of the jokes punctuation process |
| ---- /styles/ | scss for the JockesTracker |
| ---- /test/ | Tests for the JokesTracker module |
| -- <b>/WeatherManager/</b> | A WeatherManager to manage all the weather api access to retrieve and show the weather data |
| ---- /styles/ | scss for the WeatherManager |
| ---- /test/ | Tests for the WeatherManager module |
| -- <b>/FetchDataProvider/</b> | A Fetch data provider to make a fetch from an api |
| ---- /test/ | Tests for the FetchDataProvider module |
| ---- /providers/ | Custom providers implementation to get data from concrete apis |
| ---- <b>/ChuckNorrisJokesApi/</b> | ChuckNorris api data access |
| ------ /test/ | Tests for the ChuckNorris api provider |
| ---- <b>/IcanHazDadJokesApi/</b> | IcanHazDadJokes api data access |
| ------ /test/ | Tests for the ICanHazDadJoke api provider |
| ---- <b>/OpenMeteoDataProvider/</b> | Open-meteo.com  api data access |
| ------ /test/ | Tests for the Open meteo api provider |

<br>

## Considerations

 - The main managers (jokes and weather) have a spinner to indicate the loading status to the user
 - there is an error management when accessing to the APIs. Each component will capture the possible errors to show a message to the user in ui
 - the code done in typescript using OO and inheritance. This way we can reuse easyly the fetch code and implement new data fetch providers to access new apis
 - all the modules includes his own tests

## CI pipeline

The project is managing a CI process using test execution and eslint execution using github actions. Check file .github/workflows/main.yml for more information. This pipeline is executed when some developer wants creates a PR to integrate into main (as example).

![alt ci pipeline execution result in a correct PR](https://github.com/neuroflip/ITAcademy-frontend-shop/blob/main/etc/)

## Testing
The tests are implemented using vitest.
[... more to come]

<br />
