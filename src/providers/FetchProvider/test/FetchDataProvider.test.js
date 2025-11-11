import { vi, describe, it, expect } from 'vitest';
import FetchDataProvider from '../../FetchDataProvider';

const callParameters = {
    "endpoint": "https:/test.url.com/api/test/",
    "headers": { 
        "Accept": "application/json",
        "Connection": "*/*"
    },
    "params": {
        "param1": "val1",
        "param2": "val2",
        "param3": "true"
    }
}

const mockResponse = {
  "val1": "value1",
  "val2": "value2",
  "val3": "value3"
};

globalThis.fetch = vi.fn().mockImplementationOnce(() => {
  return Promise.resolve({
    "ok": true,
    json: () => Promise.resolve(mockResponse),
  })
}).mockImplementationOnce(() => {
  return Promise.resolve({
    "ok": true,
    json: () => Promise.resolve(mockResponse),
  })
}).mockImplementationOnce(() => {
  return Promise.resolve({
    "ok": true,
    json: () => Promise.resolve(mockResponse),
  })
}).mockImplementation(() => {
  return Promise.reject()
});

describe('FetchDataProvider', () => {
    it('calls to fetch with the correct parameters: only endpoint url', async () => {
      const fetchProvider = new FetchDataProvider();

      fetchProvider.fetch(callParameters.endpoint);

      expect(globalThis.fetch).toHaveBeenCalledWith(callParameters.endpoint + '?', {
        "method": "GET",
        "headers": {
          "User-Agent": globalThis.navigator.userAgent
       }
      })
    });

    it('calls to fetch with the correct parameters: endpoint url, headers', async () => {
      const fetchProvider = new FetchDataProvider();

      fetchProvider.fetch(callParameters.endpoint, callParameters.headers);

      expect(globalThis.fetch).toHaveBeenCalledWith(callParameters.endpoint + '?', {
        "method": "GET",
        "headers": {
          ...callParameters.headers,
          "User-Agent": globalThis.navigator.userAgent,
       }
      })
    });

    it('calls to fetch and returns a valid data', async () => {
      const fetchProvider = new FetchDataProvider();

      const data = await fetchProvider.fetch(callParameters.endpoint, callParameters.headers);

      expect(data).toStrictEqual(mockResponse);
    });

    it('calls to fetch but there is some error', async () => {
      const fetchProvider = new FetchDataProvider();

      await expect(() => fetchProvider.fetch(callParameters.endpoint, callParameters.headers)).rejects.toThrowError(`FetchDataProvider: error fetching ${ callParameters.endpoint }`);
    });
});