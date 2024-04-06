import Paper from '../../../../components/Paper/Paper';
import { IconArrowRight } from '../../../../components/icons/ArrowRight';
import useCurrentWeather from '../../../../hooks/useCurrentWeather';
import { dateFormatOptions } from '../../../../utils/date';
import { createIconFromOpenWeatherMap } from '../../../../utils/openWeatherMap';

export default function CurrentWeather() {
  const { data, isLoading, error } = useCurrentWeather(10.7758439, 106.7017555);

  if (isLoading) {
    return (
      <Paper>
        <span className="loading loading-spinner loading-lg mx-auto block"></span>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper>
        <span className="text-red-500">Failed to fetch data</span>
      </Paper>
    );
  }

  console.log(data);

  return (
    <Paper>
      <span className="font-light text-black">
        {new Date().toLocaleDateString('en-US', dateFormatOptions)}
      </span>
      <div className="flex flex-wrap items-center justify-around">
        <img
          src={createIconFromOpenWeatherMap(data.weather[0].icon)}
          alt="Weather Icon"
          width={150}
          height={150}
          className="shrink-0"
        />
        <div className="flex shrink-0 flex-col items-center">
          <span className="text-5xl text-black">{data.main.temp}&#176;C</span>
          <span className="font-light text-black">
            {data.weather[0].description}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap justify-between">
        <div className="flex flex-col items-center">
          <span className="font-thin text-black">Humidity</span>
          <span className="font-medium text-black">{data.main.humidity}%</span>
        </div>
        <div className="flex flex-col items-center ">
          <span className="font-thin text-black">Winds</span>
          <div className="flex items-center">
            <IconArrowRight
              className={'fill-black'}
              transform={`rotate(${data.wind.deg})`}
            />
            <span className="font-medium text-black">
              {data.wind.speed} m/s
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-thin text-black">Visibility</span>
          <span className="font-medium text-black">
            {Math.trunc(data.visibility / 1000)} km
          </span>
        </div>
      </div>
    </Paper>
  );
}
