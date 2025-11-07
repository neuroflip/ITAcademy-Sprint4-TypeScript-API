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

  async getWheatherData() {
    const weatherContainer = document.querySelector('.weatherContainer');
    const weatherData = this.apiManager.getCurrentWeather()

    weatherData.then((weatherData: ResponseData) => {
      const currentWeather: ResponseData = weatherData.current_weather as ResponseData;
      
      weatherContainer && (weatherContainer.textContent = String(currentWeather.temperature));
    });
  }
}

export default WeatherManager;