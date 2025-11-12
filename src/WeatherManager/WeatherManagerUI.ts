const setWeatherTexts = (temperature: string, wind: string) => {
  const weahterTemp = document.querySelector('.weatherContainer__temperature');
  const weahterWind = document.querySelector('.weatherContainer__windSpeed');

  if(weahterTemp) {
    weahterTemp.textContent = `${temperature}°C`;
    setWeatherIcon(Number(temperature));
  }
  if(weahterWind) {
    weahterWind.textContent = `${wind}Km/h`;
  }
}

const toggleSpinner = () => {
  const spinner = document.querySelector('.weatherContainer .spinner');

  spinner?.classList.toggle('hidden');
}

const setWeatherIcon = (temperature: number) => {
  const iconContainer = document.querySelector('.weatherContainer__icon');

  if (iconContainer) {
    if (temperature < 5) {
      iconContainer.textContent = '❄️';
    } else if (temperature >= 5 && temperature < 20) {
      iconContainer.textContent = '🌤';
    } else {
      iconContainer.textContent = '☀️';
    }
  }
}

export { setWeatherTexts, toggleSpinner };