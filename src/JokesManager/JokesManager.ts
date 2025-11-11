
import './styles/_jokes.scss';

import type JokesManagerInterface from './JokesManager.d';
import type { ApiManagerInterface } from "../ApiManager/ApiManager.d";
import type { NormalizedData } from "../providers/FetchProvider/ICanHazDadJokesApi/ICanHazDadJokeApi";

import ApiManager from "../ApiManager/ApiManager";
import ChuckNorrisJokesApi from "../providers/FetchProvider/ChuckNorrisJokesApi/ChuckNorrisJokesApi";
import ICanHazDadJokesApi from "../providers/FetchProvider/ICanHazDadJokesApi/ICanHazDadJokesApi";
import JokesTracker from "../JokesTracker/JokesTracker";
import { prepareNextJokeButtonInteraction, setUILoadingAndJokesText } from './JokesManagerUI';

class JokesManager implements JokesManagerInterface {
  private apiManager: ApiManagerInterface<ICanHazDadJokesApi | ChuckNorrisJokesApi>;
  private jokesTracker: JokesTracker;

  constructor() {
    this.apiManager = new ApiManager();
    this.jokesTracker = new JokesTracker();
    this.apiManager.addJokesProviders([new ICanHazDadJokesApi(), new ChuckNorrisJokesApi()]);
    prepareNextJokeButtonInteraction(this.getNewJoke.bind(this));
  }

  getNewJoke() {
    const jokeData = this.apiManager.getRandomJoke();
    setUILoadingAndJokesText('');
    jokeData.then((jokeData: NormalizedData) => {
      this.jokesTracker.setCurrentJoke(jokeData);
      setUILoadingAndJokesText(jokeData.joke);
    }).catch(() => {
      setUILoadingAndJokesText('An error has occurred, please try again');
    });
  }
}

export default JokesManager;