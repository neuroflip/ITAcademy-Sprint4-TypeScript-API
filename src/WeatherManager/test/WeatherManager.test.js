import { vi, describe, it, expect, beforeEach } from 'vitest';
import WeatherManager from '../WeatherManager'
import { setError, setUILoadingAndWeatherText } from '../WeatherManagerUI';

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

    it('creates the apiManager, adds a weather provider and gets the weather data', async () => {
        new WeatherManager();

        await Promise.resolve();

        expect(ApiManagerMock.addWeatherProviders).toHaveBeenCalledTimes(1);
        expect(ApiManagerMock.addWeatherProviders).toHaveBeenCalledWith([
            expect.any(OpenMeteoComApi)
        ]);
        expect(await ApiManagerMock.getCurrentWeather).toHaveBeenCalledTimes(1);

        expect(setUILoadingAndWeatherText).toHaveBeenCalledTimes(2);
        expect(setUILoadingAndWeatherText).toHaveBeenCalledWith('', '');
        expect(setUILoadingAndWeatherText).toHaveBeenCalledWith('11°C','12Km/h');
        expect(setError).toHaveBeenCalledWith('')
    });

    it('gets the weather data on constructor but the api rejects', async () => {
        new WeatherManager();

        await ApiManagerMock.getCurrentWeather.mock.results[0].value.catch(() => {});

        expect(setUILoadingAndWeatherText).toHaveBeenCalledTimes(2);
        expect(setUILoadingAndWeatherText).toHaveBeenCalledWith('', '');
        expect(setUILoadingAndWeatherText).toHaveBeenCalledWith('','');
        expect(setError).toHaveBeenCalledWith('‼️ Please review your location privacy settings and the weather api service status.')
    });
});