import { atom } from 'jotai';
import { GeoCodingResponse } from '../hooks/useGeoCoding';

export const geoHistoryAtom = atom<GeoCodingResponse[]>([]);
