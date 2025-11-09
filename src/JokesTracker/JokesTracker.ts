
import './styles/_jokesTracker.scss';

import type { NormalizedData } from '../providers/FetchProvider/ICanHazDadJokesApi/ICanHazDadJokeApi';
import type { JokesTrackerInterface, Report }  from './JokesTracker.d';
import { prepareJokeRatingInteraction } from './JokesTrackerUI';

class JokesTracker implements JokesTrackerInterface {
  private reportJokes: Array<Report>;

  constructor() {
    this.reportJokes = [];
    prepareJokeRatingInteraction(this.setValueToCurrentJoke.bind(this));
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
}

export default JokesTracker;