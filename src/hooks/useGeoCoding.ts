import useSWRMutation from 'swr/mutation';
import { getDataWithArgs } from '../services/fetcher';

export interface GeoCodingResponse {
  name: string;
  lat: number;
  lon: number;
  country: string;
  state?: string; // Optional state
}

export default function useGeoCoding() {
  const { data, isMutating, error, trigger } = useSWRMutation<
    GeoCodingResponse[],
    Error,
    string,
    { q: string; limit?: number }
  >(`/api/geo/1.0/direct`, getDataWithArgs);

  return {
    data,
    isMutating,
    error,
    trigger,
  };
}
