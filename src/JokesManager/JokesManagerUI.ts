import { getRandomInt } from "../helpers/utils";

const prepareNextJokeButtonInteraction = (callback: () => void) => {
  const button = document.getElementById('jokesButton');

  button?.addEventListener('click', callback.bind(this));
}

const setJokesText = (joke: string) => {
    const jokeContainer = document.querySelector('.jokesContainer__joke');

    if(jokeContainer) {
      jokeContainer.textContent = joke.length > 0 ? `"${joke}"` : '';
    }
}

const toggleSpinner = () => {
    const spinner = document.querySelector('.jokesContainer .spinner');

    spinner?.classList.toggle('hidden');
}

const setRandomBackground = () => {
  const backgroundClass = `blob${getRandomInt(0, 2) + 1}`;

  document.body.classList.remove('blob1');
  document.body.classList.remove('blob2');
  document.body.classList.remove('blob3');

  document.body.classList.add(backgroundClass);
}

export { prepareNextJokeButtonInteraction, setJokesText, toggleSpinner, setRandomBackground };