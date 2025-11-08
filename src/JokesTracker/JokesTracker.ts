
import './styles/_jokesTracker.scss';

import type { NormalizedData } from '../providers/FetchProvider/ICanHazDadJokesApi/ICanHazDadJokeApi';
import type { JokesTrackerInterface, Report }  from './JokesTracker.d';

const NOTFUNNY = 1;
const NORMAL = 0;
const FUNNY = 2;

class JokesTracker implements JokesTrackerInterface {
  private reportJokes: Array<Report>;

  constructor() {
    this.reportJokes = [];
    this.prepareJokeRatingInteraction();
  }

  setCurrentJoke(jokeData: NormalizedData) {
    const currentJoke = this.reportJokes[this.reportJokes.length-1];

    if (currentJoke && currentJoke.score === 0) {
      this.reportJokes.pop();
    }

    this.reportJokes.push({
      joke: jokeData.joke,
      score: 0,
      date: new Date().toISOString()
    });
  }

  private setValueToCurrentJoke(value: number) {
    const currentJoke = this.reportJokes[this.reportJokes.length-1];

    currentJoke.score = value;
  }

  prepareJokeRatingInteraction() {
    const plus1Button = document.getElementById('plus1button');
    const plus2Button = document.getElementById('plus2button');
    const plus3Button = document.getElementById('plus3button');

    plus1Button?.addEventListener('click', () => {
      this.setValueToCurrentJoke(NOTFUNNY);
    });
    plus2Button?.addEventListener('click', () => {
      this.setValueToCurrentJoke(NORMAL);
    });
    plus3Button?.addEventListener('click', () => {
      this.setValueToCurrentJoke(FUNNY);
    });
  }
}

export default JokesTracker;