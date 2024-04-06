import dayjs from 'dayjs';
import OpenWeatherIcon from '../../../../components/OpenWeatherIcon';
import { IForecastItem } from '../../../../hooks/useForecast';

type Prop = {
  item: IForecastItem;
};

export default function ForecastItem({ item }: Prop) {
  return (
    <div className="flex items-center justify-between gap-6">
      <span className="font-medium text-black">
        {dayjs(item.dt).format('HH:MM')}
      </span>
      <div className="flex grow items-center">
        <OpenWeatherIcon
          icon={item.weather[0].icon}
          width={50}
          height={50}
          className="shrink-0"
        />
        <span className="text-sm">
          {item.main.temp_min}/{item.main.temp_max}&#176;C
        </span>
      </div>
      <span className="font-medium text-black">
        {item.weather[0].description}
      </span>
    </div>
  );
}
