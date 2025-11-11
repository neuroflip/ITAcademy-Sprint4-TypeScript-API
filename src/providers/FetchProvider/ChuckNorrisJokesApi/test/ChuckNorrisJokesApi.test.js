import { vi, describe, it, expect, beforeEach } from 'vitest';
import ChuckNorrisJokesApi from '../ChuckNorrisJokesApi';

vi.spyOn(Date.prototype, 'toISOString').mockReturnValue('date iso string'); 

vi.mock('../ChuckNorrisJokesApi.config.json', () => ({
  default: { endpoint: 'https://api.chucknorris.io' }
}));

vi.mock('../../../FetchDataProvider', () => {
  const fetchMock = vi.fn().mockResolvedValueOnce({
        categories: [],
        created_at: "2020-01-05 13:42:20.568859",
        icon_url: "https://api.chucknorris.io/img/avatar/chuck-norris.png",
        id: "3O3i4axPRciyilmEvGnRsA",
        updated_at: "2020-01-05 13:42:20.568859",
        url: "https://api.chucknorris.io/jokes/3O3i4axPRciyilmEvGnRsA",
        value: "Chuck Norris actually died a million years ago. Death just doesn't have the balls to tell him."
    }).mockResolvedValueOnce({
        categories: [],
        created_at: "2020-01-05 13:42:20.568859",
        icon_url: "https://api.chucknorris.io/img/avatar/chuck-norris.png",
        id: "3O3i4axPRciyilmEvGnRsA",
        updated_at: "2020-01-05 13:42:20.568859",
        url: "https://api.chucknorris.io/jokes/3O3i4axPRciyilmEvGnRsA",
        value: "Chuck Norris actually died a million years ago. Death just doesn't have the balls to tell him."
    }).mockRejectedValue();
  
  return {
    default: class FetchDataProviderMock {
      fetch = fetchMock;
    },
    fetchMock
  };
});

describe('ChuckNorrisJokesApi', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('calls fetch when getData is called', async () => {
        const { fetchMock } = vi.mocked(await import('../../../FetchDataProvider'));
        const api = new ChuckNorrisJokesApi();

        await api.getData();

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith('https://api.chucknorris.io');
    });

    it('returns the normalized api result when getData is successful', async () => {
        const { fetchMock } = vi.mocked(await import('../../../FetchDataProvider'));
        const api = new ChuckNorrisJokesApi();

        const data = await api.getData();

        expect(data).toStrictEqual({
            "date": "date iso string",
            "score": 0,
            "joke": "Chuck Norris actually died a million years ago. Death just doesn't have the balls to tell him."
        });
    });

    it('calls getData and returns an error', async () => {
        const { fetchMock } = vi.mocked(await import('../../../FetchDataProvider'));
        const api = new ChuckNorrisJokesApi();

        await expect(() => api.getData()).rejects.toThrowError('ChuckNorrisJokesApi cannot be accessed.');
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith('https://api.chucknorris.io');
    });
});