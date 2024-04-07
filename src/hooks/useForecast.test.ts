import { renderHook } from '@testing-library/react-hooks';
import useSWR from 'swr';
import { Mock } from 'vitest';
import useForecast from './useForecast';

vi.mock('swr', () => ({ default: vi.fn() }));

describe('useForecast', () => {
  it('should fetch forecast data', async () => {
    const lat = 123;
    const lon = 456;

    // Mock the fetcher function
    const mockData = {
      cod: '200',
      message: 0,
      cnt: 40,
      list: [
        {
          dt: 1712394000,
          main: {
            temp: 307.1,
            feels_like: 311.1,
            temp_min: 307.1,
            temp_max: 307.11,
            pressure: 1007,
            sea_level: 1007,
            grnd_level: 1004,
            humidity: 49,
            temp_kf: -0.01,
          },
          weather: [
            {
              id: 802,
              main: 'Clouds',
              description: 'scattered clouds',
              icon: '03d',
            },
          ],
          clouds: {
            all: 40,
          },
          wind: {
            speed: 7.1,
            deg: 158,
            gust: 7.22,
          },
          visibility: 10000,
          pop: 0,
          sys: {
            pod: 'd',
          },
          dt_txt: '2024-04-06 09:00:00',
        },
      ],
      city: {
        id: 1,
        name: 'Test City',
        coord: { lat: 123, lon: 456 },
        country: 'US',
        population: 100000,
        timezone: 3600,
        sunrise: 1629349200,
        sunset: 1629399600,
      },
    };
    (useSWR as Mock).mockImplementation((key) => {
      if (key === `/api/data/2.5/forecast?lat=${lat}&lon=${lon}`) {
        return {
          data: mockData,
          isLoading: false,
          error: undefined,
        };
      }
    });

    // Render the hook
    const { result } = renderHook(() => useForecast(lat, lon));

    expect(result.current.data).toEqual({
      '06 April': [
        {
          clouds: {
            all: 40,
          },
          dt: 1712394000,
          dt_txt: '2024-04-06 09:00:00',
          main: {
            feels_like: 311.1,
            grnd_level: 1004,
            humidity: 49,
            pressure: 1007,
            sea_level: 1007,
            temp: 307.1,
            temp_kf: -0.01,
            temp_max: 307.11,
            temp_min: 307.1,
          },
          pop: 0,
          sys: {
            pod: 'd',
          },
          visibility: 10000,
          weather: [
            {
              description: 'scattered clouds',
              icon: '03d',
              id: 802,
              main: 'Clouds',
            },
          ],
          wind: {
            deg: 158,
            gust: 7.22,
            speed: 7.1,
          },
        },
      ],
    });
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });
});
