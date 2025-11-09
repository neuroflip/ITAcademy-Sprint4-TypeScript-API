import { vi, describe, it, expect } from 'vitest';
import { init } from '../main';

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

describe('Main', () => {
  it('creates a jokesManager and weatherManager to execute the main get functions', () => {
    init();

    expect(jokesManagerMock.getNewJoke).toHaveBeenCalled();
    expect(weatherManagerMock.getWheatherData).toHaveBeenCalled();
  });
});