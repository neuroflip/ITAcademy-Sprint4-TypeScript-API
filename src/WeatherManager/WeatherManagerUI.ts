const setWeatherTexts = (temperature: string, wind: string) => {
  const weahterTemp = document.querySelector('.weatherContainer__temperature');
  const weahterWind = document.querySelector('.weatherContainer__windSpeed');

  if(weahterTemp) {
    weahterTemp.textContent = temperature;
  }
  if(weahterWind) {
    weahterWind.textContent = wind;
  }
}

const toggleSpinner = () => {
  const spinner = document.querySelector('.weatherContainer .spinner');

  spinner?.classList.toggle('hidden');
}

export { setWeatherTexts, toggleSpinner };