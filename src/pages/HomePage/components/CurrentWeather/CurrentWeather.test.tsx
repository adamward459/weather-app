import { render, screen } from '@testing-library/react';
import { useAtomValue } from 'jotai';
import { Mock } from 'vitest';
import useCurrentWeather from '../../../../hooks/useCurrentWeather';
import CurrentWeather from './CurrentWeather';

vi.mock('../../../../hooks/useCurrentWeather');
vi.mock('jotai', () => ({
  useAtomValue: vi.fn(),
}));

describe('CurrentWeather', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders loading state correctly', () => {
    (useAtomValue as Mock).mockReturnValue({ lat: 0, lon: 0 });
    (useCurrentWeather as Mock).mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    });

    render(<CurrentWeather />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders error state correctly', () => {
    (useAtomValue as Mock).mockReturnValue({ lat: 0, lon: 0 });
    (useCurrentWeather as Mock).mockReturnValue({
      data: null,
      isLoading: false,
      error: 'Failed to fetch data',
    });

    render(<CurrentWeather />);

    expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
  });

  it('renders weather data correctly', () => {
    const mockData = {
      weather: [{ icon: '01d', description: 'Clear sky' }],
      main: { temp: 25, humidity: 70 },
      wind: { deg: 180, speed: 5 },
      visibility: 10000,
    };

    (useAtomValue as Mock).mockReturnValue({ lat: 0, lon: 0 });
    (useCurrentWeather as Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      error: null,
    });

    render(<CurrentWeather />);

    expect(screen.getByText('25°C')).toBeInTheDocument();
    expect(screen.getByText('Clear Sky')).toBeInTheDocument();
    expect(screen.getByText('70%')).toBeInTheDocument();
    expect(screen.getByText('5 m/s')).toBeInTheDocument();
    expect(screen.getByText('10 km')).toBeInTheDocument();
  });
});
