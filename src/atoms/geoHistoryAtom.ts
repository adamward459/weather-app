import { atomWithStorage } from 'jotai/utils';
import { GeoCodingResponse } from '../hooks/useGeoCoding';
import { storage } from '../utils/storage';

export const geoHistoryAtom = atomWithStorage<GeoCodingResponse[]>(
  'geoHistory',
  [],
  storage,
);
