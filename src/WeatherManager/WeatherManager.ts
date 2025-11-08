import ApiManager from "../ApiManager/ApiManager";
import ApiManagerInterface from "../ApiManager/ApiManager";
import type { ResponseData } from "../providers/FetchDataProvider.d";
import type OpenMeteoComApiInterface from "../providers/FetchProvider/OpenMeteoComApi/OpenMeteoComApi";
import OpenMeteoComApi from "../providers/FetchProvider/OpenMeteoComApi/OpenMeteoComApi";

class WeatherManager {
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

  private getWheatherData() {
    const weatherData = this.apiManager.getCurrentWeather();

    this.setUILoadingAndJokesText(true, '', '');
    weatherData.then((weatherData: ResponseData) => {
      const currentWeather: ResponseData = weatherData.current_weather as ResponseData;
        
      this.setUILoadingAndJokesText(true, `${String(currentWeather.temperature)}°C`,`${String(currentWeather.windspeed)}Km/h`);
    }).catch(() => {
      this.setUILoadingAndJokesText(true, 'An error has occurred, please try again', '');
    });
  }
}

export default WeatherManager;