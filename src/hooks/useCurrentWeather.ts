import useSWR from 'swr';
import { getData } from '../services/fetcher';

interface CurrentWeatherResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export default function useCurrentWeather(lat: number, lon: number) {
  const { data, isLoading, error } = useSWR<
    CurrentWeatherResponse,
    Error,
    string
  >(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
    getData,
  );

  return {
    data: data as CurrentWeatherResponse,
    isLoading,
    error,
  };
}
