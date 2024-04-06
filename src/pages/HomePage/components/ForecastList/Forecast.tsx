import { IForecastItem } from '../../../../hooks/useForecast';
import ForecastItem from './ForecastItem';

type Prop = {
  day: string;
  items: IForecastItem[];
};

export default function Forecast({ day, items }: Prop) {
  return (
    <div className="mb-5">
      <span className="sticky top-0 inline-block bg-white pb-3">{day}</span>
      {items.map((item) => (
        <ForecastItem key={item.dt} item={item} />
      ))}
    </div>
  );
}
