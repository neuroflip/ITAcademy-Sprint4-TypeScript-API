import { vi, describe, it, expect, beforeEach } from 'vitest';
import OpenMeteoComApi from '../OpenMeteoComApi';

vi.mock('../OpenMeteoComApi.config.json', () => ({
  default: {     
    "endpoint": "https://api.open-meteo.com/v1/forecast/",
    "headers": { 
        "Accept": "application/json",
        "Connection": "*/*"
    },
    "params": {
        "latitude": "",
        "longitude": "",
        "current_weather": "true"
    }
  }
}));

vi.mock('../../../FetchDataProvider', () => {
  const fetchMock = vi.fn().mockResolvedValueOnce({
    current_weather: {
      interval: 900,
      is_day: 1,
      temperature: 17.9,
      time: "2025-11-11T11:15",
      weathercode: 1,
      winddirection: 229,
      windspeed: 7.7
    }})
    .mockResolvedValueOnce({
    current_weather: {
      interval: 900,
      is_day: 1,
      temperature: 17.9,
      time: "2025-11-11T11:15",
      weathercode: 1,
      winddirection: 229,
      windspeed: 7.7
    }})
    .mockRejectedValue();
  
  return {
    default: class FetchDataProviderMock {
      fetch = fetchMock;
    },
    fetchMock
  };
});

vi.mock('../LocationResolver', () => ({
  getLocation: vi.fn()
  .mockImplementationOnce((locationResolved, locationNotResolved) => {
    locationResolved({
      latitude: 10.232,
      longitude: 300.123
    });
  })
  .mockImplementationOnce((locationResolved, locationNotResolved) => {
    locationResolved({
      latitude: 10.232,
      longitude: 300.123
    });
  })
  .mockImplementationOnce((locationResolved, locationNotResolved) => {
    locationResolved({
      latitude: 10.232,
      longitude: 300.123
    });
  })
  .mockImplementation((locationResolved, locationNotResolved) => {
    locationNotResolved(new Error('Location cannot be resolved'));
  })
}));

describe('OpenMeteoComApi', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('calls fetch when getData is called when Location is resoved', async () => {
        const { fetchMock } = vi.mocked(await import('../../../FetchDataProvider'));
        const api = new OpenMeteoComApi();

        api.getData();

        expect(fetchMock).toHaveBeenCalledTimes(1);
        expect(fetchMock).toHaveBeenCalledWith("https://api.open-meteo.com/v1/forecast/",
        { 
          "Accept": "application/json",
          "Connection": "*/*"
        },{
          "latitude": "10.232",
          "longitude": "300.123",
          "current_weather": "true"
        });
    });

    it('returns the api result when getData is successful when Location is resoved', async () => {
        const { fetchMock } = vi.mocked(await import('../../../FetchDataProvider'));
        const api = new OpenMeteoComApi();

        const data = await api.getData();

        expect(data).toStrictEqual({
          "current_weather": {
          "interval": 900,
          "is_day": 1,
          "temperature": 17.9,
          "time": "2025-11-11T11:15",
          "weathercode": 1,
          "winddirection": 229,
          "windspeed": 7.7
        }
      });
    });

    it('calls getData and returns an error when Location is resoved, but fetch fails', async () => {
        const { fetchMock } = vi.mocked(await import('../../../FetchDataProvider'));
        const api = new OpenMeteoComApi();

        await expect(() => api.getData()).rejects.toThrowError('OpenMeteoComAPI cannot be accessed.');
        expect(fetchMock).toHaveBeenCalled();
    });

    it('calls getData and returns an error when Location is NOT resoved', async () => {
        const { fetchMock } = vi.mocked(await import('../../../FetchDataProvider'));
        const api = new OpenMeteoComApi();

        await expect(() => api.getData()).rejects.toThrowError('Location cannot be resolved');
    });
});