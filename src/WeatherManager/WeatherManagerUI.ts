const setWeatherTexts = (temperature: string, wind: string) => {
  const weahterTemp = document.querySelector('.weather--temperature');
  const weahterWind = document.querySelector('.weather--windSpeed');

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