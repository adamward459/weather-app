import { useAtomValue } from 'jotai';
import { selectedGeoAtom } from '../../../../atoms/selectedGeoAtom';
import Paper from '../../../../components/Paper/Paper';
import useForecast from '../../../../hooks/useForecast';
import Forecast from './Forecast';

export default function ForecastList() {
  const selectedGeo = useAtomValue(selectedGeoAtom);
  const { data, isLoading, error } = useForecast(
    selectedGeo.lat,
    selectedGeo.lon,
  );

  const days = Object.keys(data);
  const forecasts = Object.values(data);

  return (
    <div className="mt-5 flex w-full min-w-[300px] flex-col">
      <span className="font-medium text-black"> 5-day Forecast (3 Hours)</span>
      <Paper className="mt-3 h-[450px] overflow-auto p-0">
        {isLoading && (
          <span className="loading loading-spinner loading-lg mx-auto block"></span>
        )}
        {Boolean(error) && (
          <span className="text-red-500">Failed to fetch data</span>
        )}
        {days.length > 0 &&
          days.map((day, index) => {
            return <Forecast key={day} day={day} items={forecasts[index]} />;
          })}
      </Paper>
    </div>
  );
}
