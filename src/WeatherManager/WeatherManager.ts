
import './styles/_weather.scss';

import type { WeatherManagerInterface } from './WeatherManager.d';
import ApiManager from "../ApiManager/ApiManager";
import type { ApiManagerInterface } from "../ApiManager/ApiManager.d";
import type { ResponseData } from "../providers/FetchDataProvider.d";
import type OpenMeteoComApiInterface from "../providers/FetchProvider/OpenMeteoComApi/OpenMeteoComApi";
import OpenMeteoComApi from "../providers/FetchProvider/OpenMeteoComApi/OpenMeteoComApi";
import { setError, setUILoadingAndJokesText } from './WeatherManagerUI';

class WeatherManager implements WeatherManagerInterface {
  private apiManager: ApiManagerInterface<OpenMeteoComApiInterface>;

  constructor() {
    this.apiManager = new ApiManager();
    this.apiManager.addWeatherProviders([new OpenMeteoComApi()]);
    this.getWheatherData();
  }

  getWheatherData() {
    const weatherData = this.apiManager.getCurrentWeather();

    setUILoadingAndJokesText(true, '', '');
    weatherData.then((weatherData: ResponseData) => {
      const currentWeather: ResponseData = weatherData.current_weather as ResponseData;

      setUILoadingAndJokesText(true, `${String(currentWeather.temperature)}°C`,`${String(currentWeather.windspeed)}Km/h`);
      setError('');
    }).catch(() => {
      setUILoadingAndJokesText(true, '', '');
      setError('‼️ Please review your location privacy settings and weather api service status');
    });
  }
}

export default WeatherManager;