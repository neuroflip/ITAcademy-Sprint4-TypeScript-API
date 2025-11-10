
import './styles/_weather.scss';

import type { WeatherManagerInterface } from './WeatherManager.d';
import type { ApiManagerInterface } from "../ApiManager/ApiManager.d";
import type { ResponseData } from "../providers/FetchDataProvider.d";
import type OpenMeteoComApiInterface from "../providers/FetchProvider/OpenMeteoComApi/OpenMeteoComApi";

import ApiManager from "../ApiManager/ApiManager";
import OpenMeteoComApi from "../providers/FetchProvider/OpenMeteoComApi/OpenMeteoComApi";
import { setError, setUILoadingAndWeatherText } from './WeatherManagerUI';

class WeatherManager implements WeatherManagerInterface {
  private apiManager: ApiManagerInterface<OpenMeteoComApiInterface>;

  constructor() {
    this.apiManager = new ApiManager();
    this.apiManager.addWeatherProviders([new OpenMeteoComApi()]);
    this.getWheatherData();
  }

  getWheatherData() {
    const weatherData = this.apiManager.getCurrentWeather();
    setUILoadingAndWeatherText(true, '', '');
    weatherData.then((weatherData: ResponseData) => {
      const currentWeather: ResponseData = weatherData.current_weather as ResponseData;

      setUILoadingAndWeatherText(true, `${String(currentWeather.temperature)}°C`,`${String(currentWeather.windspeed)}Km/h`);
      setError('');
    }).catch(() => {
      setUILoadingAndWeatherText(true, '', '');
      setError('‼️ Please review your location privacy settings and weather api service status');
    });
  }
}

export default WeatherManager;