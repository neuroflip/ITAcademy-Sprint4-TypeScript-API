const NOTFUNNY = 1;
const NORMAL = 0;
const FUNNY = 2;

const prepareJokeRatingInteraction = (callback: (value: number) => void) => {
  const plus1Button = document.getElementById('plus1button');
  const plus2Button = document.getElementById('plus2button');
  const plus3Button = document.getElementById('plus3button');

  plus1Button?.addEventListener('click', () => {
    callback(FUNNY);
  });
  plus2Button?.addEventListener('click', () => {
    callback(NORMAL);
  });
  plus3Button?.addEventListener('click', () => {
    callback(NOTFUNNY);
  });
}

export { prepareJokeRatingInteraction }