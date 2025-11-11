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

import { prepareNextJokeButtonInteraction, setJokesText, toggleSpinner } from '../JokesManagerUI';
vi.mock('../JokesManagerUI', () => ({
  prepareNextJokeButtonInteraction: vi.fn(),
  setJokesText: vi.fn(),
  toggleSpinner: vi.fn()
}));

import { setError } from '../../ErrorContainer/ErrorContainer';
vi.mock('../../ErrorContainer/ErrorContainer', () => ({
  setError: vi.fn()
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
        expect(ApiManagerMock.getRandomJoke).not.toHaveBeenCalledTimes(1);
        expect(prepareNextJokeButtonInteraction).toHaveBeenCalledTimes(1);
        expect(prepareNextJokeButtonInteraction).toHaveBeenCalledWith(expect.any(Function));
    });

    it('calls to getRandomJoke from apiManager requesting for a new joke', async () => {
        const jokesManager = new JokesManager();

        jokesManager.getNewJoke();

        expect(await ApiManagerMock.getRandomJoke).toHaveBeenCalled();
        expect(setJokesText).toHaveBeenCalledTimes(2);
        expect(toggleSpinner).toHaveBeenCalledTimes(2);
        expect(setJokesText).toHaveBeenCalledWith('');
        expect(setJokesText).toHaveBeenCalledWith('joke');
        expect(jokesTrackerMock.setCurrentJoke).toHaveBeenCalledWith({ 
            joke: 'joke',
            score: 100,
            date: "Date ISOString"
        });
    });

    it('Sets the error in UI when the getRandomJoke fails', async () => {
        const jokesManager = new JokesManager();

        jokesManager.getNewJoke();
        
        await Promise.resolve();

        expect(await ApiManagerMock.getRandomJoke).toHaveBeenCalled();
        expect(setJokesText).toHaveBeenCalledTimes(2);
        expect(setJokesText).toHaveBeenCalledWith('');
        expect(setError).toHaveBeenCalledWith('An error has occurred, please try again');
    });
});