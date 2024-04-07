import { atomWithStorage } from 'jotai/utils';
import { GeoCodingResponse } from '../hooks/useGeoCoding';
import { storage } from '../utils/storage';

export const selectedGeoAtom = atomWithStorage<GeoCodingResponse>(
  'selectedGeo',
  {
    name: 'Ho Chi Minh City',
    lat: 10.7758439,
    lon: 106.7017555,
    country: 'VN',
  },
  storage,
);
