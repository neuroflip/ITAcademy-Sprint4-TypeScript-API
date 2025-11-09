import { vi, describe, it, expect } from 'vitest';

const jokesManagerMock = { getNewJoke: vi.fn() };
const weatherManagerMock = { getWheatherData: vi.fn() };

vi.mock('../JokesManager/JokesManager', () => {
  return {
    default: vi.fn(function () {
      return jokesManagerMock;
    }),
  };
});

vi.mock('../WeatherManager/WeatherManager', () => {
  return {
    default: vi.fn(function () {
      return weatherManagerMock;
    }),
  };
});


import { init } from '../main';

describe('Main', () => {
  it('creates a jokesManager and weatherManager', () => {
    init();

    expect(jokesManagerMock.getNewJoke).toHaveBeenCalled();
    expect(weatherManagerMock.getWheatherData).toHaveBeenCalled();
  });
});