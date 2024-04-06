import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import ForecastList from './components/Forecast/ForecastList';

export default function HomePage() {
  return (
    <div className="flex h-full w-1/3 flex-col">
      <CurrentWeather />
      <ForecastList />
    </div>
  );
}
