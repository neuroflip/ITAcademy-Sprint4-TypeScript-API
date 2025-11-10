import { vi, describe, it, expect, beforeEach } from 'vitest';
import WeatherManager from '../WeatherManager'
import { setError, setUILoadingAndWeatherText } from '../WeatherManagerUI';
import ApiManager from '../../ApiManager/ApiManager';

const ApiManagerMock = { 
    addJokesProviders: vi.fn(),
    addWeatherProviders: vi.fn(),
    getRandomJoke: vi.fn(),
    getCurrentWeather: vi.fn().mockResolvedValueOnce({
        "current_weather": {
            "temperature": "11",
            "windspeed": "12"
        }
    }).mockRejectedValue()
};

vi.mock('../../ApiManager/ApiManager', () => {
  return {
    default: vi.fn(function ApiManager() {
      return ApiManagerMock;
    })
  };
});

import OpenMeteoComApi from '../../providers/FetchProvider/OpenMeteoComApi/OpenMeteoComApi';
vi.mock('../../providers/FetchProvider/OpenMeteoComApi/OpenMeteoComApi', () => ({
  default: vi.fn()
}));

vi.mock('../WeatherManagerUI', () => ({
  setError: vi.fn(),
  setUILoadingAndWeatherText: vi.fn()
}));

describe('WeatherManger', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('creates the apiManager, adds a weather provider and gets the geather data', async () => {
        const weatherManager = new WeatherManager();

        await Promise.resolve();

        expect(ApiManagerMock.addWeatherProviders).toHaveBeenCalledTimes(1);
        expect(ApiManagerMock.addWeatherProviders).toHaveBeenCalledWith([
            expect.any(OpenMeteoComApi)
        ]);
        expect(await ApiManagerMock.getCurrentWeather).toHaveBeenCalledTimes(1);

        expect(setUILoadingAndWeatherText).toHaveBeenCalledTimes(2);
        expect(setUILoadingAndWeatherText).toHaveBeenCalledWith(true, '', '');
        expect(setUILoadingAndWeatherText).toHaveBeenCalledWith(true, '11°C','12Km/h');
        expect(setError).toHaveBeenCalledWith('')
    });

    it('gets the geather data on constructor but the api rejects', async () => {
        const weatherManager = new WeatherManager();

        await ApiManagerMock.getCurrentWeather.mock.results[0].value.catch(() => {});

        expect(setUILoadingAndWeatherText).toHaveBeenCalledTimes(2);
        expect(setUILoadingAndWeatherText).toHaveBeenCalledWith(true, '', '');
        expect(setUILoadingAndWeatherText).toHaveBeenCalledWith(true, '','');
        expect(setError).toHaveBeenCalledWith('‼️ Please review your location privacy settings and weather api service status')
    });
});