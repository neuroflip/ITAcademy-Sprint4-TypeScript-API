
import './styles/_jokesTracker.scss';

import type { NormalizedData } from '../providers/FetchProvider/ICanHazDadJokesApi/ICanHazDadJokeApi';
import type { JokesTrackerInterface, Report }  from './JokesTracker.d';
import { prepareJokeRatingInteraction, clearButtonsClasses } from './JokesTrackerUI';

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

    clearButtonsClasses();
  }

  getReportJokes() {
    return this.reportJokes;
  }

  private printRecordJokes() {
    console.log(`%c -----> Report Jokes <--------------------`, 
      'background-color: Red; color: white;');
    this.reportJokes.map((joke: NormalizedData) => {
      console.log(`%cJoke: "${joke.joke}"\nScore: ${joke.score}\nDate: ${joke.date}`, 
      'background-color: black; color: white;');
    });
  }

  private setValueToCurrentJoke(value: number) {
    const currentJoke = this.reportJokes[this.reportJokes.length-1];

    if (!currentJoke){
      throw new Error('Try to score the current joke when there is no current joke')
    } else {
      currentJoke.score = value;
      this.printRecordJokes();
    }
  }
}

export default JokesTracker;