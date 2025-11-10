const setUILoadingAndWeatherText = (clearContainer: boolean, temperature: string, wind: string) => {
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

const setError = (errorMessage: string) => {
    const errorContainer = document.querySelector('.error');

    if (errorContainer) {
      errorContainer.textContent = errorMessage;
    }
  }


  export { setError, setUILoadingAndWeatherText };