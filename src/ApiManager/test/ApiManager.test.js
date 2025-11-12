import { vi, describe, it, expect } from 'vitest';
import ApiManager from '../ApiManager';

const jokesProvider1Mock = { getData: vi.fn() };
const weatherProvider1Mock = { getData: vi.fn() };
const jokesProvider2Mock = { getData: vi.fn() };
const weatherProvider2Mock = { getData: vi.fn() };

describe('ApiManager', () => {
    it('adds a joke provider and calls getData when calling getRandomJoke', () => {
        const apiManager = new ApiManager();

        apiManager.addJokesProviders([jokesProvider1Mock]);
        apiManager.getRandomJoke();

        expect(jokesProvider1Mock.getData).toHaveBeenCalled();
    });

    it('throws an error if calling getRandomJoke with no added joke provider', async () => {
        const apiManager = new ApiManager();

        await expect(() => apiManager.getRandomJoke()).rejects.toThrowError('No joke providers added to the ApiManager');
    });

    it('adds a weather provider and calls getData when calling getCurrentWeather', () => {
        const apiManager = new ApiManager();

        apiManager.addWeatherProviders([weatherProvider1Mock]);
        apiManager.getCurrentWeather();

        expect(weatherProvider1Mock.getData).toHaveBeenCalled();
    });

    it('throws an error if calling getCurrentWeather with no added weather provider', async () => {
        const apiManager = new ApiManager();

        await expect(() => apiManager.getCurrentWeather()).rejects.toThrowError('No weather providers added to the ApiManager');
    });

    it('adds the more than one joke providers and one got called using getCurrentWeather', () => {
        const apiManager = new ApiManager();

        apiManager.addWeatherProviders([jokesProvider1Mock, jokesProvider2Mock]);
        apiManager.getCurrentWeather();

        expect(jokesProvider1Mock.getData || jokesProvider2Mock.getData).toHaveBeenCalled();
    });

    it('adds the weather providers and one got called using getCurrentWeather', () => {
        const apiManager = new ApiManager();

        apiManager.addWeatherProviders([weatherProvider1Mock, weatherProvider2Mock]);
        apiManager.getCurrentWeather();

        expect(weatherProvider1Mock.getData || weatherProvider2Mock.getData).toHaveBeenCalled();
    });
});