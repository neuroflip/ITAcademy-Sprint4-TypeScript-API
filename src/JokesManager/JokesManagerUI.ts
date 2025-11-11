
const prepareNextJokeButtonInteraction = (callback: () => void) => {
  const button = document.getElementById('jokesButton');

  button?.addEventListener('click', callback.bind(this));
}

const setUILoadingAndJokesText = (joke: string) => {
    const jokeContainer = document.querySelector('.joke');
    const spinner = document.querySelector('.jokesContainer .spinner');

    if(jokeContainer) {
      jokeContainer.textContent = joke.length > 0 ? `"${joke}"` : '';
    }
    spinner?.classList.toggle('hidden');
}

export { prepareNextJokeButtonInteraction, setUILoadingAndJokesText };