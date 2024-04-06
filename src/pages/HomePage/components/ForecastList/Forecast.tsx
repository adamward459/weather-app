import { IForecastItem } from '../../../../hooks/useForecast';
import ForecastItem from './ForecastItem';

type Prop = {
  day: string;
  items: IForecastItem[];
};

export default function Forecast({ day, items }: Prop) {
  return (
    <div className="p-3">
      <span className="sticky top-0 inline-block w-full bg-white py-3 font-thin">
        {day}
      </span>
      {items.map((item) => (
        <ForecastItem key={item.dt} item={item} />
      ))}
    </div>
  );
}
