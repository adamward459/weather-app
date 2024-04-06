import { renderHook } from '@testing-library/react-hooks';
import useSWRMutation from 'swr/mutation';
import { Mock } from 'vitest';
import useGeoCoding from './useGeoCoding';

vi.mock('swr/mutation');

describe('useGeoCoding', () => {
  it('should fetch geocoding data', async () => {
    const mockData = {
      name: 'Test City',
      lat: 123,
      lon: 456,
      country: 'US',
    };

    (useSWRMutation as Mock).mockReturnValue({
      data: mockData,
      isMutating: false,
      error: undefined,
      trigger: vi.fn(),
    });

    const { result } = renderHook(() => useGeoCoding());

    expect(result.current.data).toEqual(mockData);
    expect(result.current.isMutating).toBe(false);
    expect(result.current.error).toBeUndefined();
  });
});
