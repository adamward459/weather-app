import { render, screen } from '@testing-library/react';
import ForecastItem from './ForecastItem';

const mockItem = {
  dt: 1,
  temperature: 20,
  weather: [{ icon: '10d', description: 'Sunny' }],
  main: {
    temp: 303.7,
    feels_like: 310.12,
    temp_min: 303.1,
    temp_max: 303.7,
    pressure: 1010,
    humidity: 72,
  },
} as any;

describe('ForecastItem', () => {
  it('renders the time correctly', () => {
    render(<ForecastItem item={mockItem} />);
    expect(screen.getByText('08:01')).toBeInTheDocument();
  });

  it('renders the temperature range correctly', () => {
    render(<ForecastItem item={mockItem} />);
    expect(screen.getByText('303.1/303.7°C')).toBeInTheDocument();
  });

  it('renders the weather description correctly', () => {
    render(<ForecastItem item={mockItem} />);
    expect(screen.getByText('Sunny')).toBeInTheDocument();
  });
});
