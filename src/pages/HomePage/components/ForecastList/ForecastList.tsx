import { Else, If, Then } from 'react-if';
import Paper from '../../../../components/Paper/Paper';
import useForecast from '../../../../hooks/useForecast';
import Forecast from './Forecast';

export default function ForecastList() {
  const { data, isLoading, error } = useForecast(10.7758439, 106.7017555);

  const days = Object.keys(data);
  const forecasts = Object.values(data);

  return (
    <div className="mt-5 flex grow flex-col overflow-auto">
      <span className="font-medium text-black"> 5-day Forecast (3 Hours)</span>
      <Paper className="mt-3 grow overflow-auto">
        <If condition={isLoading}>
          <Then>
            <span className="loading loading-spinner loading-lg mx-auto block"></span>
          </Then>
          <Else>
            <If condition={!!error}>
              <Then>
                <span className="text-red-500">Failed to fetch data</span>
              </Then>
              <Else>
                {days.map((day, index) => {
                  return (
                    <Forecast key={day} day={day} items={forecasts[index]} />
                  );
                })}
              </Else>
            </If>
          </Else>
        </If>
      </Paper>
    </div>
  );
}
