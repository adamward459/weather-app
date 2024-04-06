import Paper from '../../../../components/Paper/Paper';
import ForecastItem from './ForecastItem';

export default function ForecastList() {
  return (
    <div className="mt-5 flex grow flex-col overflow-auto">
      <span className="font-medium text-black"> 5-day Forecast (3 Hours)</span>
      <Paper className="mt-3 grow overflow-auto">
        <ForecastItem />
        <ForecastItem />
        <ForecastItem />
        <ForecastItem />
      </Paper>
    </div>
  );
}
