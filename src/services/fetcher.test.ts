import { getData, getDataWithArgs } from './fetcher';

describe('getData', () => {
  it('should fetch data successfully', async () => {
    const mockData = { name: 'Test Data' };
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    };
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await getData('/api/data');

    expect(fetch).toHaveBeenCalledWith('/api/data', { method: 'GET' });
    expect(result).toEqual(mockData);
  });

  it('should throw an error if response is not ok', async () => {
    const mockError = { message: 'Error fetching data' };
    const mockResponse = {
      ok: false,
      json: vi.fn().mockResolvedValue(mockError),
    };
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    await expect(getData('/api/data')).rejects.toEqual(mockError);
  });

  it('should throw an error if fetch fails', async () => {
    const mockError = { message: 'Network error' };
    global.fetch = vi.fn().mockRejectedValue(mockError);

    await expect(getData('/api/data')).rejects.toEqual(mockError);
  });
});

describe('getDataWithArgs', () => {
  it('should fetch data with arguments successfully', async () => {
    const mockData = { name: 'Test Data' };
    const mockResponse = {
      ok: true,
      json: vi.fn().mockResolvedValue(mockData),
    };
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    const result = await getDataWithArgs('/api/data', {
      arg: { key: 'value' },
    });

    expect(fetch).toHaveBeenCalledWith('/api/data?key=value', {
      method: 'GET',
    });
    expect(result).toEqual(mockData);
  });

  it('should throw an error if response is not ok', async () => {
    const mockError = { message: 'Error fetching data' };
    const mockResponse = {
      ok: false,
      json: vi.fn().mockResolvedValue(mockError),
    };
    global.fetch = vi.fn().mockResolvedValue(mockResponse);

    await expect(
      getDataWithArgs('/api/data', { arg: { key: 'value' } }),
    ).rejects.toEqual(mockError);
  });

  it('should throw an error if fetch fails', async () => {
    const mockError = { message: 'Network error' };
    global.fetch = vi.fn().mockRejectedValue(mockError);

    await expect(
      getDataWithArgs('/api/data', { arg: { key: 'value' } }),
    ).rejects.toEqual(mockError);
  });
});
