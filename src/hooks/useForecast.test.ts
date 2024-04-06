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
      list: [],
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
    (useSWR as Mock).mockImplementation((key, fetcher) => {
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

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeUndefined();
  });
});
