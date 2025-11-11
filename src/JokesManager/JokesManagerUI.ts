
const prepareNextJokeButtonInteraction = (callback: () => void) => {
  const button = document.getElementById('jokesButton');

  button?.addEventListener('click', callback.bind(this));
}

const setJokesText = (joke: string) => {
    const jokeContainer = document.querySelector('.joke');

    if(jokeContainer) {
      jokeContainer.textContent = joke.length > 0 ? `"${joke}"` : '';
    }
}

const toggleSpinner = () => {
    const spinner = document.querySelector('.jokesContainer .spinner');

    spinner?.classList.toggle('hidden');
}

export { prepareNextJokeButtonInteraction, setJokesText, toggleSpinner };