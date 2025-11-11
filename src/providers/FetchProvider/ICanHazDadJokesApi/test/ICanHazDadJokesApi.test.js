import { vi, describe, it, expect, beforeEach } from 'vitest';
import ICanHazDadJokesApi from '../ICanHazDadJokesApi';

vi.spyOn(Date.prototype, 'toISOString').mockReturnValue('date iso string'); 

vi.mock('../ICanHazDadJokesApi.config.json', () => ({
  default: {     
    "endpoint": "https://icanhazdadjoke.com/",
    "headers": { "Accept": "application/json" } }
}));

vi.mock('../../../FetchDataProvider', () => {
  const fetchMock = vi.fn().mockResolvedValueOnce({
    id: "2Luc21TSnb",
    joke: "Have you heard the story about the magic tractor? It drove down the road and turned into a field.",
    status: 200
  }).mockResolvedValueOnce({
    id: "2Luc21TSnb",
    joke: "Have you heard the story about the magic tractor? It drove down the road and turned into a field.",
    status: 200
  }).mockRejectedValue();
  
  return {
    default: class FetchDataProviderMock {
      fetch = fetchMock;
    },
    fetchMock
  };
});

describe('ICanHazDadJokesApi', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('calls fetch when getData is called', async () => {
        const { fetchMock } = vi.mocked(await import('../../../FetchDataProvider'));
        const api = new ICanHazDadJokesApi();

        await api.getData();

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith('https://icanhazdadjoke.com/', {
          "Accept": "application/json"
        });
    });

    it('returns the normalized api result when getData is successful', async () => {
        const { fetchMock } = vi.mocked(await import('../../../FetchDataProvider'));
        const api = new ICanHazDadJokesApi();

        const data = await api.getData();

        expect(data).toStrictEqual({
            "date": "date iso string",
            "score": 0,
            "joke": "Have you heard the story about the magic tractor? It drove down the road and turned into a field."
        });
    });

    it('calls getData and returns an error', async () => {
        const { fetchMock } = vi.mocked(await import('../../../FetchDataProvider'));
        const api = new ICanHazDadJokesApi();

        await expect(() => api.getData()).rejects.toThrowError('ICanHazDadJokesApi cannot be accessed.');
        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith('https://icanhazdadjoke.com/', {
          "Accept": "application/json"
        });
    });
});