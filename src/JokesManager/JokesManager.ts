
import './styles/_jokes.scss';

import type JokesManagerInterface from './JokesManager.d';
import type { ApiManagerInterface } from "../ApiManager/ApiManager.d";
import ApiManager from "../ApiManager/ApiManager";
import ChuckNorrisJokesApi from "../providers/FetchProvider/ChuckNorrisJokesApi/ChuckNorrisJokesApi";
import ICanHazDadJokesApi from "../providers/FetchProvider/ICanHazDadJokesApi/ICanHazDadJokesApi";
import type { NormalizedData } from "../providers/FetchProvider/ICanHazDadJokesApi/ICanHazDadJokeApi";
import JokesTracker from "../JokesTracker/JokesTracker";
import { prepareNextJokeButtonInteraction, setUILoadingAndJokesText } from './JokesManagerUI';

class JokesManager implements JokesManagerInterface {
  private apiManager: ApiManagerInterface<ICanHazDadJokesApi | ChuckNorrisJokesApi>;
  private jokesTracker: JokesTracker;

  constructor() {
    this.apiManager = new ApiManager();
    this.jokesTracker = new JokesTracker();
    this.apiManager.addJokesProviders([new ICanHazDadJokesApi(), new ChuckNorrisJokesApi()]);
    prepareNextJokeButtonInteraction(this.getNewJoke);
  }

  getNewJoke() {
    const jokeData = this.apiManager.getRandomJoke();

    setUILoadingAndJokesText(true, '');
    jokeData.then((jokeData: NormalizedData) => {
      this.jokesTracker.setCurrentJoke(jokeData);
      setUILoadingAndJokesText(true, jokeData.joke);
    }).catch(() => {
      setUILoadingAndJokesText(true, 'An error has occurred, please try again');
    });
  }
}

export default JokesManager;