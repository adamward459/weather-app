import dayjs from 'dayjs';
import { useAtomValue } from 'jotai';
import { selectedGeoAtom } from '../../../../atoms/selectedGeoAtom';
import OpenWeatherIcon from '../../../../components/OpenWeatherIcon/OpenWeatherIcon';
import Paper from '../../../../components/Paper/Paper';
import IconArrowRight from '../../../../components/icons/IconArrowRight';
import useCurrentWeather from '../../../../hooks/useCurrentWeather';
import { capitalizeWords } from '../../../../utils/string';

export default function CurrentWeather() {
  const selectedGeo = useAtomValue(selectedGeoAtom);
  const { data, isLoading, error } = useCurrentWeather(
    selectedGeo.lat,
    selectedGeo.lon,
  );

  if (isLoading) {
    return (
      <Paper className="min-w-[300px]">
        <span
          data-testid="loading-spinner"
          className="loading loading-spinner loading-lg mx-auto block"
        ></span>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper className="min-w-[300px]">
        <span className="text-red-500">Failed to fetch data</span>
      </Paper>
    );
  }

  return (
    <Paper className="min-w-[300px]">
      <span className="font-light text-black">
        {dayjs().format('MMMM DD, YYYY')}
      </span>
      <div className="flex flex-wrap items-center justify-around">
        <OpenWeatherIcon
          icon={data.weather[0].icon}
          width={150}
          height={150}
          className="shrink-0"
        />

        <div className="flex shrink-0 flex-col items-center">
          <span className="text-5xl text-black">{data.main.temp}&#176;C</span>
          <span className="text-black">
            {capitalizeWords(data.weather[0].description)}
          </span>
        </div>
      </div>
      <div className="flex flex-wrap justify-between">
        <div className="flex flex-col items-center">
          <span>Humidity</span>
          <span className="font-medium text-black">{data.main.humidity}%</span>
        </div>
        <div className="flex flex-col items-center ">
          <span>Winds</span>
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
          <span>Visibility</span>
          <span className="font-medium text-black">
            {Math.trunc(data.visibility / 1000)} km
          </span>
        </div>
      </div>
    </Paper>
  );
}
