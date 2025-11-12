const NOTFUNNY = 1;
const NORMAL = 2;
const FUNNY = 3;

const prepareJokeRatingInteraction = (callback: (value: number) => void) => {
  const plus1Button = document.getElementById('plus1button');
  const plus2Button = document.getElementById('plus2button');
  const plus3Button = document.getElementById('plus3button');

  plus1Button?.addEventListener('click', () => {
    plus1Button.classList.add('selected');
    plus2Button?.classList.remove('selected');
    plus3Button?.classList.remove('selected');
    callback(NOTFUNNY);
  });
  plus2Button?.addEventListener('click', () => {
    plus1Button?.classList.remove('selected');
    plus2Button.classList.add('selected');
    plus3Button?.classList.remove('selected');
    callback(NORMAL);
  });
  plus3Button?.addEventListener('click', () => {
    plus1Button?.classList.remove('selected');
    plus2Button?.classList.remove('selected');
    plus3Button.classList.add('selected');
    callback(FUNNY);
  });
}

const clearButtonsClasses = () => {
  const plus1Button = document.getElementById('plus1button');
  const plus2Button = document.getElementById('plus2button');
  const plus3Button = document.getElementById('plus3button');

  plus1Button?.classList.remove('selected');
  plus2Button?.classList.remove('selected');
  plus3Button?.classList.remove('selected');
};

export { prepareJokeRatingInteraction ,clearButtonsClasses, FUNNY, NOTFUNNY, NORMAL }