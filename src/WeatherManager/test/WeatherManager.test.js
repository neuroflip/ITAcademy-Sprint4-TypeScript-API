import { vi, describe, it, expect, beforeEach } from 'vitest';
import WeatherManager from '../WeatherManager'
import { setWeatherTexts, toggleSpinner } from '../WeatherManagerUI';
import { setError } from '../../ErrorContainer/ErrorContainer'; 


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
  setWeatherTexts: vi.fn(),
  toggleSpinner: vi.fn()
}));

vi.mock('../../ErrorContainer/ErrorContainer', () => ({
  setError: vi.fn()
}));

describe('WeatherManger', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('creates the apiManager, adds a weather provider', async () => {
        new WeatherManager();

        await Promise.resolve();

        expect(ApiManagerMock.addWeatherProviders).toHaveBeenCalledTimes(1);
        expect(ApiManagerMock.addWeatherProviders).toHaveBeenCalledWith([
            expect.any(OpenMeteoComApi)
        ]);
        expect(ApiManagerMock.getCurrentWeather).not.toHaveBeenCalledTimes(1);
    });

    it('gets the weather data', async () => {
        const weatherManager = new WeatherManager();

        weatherManager.getWheatherData();
        await ApiManagerMock.getCurrentWeather.mock.results[0].value.catch(() => {});

        expect(setWeatherTexts).toHaveBeenCalledTimes(2);
        expect(setWeatherTexts).toHaveBeenCalledWith('', '');
        expect(setWeatherTexts).toHaveBeenCalledWith('11','12');
        expect(toggleSpinner).toHaveBeenCalledTimes(2);
        expect(setError).not.toHaveBeenCalledWith('')
    });

    it('gets the weather data but the api rejects', async () => {
        const weatherManager = new WeatherManager();

        weatherManager.getWheatherData();
        await ApiManagerMock.getCurrentWeather.mock.results[0].value.catch(() => {});

        expect(setWeatherTexts).toHaveBeenCalledTimes(2);
        expect(setWeatherTexts).toHaveBeenCalledWith('', '');
        expect(setWeatherTexts).toHaveBeenCalledWith('','');
                expect(toggleSpinner).toHaveBeenCalledTimes(2);
        expect(setError).toHaveBeenCalledWith('Please review your location privacy settings and the weather api service status.')
    });
});