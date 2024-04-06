import { openWeatherMapApiKey } from '../utils/env';

export async function getData<Data, Key extends string>(
  url: Key,
): Promise<Data> {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set('appId', openWeatherMapApiKey);
    urlObj.searchParams.set('lang', 'en');
    urlObj.searchParams.set('units', 'metric');

    const response = await fetch(urlObj.toString(), {
      method: 'GET',
    });

    if (!response.ok) {
      throw await response.json();
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
