
import './styles/_weather.scss';

import type { WeatherManagerInterface } from './WeatherManager.d';
import type { ApiManagerInterface } from "../ApiManager/ApiManager.d";
import type { ResponseData } from "../providers/FetchDataProvider.d";
import type OpenMeteoComApiInterface from "../providers/FetchProvider/OpenMeteoComApi/OpenMeteoComApi";

import { setError } from '../ErrorContainer/ErrorContainer';
import ApiManager from "../ApiManager/ApiManager";
import OpenMeteoComApi from "../providers/FetchProvider/OpenMeteoComApi/OpenMeteoComApi";
import { setWeatherTexts, toggleSpinner } from './WeatherManagerUI';

class WeatherManager implements WeatherManagerInterface {
  private apiManager: ApiManagerInterface<OpenMeteoComApiInterface>;

  constructor() {
    this.apiManager = new ApiManager();
    this.apiManager.addWeatherProviders([new OpenMeteoComApi()]);
  }

  getWheatherData() {
    const weatherData = this.apiManager.getCurrentWeather();
    setWeatherTexts('', '');
    toggleSpinner();
    weatherData.then((weatherData: ResponseData) => {
      const currentWeather: ResponseData = weatherData.current_weather as ResponseData;

      toggleSpinner();
      setWeatherTexts(`${String(currentWeather.temperature)}°C`,`${String(currentWeather.windspeed)}Km/h`);
    }).catch(() => {
      toggleSpinner();
      setWeatherTexts('', '');
      setError('Please review your location privacy settings and the weather api service status.');
    });
  }
}

export default WeatherManager;