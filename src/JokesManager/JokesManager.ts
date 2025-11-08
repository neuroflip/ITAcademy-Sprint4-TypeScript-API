
import './styles/_jokes.scss';

import type ApiManagerInterface from "../ApiManager/ApiManager.d";
import ApiManager from "../ApiManager/ApiManager";
import ChuckNorrisJokesApi from "../providers/FetchProvider/ChuckNorrisJokesApi/ChuckNorrisJokesApi";
import ICanHazDadJokesApi from "../providers/FetchProvider/ICanHazDadJokesApi/ICanHazDadJokesApi";
import type { NormalizedData } from "../providers/FetchProvider/ICanHazDadJokesApi/ICanHazDadJokeApi";
import JokesTracker from "../JokesTracker/JokesTracker";

class JokesManager {
  private apiManager: ApiManagerInterface<ICanHazDadJokesApi | ChuckNorrisJokesApi>;
  private jokesTracker: JokesTracker;

  constructor() {
    this.apiManager = new ApiManager([new ICanHazDadJokesApi(), new ChuckNorrisJokesApi()]);
    this.jokesTracker = new JokesTracker();
    this.getNewJoke();
    this.prepareNextJokeButtonInteraction();
  }

  private prepareNextJokeButtonInteraction() {
    const button = document.getElementById('jokesButton');

    button?.addEventListener('click', this.getNewJoke.bind(this));
  }

  private setUILoadingAndJokesText = (clearContainer: boolean, text: string) => {
    const jokeContainer = document.querySelector('.joke');
    const spinner = document.querySelector('.jokesContainer .spinner');

    if(clearContainer && jokeContainer) {
      const textContent = text.length > 0 ? `"${text}"` : '';

      jokeContainer.textContent = textContent;
    }
    spinner?.classList.toggle('hidden');
  }

  private getNewJoke() {
    const jokeData = this.apiManager.getRandomJoke();

    this.setUILoadingAndJokesText(true, '');
    jokeData.then((jokeData: NormalizedData) => {
      this.jokesTracker.setCurrentJoke(jokeData);
      this.setUILoadingAndJokesText(true, jokeData.joke);
    }).catch(() => {
      this.setUILoadingAndJokesText(true, 'An error has occurred, please try again');
    });
  }
}

export default JokesManager;