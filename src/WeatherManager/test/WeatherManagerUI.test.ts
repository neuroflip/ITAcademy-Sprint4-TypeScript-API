import { describe, it, expect, beforeEach } from 'vitest';
import { setError, setUILoadingAndWeatherText } from '../WeatherManagerUI';

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
        <div class="weatherContainer">
          <img class="wehater--image" src="./src/assets/images/temperature.png" alt="thermometer" />
          <div class="weather--temperature"></div>
          <img class="inlineImage" src="./src/assets/images/wind.png" alt="wind speed" />
          <div class="weather--windSpeed"></div>
          <div id="spinner" class="spinner hidden"><div></div><div></div><div></div><div></div></div>
          <div class="error"></div>
        </div>
      </body>
      </html>`;
  });

  it('toggles the spinner status (setUILoadingAndWeatherText)', () => {
    const spinner = globalThis.document.getElementById('spinner');

    if (spinner) {
      setUILoadingAndWeatherText(true, '', '');
      expect(spinner.className.indexOf('hidden') < 0).toBeTruthy();

      setUILoadingAndWeatherText(true, '', '');
      expect(spinner.className.indexOf('hidden') < 0).toBeFalsy();

      setUILoadingAndWeatherText(true, '', '');
      expect(spinner.className.indexOf('hidden') < 0).toBeTruthy();
    }
  });

  it('sets the temperature text (prepareNextJokeButtonInteraction)', () => {
    const temperatureContainer = globalThis.document.querySelector('.weather--temperature');

    if (temperatureContainer) {
      setUILoadingAndWeatherText(true, 'Temperature', '');
      expect(temperatureContainer.textContent).toEqual('Temperature');      
    }
  });

  it('sets the windspeed text (prepareNextJokeButtonInteraction)', () => {
    const windContainer = globalThis.document.querySelector('.weather--windSpeed');

    if (windContainer) {
      setUILoadingAndWeatherText(true, '', 'Wind speed');
      expect(windContainer.textContent).toEqual('Wind speed');
    }
  });

  it('sets the error message (setError)', () => {
    const errorContainer = globalThis.document.querySelector('.error');

    if (errorContainer) {
      setError('This is a new error');
      expect(errorContainer.textContent).toEqual('This is a new error');
    }
  });
});