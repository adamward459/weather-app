function createIconFromOpenWeatherMap(icon: string): string {
  return `http://openweathermap.org/img/wn/${icon}@4x.png`;
}

export type Prop = {
  icon: string;
  className?: string;
  width?: number;
  height?: number;
};

export default function OpenWeatherIcon({
  icon,
  className,
  width,
  height,
}: Prop) {
  return (
    <img
      src={createIconFromOpenWeatherMap(icon)}
      className={className}
      alt="Weather icon"
      width={width}
      height={height}
    />
  );
}
