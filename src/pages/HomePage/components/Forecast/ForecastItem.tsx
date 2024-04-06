export default function ForecastDay() {
  return (
    <div className="mb-5">
      <span className="sticky top-0 inline-block bg-white pb-3">Today</span>
      <div className="flex items-center justify-between">
        <span className="font-medium text-black">08:00</span>
        <div className="flex items-center">
          <img
            src="https://openweathermap.org/img/wn/10d@4x.png"
            alt="Weather Icon"
            width={50}
            height={50}
            className="shrink-0"
          />
          <span className="text-sm">25.02/25.22&#176;C</span>
        </div>
        <span className="font-medium text-black">Broken Clouds</span>
      </div>
    </div>
  );
}
