import { render, screen } from '@testing-library/react';
import Forecast from './Forecast';

const mockItems = [
  {
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
  },
  {
    dt: 2,
    temperature: 25,
    description: 'Cloudy',
    weather: [{ icon: '10d', description: 'Cloudy' }],
    main: {
      temp: 303.7,
      feels_like: 310.12,
      temp_min: 303.1,
      temp_max: 303.7,
      pressure: 1010,
      humidity: 72,
    },
  },
] as any;

describe('Forecast', () => {
  it('renders the day correctly', () => {
    render(<Forecast day="Monday" items={mockItems} />);
    expect(screen.getByText('Monday')).toBeInTheDocument();
  });

  it('renders the forecast items correctly', () => {
    render(<Forecast day="Tuesday" items={mockItems} />);
    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getByText('Cloudy')).toBeInTheDocument();
  });
});
