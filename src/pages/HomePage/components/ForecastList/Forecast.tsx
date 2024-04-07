import dayjs from 'dayjs';
import { IForecastItem } from '../../../../hooks/useForecast';
import ForecastItem from './ForecastItem';

type Prop = {
  day: string;
  items: IForecastItem[];
};

const today = dayjs().format('DD MMMM');
export default function Forecast({ day, items }: Prop) {
  return (
    <div className="p-3 py-2">
      <span className="sticky top-0 inline-block w-full bg-white py-1 font-thin">
        {day === today ? 'Today' : day}
      </span>
      {items.map((item) => (
        <ForecastItem key={item.dt} item={item} />
      ))}
    </div>
  );
}
