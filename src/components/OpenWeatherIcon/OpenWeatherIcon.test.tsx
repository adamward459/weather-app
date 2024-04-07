import { render } from '@testing-library/react';
import OpenWeatherIcon from './OpenWeatherIcon';

describe('OpenWeatherIcon', () => {
  it('renders the weather icon correctly', () => {
    const { getByAltText } = render(<OpenWeatherIcon icon="01d" />);

    const weatherIcon = getByAltText('Weather icon');
    expect(weatherIcon).toBeInTheDocument();
    expect(weatherIcon).toHaveAttribute(
      'src',
      'http://openweathermap.org/img/wn/01d@4x.png',
    );
  });

  it('applies custom className correctly', () => {
    const { container } = render(
      <OpenWeatherIcon icon="01d" className="custom-class" />,
    );

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies custom width and height correctly', () => {
    const { getByAltText } = render(
      <OpenWeatherIcon icon="01d" width={50} height={50} />,
    );

    const weatherIcon = getByAltText('Weather icon');
    expect(weatherIcon).toHaveAttribute('width', '50');
    expect(weatherIcon).toHaveAttribute('height', '50');
  });
});
