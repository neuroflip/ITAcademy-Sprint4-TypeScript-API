import { vi, describe, it, expect, beforeEach } from 'vitest';
import ChuckNorrisJokesApi from '../ChuckNorrisJokesApi';

describe('ChuckNorrisJokesApi', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('calls fetch when getData is called', async () => {
        const api = new ChuckNorrisJokesApi();
    });
});