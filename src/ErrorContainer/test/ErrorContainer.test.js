import { describe, it, expect, beforeEach } from 'vitest';
import { setError, clearError } from '../ErrorContainer'
import { error } from 'console';

describe('ErrorContainer', () => {
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
        </body>
        </html>`;
    });

    it('sets the error message and shows the error container', () => {
        const errorMessage = 'This is a new error';
        setError(errorMessage);

        const errorContainer = document.querySelector('.errorContainer');
        expect(errorContainer.textContent).toEqual(`‼️ ${errorMessage}\r\n`);
        expect(errorContainer.className).toEqual('errorContainer');
    });

    it('accumulates the error messages when calling setError with a previous error', () => {
        const errorMessage1 = 'This is 1st error';
        const errorMessage2 = 'This is 2st error';
        setError(errorMessage1);
        setError(errorMessage2);

        const errorContainer = document.querySelector('.errorContainer');
        expect(errorContainer.textContent).toEqual(`‼️ ${errorMessage1}\r\n‼️ ${errorMessage2}\r\n`);
    });

    it('clears the previous error using clearError and hiddes the error container', () => {
        setError('This is an error');
        clearError();
        const errorContainer = document.querySelector('.errorContainer');

        expect(errorContainer.textContent).toEqual('');
        expect(errorContainer.className).toEqual('errorContainer hidden');
    });
});