import { vi, describe, it, expect, beforeEach } from 'vitest';
import { prepareJokeRatingInteraction, NORMAL, FUNNY, NOTFUNNY } from '../JokesTrackerUI';

const callback = vi.fn();

describe('JokesTrackerUI', () => {
  beforeEach(() => {
    globalThis.document.body.innerHTML = `<!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>FizzBuzz DOM</title>
      </head>
      <body>
        <div class="jokesTrackerContainer">
          <button id="plus1button" class="button plusButton">😔</button>
          <button id="plus2button" class="button plusButton">😐</button>
          <button id="plus3button" class="button plusButton">😂</button>
        </div>
      </body>
      </html>`;
  });
    it('prepares the event handling on scores buttons', () => {
      const button1 = globalThis.document.getElementById('plus1button');
      const button2 = globalThis.document.getElementById('plus2button');
      const button3 = globalThis.document.getElementById('plus3button');
      vi.spyOn(button1, 'addEventListener');
      vi.spyOn(button2, 'addEventListener');
      vi.spyOn(button3, 'addEventListener');

      prepareJokeRatingInteraction(callback);

      expect(button1.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
      expect(button2.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
      expect(button3.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    });

    it('calls to the click callback clicking on scores buttons', () => {
      const button1 = globalThis.document.getElementById('plus1button');
      const button2 = globalThis.document.getElementById('plus2button');
      const button3 = globalThis.document.getElementById('plus3button');

      prepareJokeRatingInteraction(callback);

      button1.click();
      button2.click();
      button3.click();

      expect(callback).toHaveBeenCalledTimes(3);
      expect(callback).toHaveBeenCalledWith(FUNNY);
      expect(callback).toHaveBeenCalledWith(NORMAL);
      expect(callback).toHaveBeenCalledWith(NOTFUNNY);
    });
});