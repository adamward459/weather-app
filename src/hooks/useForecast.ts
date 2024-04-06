import useSWR from 'swr';
import { getData } from '../services/fetcher';

interface ForecastResponse {
  cod: string;
  message: number;
  cnt: number;
  list: ForecastItem[];
  city: City;
}

interface ForecastItem {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust?: number; // Gust is optional in your data
  };
  visibility: number;
  pop: number;
  rain?: {
    '3h': number;
  };
  sys: {
    pod: string;
  };
  dt_txt: string;
}

interface City {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export default function useForecast(lat: number, lon: number) {
  const { data, isLoading, error } = useSWR<ForecastResponse, Error, string>(
    `/api/data/2.5/forecast?lat=${lat}&lon=${lon}`,
    getData,
  );

  return {
    data: data as ForecastResponse,
    isLoading,
    error,
  };
}
