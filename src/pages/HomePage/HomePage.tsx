import CurrentWeather from './components/CurrentWeather/CurrentWeather';
import ForecastList from './components/ForecastList/ForecastList';

export default function HomePage() {
  return (
    <div className="mx-auto flex h-full w-1/3 flex-col items-center">
      <CurrentWeather />
      <ForecastList />
    </div>
  );
}
