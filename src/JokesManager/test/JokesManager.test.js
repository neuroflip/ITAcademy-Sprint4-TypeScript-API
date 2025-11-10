import { vi, describe, it, expect, beforeEach } from 'vitest';
import JokesManager from '../JokesManager';

const ApiManagerMock = { 
    addJokesProviders: vi.fn(),
    addWeatherProviders: vi.fn(),
    getRandomJoke: vi.fn().mockResolvedValueOnce({
        joke: "joke",
        score: 100,
        date: "Date ISOString"  
    }).mockRejectedValue(),
    getCurrentWeather: vi.fn()
};

vi.mock('../../ApiManager/ApiManager', () => {
  return {
    default: vi.fn(function ApiManager() {
      return ApiManagerMock;
    })
  };
});

import ICanHazDadJokesApi from '../../providers/FetchProvider/ICanHazDadJokesApi/ICanHazDadJokesApi';
vi.mock('../../providers/FetchProvider/ICanHazDadJokesApi/ICanHazDadJokesApi', () => ({
  default: vi.fn()
}));

import ChuckNorrisJokesApi from '../../providers/FetchProvider/ChuckNorrisJokesApi/ChuckNorrisJokesApi';
vi.mock('../../providers/FetchProvider/ChuckNorrisJokesApi/ChuckNorrisJokesApi', () => ({
  default: vi.fn()
}));

const jokesTrackerMock = { setCurrentJoke: vi.fn() };
vi.mock('../../JokesTracker/JokesTracker', () => {
  return {
    default: vi.fn(function JokesTracker() {
      return jokesTrackerMock;
    })
  };
});

import { prepareNextJokeButtonInteraction, setUILoadingAndJokesText } from '../JokesManagerUI';

vi.mock('../JokesManagerUI', () => ({
  prepareNextJokeButtonInteraction: vi.fn(),
  setUILoadingAndJokesText: vi.fn()
}));

describe('JokesManager', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('calls addJokesProviders with the correct providers', () => {
        new JokesManager();

        expect(ApiManagerMock.addJokesProviders).toHaveBeenCalledTimes(1);
        expect(ApiManagerMock.addJokesProviders).toHaveBeenCalledWith([
            expect.any(ICanHazDadJokesApi),
            expect.any(ChuckNorrisJokesApi)
        ]);
        expect(prepareNextJokeButtonInteraction).toHaveBeenCalledTimes(1);
        expect(prepareNextJokeButtonInteraction).toHaveBeenCalledWith(expect.any(Function));
    });

    it('calls to getRandomJoke from apiManager requesting for a new joke', async () => {
        const jokesManager = new JokesManager();

        jokesManager.getNewJoke();

        expect(await ApiManagerMock.getRandomJoke).toHaveBeenCalled();
        expect(setUILoadingAndJokesText).toHaveBeenCalledTimes(2);
        expect(setUILoadingAndJokesText).toHaveBeenCalledWith(true, '');
        expect(jokesTrackerMock.setCurrentJoke).toHaveBeenCalledWith({ 
            joke: 'joke',
            score: 100,
            date: "Date ISOString"
        });
        expect(setUILoadingAndJokesText).toHaveBeenCalledWith(true, 'joke');
    });

    it('Sets the error in UI when the getRandomJoke fails', async () => {
        const jokesManager = new JokesManager();

        jokesManager.getNewJoke();
        
        await Promise.resolve();

        expect(await ApiManagerMock.getRandomJoke).toHaveBeenCalled();
        expect(setUILoadingAndJokesText).toHaveBeenCalledTimes(2);
        expect(setUILoadingAndJokesText).toHaveBeenCalledWith(true, '');
        expect(setUILoadingAndJokesText).toHaveBeenCalledWith(true, 'An error has occurred, please try again');
    });
});