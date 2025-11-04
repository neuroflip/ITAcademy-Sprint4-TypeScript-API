import './style.scss';

import ApiManager from './ApiManager/ApiManager';
import ICanHazDadJokeApi from './providers/FetchProvider/ICanHazDadJokeApi/ICanHazDadJokeApi';
import ChuckNorrisJokesApi from './providers/FetchProvider/ChuckNorrisJokesApi/ChuckNorrisJokesApi';

const jokesApi = new ApiManager([new ICanHazDadJokeApi(), new ChuckNorrisJokesApi()]);

console.log(jokesApi.getRandomJoke())
