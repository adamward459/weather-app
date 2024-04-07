import { renderHook } from '@testing-library/react-hooks';
import useSWR from 'swr';
import { Mock } from 'vitest';
import useCurrentWeather from './useCurrentWeather';

vi.mock('swr', () => ({ default: vi.fn() }));

describe('useCurrentWeather', () => {
  it('should fetch current weather data', async () => {
    const lat = 123;
    const lon = 456;

    // Mock the response from the API
    const mockData = {
      coord: { lon: 0, lat: 0 },
      weather: [
        { id: 0, main: 'Clear', description: 'Clear sky', icon: '01d' },
      ],
      base: 'stations',
      main: {
        temp: 20,
        feels_like: 18,
        temp_min: 18,
        temp_max: 22,
        pressure: 1010,
        humidity: 50,
      },
      visibility: 10000,
      wind: { speed: 5, deg: 180 },
      clouds: { all: 0 },
      dt: 1631234567,
      sys: {
        type: 1,
        id: 123,
        country: 'US',
        sunrise: 1631234000,
        sunset: 1631275000,
      },
      timezone: -25200,
      id: 123456,
      name: 'City',
      cod: 200,
    };

    // Mock the useSWR hook
    (useSWR as Mock).mockImplementation((key) => {
      if (key === `/api/data/2.5/weather?lat=${lat}&lon=${lon}`) {
        return {
          data: mockData,
          isLoading: false,
          error: undefined,
        };
      }
    });

    // Render the hook
    const { result } = renderHook(() => useCurrentWeather(lat, lon));

    // Assert the returned data
    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });
});
