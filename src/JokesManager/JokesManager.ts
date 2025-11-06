import type ApiManagerInterface from "../ApiManager/ApiManager.d";
import ApiManager from "../ApiManager/ApiManager";
import ChuckNorrisJokesApi from "../providers/FetchProvider/ChuckNorrisJokesApi/ChuckNorrisJokesApi";
import ICanHazDadJokeApi from "../providers/FetchProvider/ICanHazDadJokeApi/ICanHazDadJokeApi";
import type { NormalizedData } from "../providers/FetchDataProvider.d";
import JokesTracker from "../JokesTracker/JokesTracker";

class JokesManager {
  private apiManager: ApiManagerInterface<ICanHazDadJokeApi | ChuckNorrisJokesApi>;
  private jokesTracker: JokesTracker;

  constructor() {
    this.apiManager = new ApiManager([new ICanHazDadJokeApi(), new ChuckNorrisJokesApi()]);
    this.jokesTracker = new JokesTracker();
    this.jokesRequestCallback();
    this.prepareNextJokeButtonInteraction();
  }

  prepareNextJokeButtonInteraction() {
    const button = document.getElementById('jokesButton');

    button?.addEventListener('click', this.jokesRequestCallback.bind(this));
  }

  jokesRequestCallback() {
    const jokeData = this.apiManager.getRandomJoke();
    const jokeContainer = document.querySelector('.joke');

    jokeData.then((jokeData: NormalizedData) => {
      this.jokesTracker.setCurrentJoke(jokeData);
      if (jokeContainer) {
        jokeContainer.textContent = jokeData.joke;
      }
    });
  }
}

export default JokesManager;