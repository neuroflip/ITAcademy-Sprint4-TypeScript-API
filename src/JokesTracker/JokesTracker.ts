
import type { NormalizedData } from '../providers/FetchDataProvider.d';
import type { JokesTrackerInterface, Report }  from './JokesTracker.d';

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

  setValueToCurrentJoke(value: number) {
    const currentJoke = this.reportJokes[this.reportJokes.length-1];

    currentJoke.score = value;
  }

  prepareJokeRatingInteraction() {
    const plus1Button = document.getElementById('plus1button');
    const plus2Button = document.getElementById('plus2button');
    const plus3Button = document.getElementById('plus3button');

    plus1Button?.addEventListener('click', () => {
      this.setValueToCurrentJoke(1);
    });
    plus2Button?.addEventListener('click', () => {
      this.setValueToCurrentJoke(2);
    });
    plus3Button?.addEventListener('click', () => {
      this.setValueToCurrentJoke(3);
    });
  }
}

export default JokesTracker;