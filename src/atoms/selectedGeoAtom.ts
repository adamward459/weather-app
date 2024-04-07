import { atom } from 'jotai';
import { GeoCodingResponse } from '../hooks/useGeoCoding';

export const selectedGeoAtom = atom<GeoCodingResponse>({
  name: 'Ho Chi Minh City',
  lat: 10.7758439,
  lon: 106.7017555,
  country: 'VN',
});
