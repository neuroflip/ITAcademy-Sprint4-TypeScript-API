import { vi, describe, it, expect, beforeEach } from 'vitest';
import { prepareNextJokeButtonInteraction, setJokesText, setRandomBackground, toggleSpinner } from '../JokesManagerUI'
import { getRandomInt } from '../../helpers/utils';

vi.mock('../../helpers/utils', () => ({
  getRandomInt: vi.fn().mockReturnValueOnce(0).mockReturnValue(1)
}));

const callback = vi.fn();

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
        <main class="jokesContainer">
          <h1>Ready to laugh?</h1>
          <p class="jokesContainer__joke">
          </p>
          <div class="spinner hidden"><div></div><div></div><div></div><div></div></div>
          <div class="jokesTrackerContainer">this is a joke
            <button id="plus1button" class="jokesTrackerContainer__button--plus">😔</button>
            <button id="plus2button" class="jokesTrackerContainer__button--plus">😐</button>
            <button id="plus3button" class="jokesTrackerContainer__button--plus">😂</button>
          </div>
          <button id="jokesButton" class="button">Next Joke</button>
        </main>
      </body>
      </html>`;
  });
    
  it('prepares the event handling on next joke button (prepareNextJokeButtonInteraction)', () => {
    const button = globalThis.document.getElementById('jokesButton');
    vi.spyOn(button, 'addEventListener');

    prepareNextJokeButtonInteraction(callback);

    expect(button.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
  });

  it('calls to the click callback clicking on next joke buttons (prepareNextJokeButtonInteraction)', () => {
    const button = globalThis.document.getElementById('jokesButton');

    prepareNextJokeButtonInteraction(callback);

    button.click();

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('toggles the spinner status (prepareNextJokeButtonInteraction)', () => {
    const spinner = globalThis.document.querySelector('.spinner');

    toggleSpinner();
    expect(spinner.className.indexOf('hidden') < 0).toBeTruthy();

    toggleSpinner();
    expect(spinner.className.indexOf('hidden') < 0).toBeFalsy();

    toggleSpinner();
    expect(spinner.className.indexOf('hidden') < 0).toBeTruthy();
  });

  it('clears the joke text when indicated (prepareNextJokeButtonInteraction)', () => {
    const jokeContainer = globalThis.document.querySelector('.jokesContainer__joke');

    setJokesText('');
    expect(jokeContainer.textContent).toEqual('');
  });

  it('sets the joke text when indicated (prepareNextJokeButtonInteraction)', () => {
    const jokeContainer = globalThis.document.querySelector('.jokesContainer__joke');

    setJokesText('This is a new joke');
    expect(jokeContainer.textContent).toEqual('"This is a new joke"');
  });

  it('sets a random background (1)', () => {
    setRandomBackground();

    expect(globalThis.document.body.className).toEqual('blob1');
    expect(getRandomInt).toHaveBeenCalled();
  });
  
  it('sets a random background (2)', () => {
    setRandomBackground();

    expect(globalThis.document.body.className).toEqual('blob2');
    expect(getRandomInt).toHaveBeenCalled();
  });
});