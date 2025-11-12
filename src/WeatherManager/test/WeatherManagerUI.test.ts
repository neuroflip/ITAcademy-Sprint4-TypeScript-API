import { describe, it, expect, beforeEach } from 'vitest';
import { setWeatherTexts, toggleSpinner } from '../WeatherManagerUI';

describe('', () => {
  beforeEach(() => {
    globalThis.document.body.innerHTML = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FizzBuzz DOM</title>
      </head>
      <body>
        <div class="errorContainer hidden"></div>
        <div class="weatherContainer">
          <div class="weatherContainer__icon"></div>
          <div class="weatherContainer__temperature"></div>
          <div class="weatherContainer__icon--weather">🌬</div>
          <div class="weatherContainer__windSpeed"></div>
          <div id="spinner" class="spinner hidden"><div></div><div></div><div></div><div></div></div>
        </div>
      </body>
      </html>`;
  });

  it('toggles the spinner status (setUILoadingAndWeatherText)', () => {
    const spinner = globalThis.document.getElementById('spinner');

    toggleSpinner();
    expect(spinner && spinner.className.indexOf('hidden') < 0).toBeTruthy();


    toggleSpinner();
    expect(spinner && spinner.className.indexOf('hidden') < 0).toBeFalsy();

    toggleSpinner();
    expect(spinner && spinner.className.indexOf('hidden') < 0).toBeTruthy();
  });

  it('sets the temperature text (prepareNextJokeButtonInteraction)', () => {
    const temperatureContainer = globalThis.document.querySelector('.weatherContainer__temperature');

    setWeatherTexts('Temperature', '');
    expect(temperatureContainer && temperatureContainer.textContent).toEqual('Temperature°C');      
  });

  it('sets the windspeed text (prepareNextJokeButtonInteraction)', () => {
    const windContainer = globalThis.document.querySelector('.weatherContainer__windSpeed');

    setWeatherTexts('', 'Wind speed');
    expect(windContainer && windContainer.textContent).toEqual('Wind speedKm/h');
  });

  it('sets the temperature icon according to temperature value', () => {
    const icon = globalThis.document.querySelector('.weatherContainer__icon');
    const temperature = globalThis.document.querySelector('.weatherContainer__temperature');

    setWeatherTexts('1', '');

    expect(icon && icon.textContent).toEqual('❄️');
    expect(temperature && temperature.textContent).toEqual('1°C');
  });

  it('sets the temperature icon according to temperature value', () => {
    const icon = globalThis.document.querySelector('.weatherContainer__icon');
    const temperature = globalThis.document.querySelector('.weatherContainer__temperature');

    setWeatherTexts('10', '');

    expect(icon && icon.textContent).toEqual('🌤');
    expect(temperature && temperature.textContent).toEqual('10°C');
  });

  it('sets the temperature icon according to temperature value', () => {
    const icon = globalThis.document.querySelector('.weatherContainer__icon');
    const temperature = globalThis.document.querySelector('.weatherContainer__temperature');

    setWeatherTexts('25', '');

    expect(icon && icon.textContent).toEqual('☀️');
    expect(temperature && temperature.textContent).toEqual('25°C');
  });
});