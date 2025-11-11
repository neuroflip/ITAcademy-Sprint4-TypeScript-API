
import './styles/_jokes.scss';

import type JokesManagerInterface from './JokesManager.d';
import type { ApiManagerInterface } from "../ApiManager/ApiManager.d";
import type { NormalizedData } from "../providers/FetchProvider/ICanHazDadJokesApi/ICanHazDadJokeApi";

import { setError, clearError } from '../ErrorContainer/ErrorContainer';
import ApiManager from "../ApiManager/ApiManager";
import ChuckNorrisJokesApi from "../providers/FetchProvider/ChuckNorrisJokesApi/ChuckNorrisJokesApi";
import ICanHazDadJokesApi from "../providers/FetchProvider/ICanHazDadJokesApi/ICanHazDadJokesApi";
import JokesTracker from "../JokesTracker/JokesTracker";
import { prepareNextJokeButtonInteraction, setJokesText, toggleSpinner } from './JokesManagerUI';

class JokesManager implements JokesManagerInterface {
  private apiManager: ApiManagerInterface<ICanHazDadJokesApi | ChuckNorrisJokesApi>;
  private jokesTracker: JokesTracker;

  constructor() {
    const buttonClickEventHandler = () => {
      clearError();
      this.getNewJoke()
    };

    this.apiManager = new ApiManager();
    this.jokesTracker = new JokesTracker();
    this.apiManager.addJokesProviders([new ICanHazDadJokesApi(), new ChuckNorrisJokesApi()]);
    prepareNextJokeButtonInteraction(buttonClickEventHandler.bind(this));
  }

  getNewJoke() {
    const jokeData = this.apiManager.getRandomJoke();
    
    setJokesText('');
    toggleSpinner();
    jokeData.then((jokeData: NormalizedData) => {
      this.jokesTracker.setCurrentJoke(jokeData);
      toggleSpinner();
      setJokesText(jokeData.joke);
    }).catch(() => {
      toggleSpinner();
      setJokesText('');
      setError('An error has occurred, please try again');
    });
  }
}

export default JokesManager;