
import type { NormalizedData } from '../providers/FetchDataProvider.d'

interface JokesTrackerInterface {
  setCurrentJoke(jokeData: NormalizedData): void,
  getReportJokes(): void
}

type Report = {
  joke: string,
  score: number,
  date: string
}

export { JokesTrackerInterface, Report };