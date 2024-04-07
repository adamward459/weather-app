import { render, screen } from '@testing-library/react';
import { useAtomValue } from 'jotai';
import { Mock } from 'vitest';
import useForecast from '../../../../hooks/useForecast';
import ForecastList from './ForecastList';

vi.mock('../../../../hooks/useForecast');
vi.mock('jotai', () => ({
  useAtomValue: vi.fn(),
}));

describe('ForecastList', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    (useAtomValue as Mock).mockReturnValue({ lat: 0, lon: 0 });
    (useForecast as Mock).mockReturnValue({
      data: {},
      isLoading: true,
      error: null,
    });

    render(<ForecastList />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    (useAtomValue as Mock).mockReturnValue({ lat: 0, lon: 0 });
    (useForecast as Mock).mockReturnValue({
      data: {},
      isLoading: false,
      error: 'Failed to fetch data',
    });

    render(<ForecastList />);

    expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
  });

  it('renders forecast data correctly', () => {
    const mockData = {
      '2022-01-01': [
        {
          dt: 1712394001,
          temperature: 25,
          weather: [{ description: 'Clear sky' }],
          main: {
            temp: 30.55,
            feels_like: 36.42,
            temp_min: 29.95,
            temp_max: 30.55,
            pressure: 1010,
            humidity: 70,
          },
        },
      ],
      '2022-01-02': [
        {
          dt: 1412394002,
          temperature: 20,
          weather: [{ description: 'Cloudy' }],
          main: {
            temp: 30.55,
            feels_like: 36.42,
            temp_min: 25.95,
            temp_max: 31.55,
            pressure: 1010,
            humidity: 70,
          },
        },
      ],
    };

    (useAtomValue as Mock).mockReturnValue({ lat: 0, lon: 0 });
    (useForecast as Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    render(<ForecastList />);

    expect(screen.getByText('5-day Forecast (3 Hours)')).toBeInTheDocument();
    expect(screen.getByText('16:04')).toBeInTheDocument();
    expect(screen.getByText('29.95/30.55°C')).toBeInTheDocument();
    expect(screen.getByText('Clear sky')).toBeInTheDocument();
    expect(screen.getByText('10:10')).toBeInTheDocument();
    expect(screen.getByText('25.95/31.55°C')).toBeInTheDocument();
    expect(screen.getByText('Cloudy')).toBeInTheDocument();
  });
});
