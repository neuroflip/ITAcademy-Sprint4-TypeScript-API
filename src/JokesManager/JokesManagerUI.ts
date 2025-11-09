
const prepareNextJokeButtonInteraction = (callback: () => void) => {
    const button = document.getElementById('jokesButton');

    button?.addEventListener('click', callback.bind(this));
  }

const setUILoadingAndJokesText = (clearContainer: boolean, text: string) => {
    const jokeContainer = document.querySelector('.joke');
    const spinner = document.querySelector('.jokesContainer .spinner');

    if(clearContainer && jokeContainer) {
      const textContent = text.length > 0 ? `"${text}"` : '';

      jokeContainer.textContent = textContent;
    }
    spinner?.classList.toggle('hidden');
}

export { prepareNextJokeButtonInteraction, setUILoadingAndJokesText };