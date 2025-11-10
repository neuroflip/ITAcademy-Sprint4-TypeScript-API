import { vi, describe, it, expect, beforeEach } from 'vitest';
import JokesTracker from '../JokesTracker';
import { prepareJokeRatingInteraction } from '../JokesTrackerUI';

vi.mock('../JokesTrackerUI', () => ({
  prepareJokeRatingInteraction: vi.fn()
}));

vi.spyOn(Date.prototype, 'toISOString').mockReturnValue('date iso string'); 

describe('JokesTracker', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('calls to prepareJokeRatingInteraction to set handles for punctuation buttons', () => {
        new JokesTracker();

        expect(prepareJokeRatingInteraction).toHaveBeenCalledTimes(1);
        expect(prepareJokeRatingInteraction).toHaveBeenCalledWith(expect.any(Function));
    });

    it('throws an error if setValueToCurrentJoke is called with no previous report data'), () => {
      const jokesTracker = new JokesTracker();
      const cb = prepareJokeRatingInteraction.mock.calls[0][0];

      expect(cb(1000)).toThrowError('Try to score the current joke when there is no current joke');
    }

    it('sets the reported score value to the current joke'), () => {
      const jokesTracker = new JokesTracker();
      const initialData = {
        "joke": "this is a joke",
        "score": 100,
        "date": "this is a date"
      }

      jokesTracker.setCurrentJoke(initialData);
      const cb = prepareJokeRatingInteraction.mock.calls[0][0];

      cb(1000);

      expect(jokesTracker.getReportJokes()).toStrictEqual([{
        ...initialData,
        "score": 1000,
        "date": 'date iso string'
      }])
    }

    describe('JokesTracker setCurrentJoke', () => {
      it('adds a report joke when calling setCurrentJoke and there is no current data', () => {
          const jokesTracker = new JokesTracker();
          const data = {
            "joke": "this is a joke",
            "score": 100,
            "date": "this is a date"
          }

          jokesTracker.setCurrentJoke(data);

          expect(jokesTracker.getReportJokes()).toStrictEqual([{
            "joke": "this is a joke",
            "score": 0,
            "date": "date iso string"
          }]);
      });

      it('adds a report joke when calling setCurrentJoke and there is not voted previous data', () => {
          const jokesTracker = new JokesTracker();
          const initialData = {
            "joke": "this is a joke",
            "score": 0,
            "date": "this is a date"
          }
          const secondData = {
            "joke": "this is a second joke",
            "score": 0,
            "date": "this is another date"
          }

          jokesTracker.setCurrentJoke(initialData);
          jokesTracker.setCurrentJoke(secondData);

          expect(jokesTracker.getReportJokes()).toStrictEqual([{
            ...secondData,
            "date": 'date iso string'
          }]);
      });

      it('adds a report joke when calling setCurrentJoke and there is voted previous data', () => {
          const jokesTracker = new JokesTracker();
          const initialData = {
            "joke": "this is a joke",
            "score": 100,
            "date": "this is a date"
          }
          const secondData = {
            "joke": "this is a second joke",
            "score": 0,
            "date": "this is another date"
          }

          jokesTracker.setCurrentJoke(initialData);
          const cb = prepareJokeRatingInteraction.mock.calls[0][0];

          cb(3);
          jokesTracker.setCurrentJoke(secondData);

          expect(jokesTracker.getReportJokes()).toStrictEqual([{
            ...initialData,
            "score": 3,
            "date": 'date iso string'
          },
          {
            ...secondData,
            "date": 'date iso string'
          }]);
      });
    });
});