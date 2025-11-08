
import './styles/_weather.scss';

import type { WeatherManagerInterface } from './WeatherManager.d';
import ApiManager from "../ApiManager/ApiManager";
import ApiManagerInterface from "../ApiManager/ApiManager";
import type { ResponseData } from "../providers/FetchDataProvider.d";
import type OpenMeteoComApiInterface from "../providers/FetchProvider/OpenMeteoComApi/OpenMeteoComApi";
import OpenMeteoComApi from "../providers/FetchProvider/OpenMeteoComApi/OpenMeteoComApi";

class WeatherManager implements WeatherManagerInterface {
  private apiManager: ApiManagerInterface<OpenMeteoComApiInterface>;

  constructor() {
    this.apiManager = new ApiManager([new OpenMeteoComApi()])
    this.getWheatherData();
  }

  private setUILoadingAndJokesText = (clearContainer: boolean, temperature: string, wind: string) => {
    const weahterTemp = document.querySelector('.weather--temperature');
    const weahterWind = document.querySelector('.weather--windSpeed');
    const spinner = document.querySelector('.weatherContainer .spinner');

    if (clearContainer) {
      if(weahterTemp) {
        weahterTemp.textContent = temperature;
      }
      if(weahterWind) {
        weahterWind.textContent = wind;
      }
    }
    spinner?.classList.toggle('hidden');
  }

  private setError(errorMessage: string) {
    const errorContainer = document.querySelector('.error');

    if (errorContainer) {
      errorContainer.textContent = errorMessage;
    }
  }

  getWheatherData() {
    const weatherData = this.apiManager.getCurrentWeather();

    this.setUILoadingAndJokesText(true, '', '');
    weatherData.then((weatherData: ResponseData) => {
      const currentWeather: ResponseData = weatherData.current_weather as ResponseData;

      this.setUILoadingAndJokesText(true, `${String(currentWeather.temperature)}°C`,`${String(currentWeather.windspeed)}Km/h`);
      this.setError('');
    }).catch(() => {
      this.setUILoadingAndJokesText(true, '', '');
      this.setError('‼️ Please review your location privacy settings and weather api service status');
    });
  }
}

export default WeatherManager;