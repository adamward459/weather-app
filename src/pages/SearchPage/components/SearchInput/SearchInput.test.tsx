import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useSetAtom } from 'jotai';
import { debounce } from 'lodash';
import { MemoryRouter } from 'react-router-dom';
import { Mock } from 'vitest';
import useGeoCoding from '../../../../hooks/useGeoCoding';
import SearchInput from './SearchInput';

vi.mock('../../../../hooks/useGeoCoding');
vi.mock('jotai', () => ({
  useSetAtom: vi.fn(),
}));
vi.mock('lodash', () => ({
  debounce: vi.fn(),
}));

describe('SearchInput', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders input field correctly', () => {
    (useGeoCoding as Mock).mockReturnValue({ trigger: vi.fn() });
    render(<SearchInput />, { wrapper: MemoryRouter });

    const inputElement = screen.getByPlaceholderText(
      'Search country, or city here...',
    );
    expect(inputElement).toBeInTheDocument();
  });

  it('displays error message for invalid input', async () => {
    (useGeoCoding as Mock).mockReturnValue({ trigger: vi.fn() });
    (debounce as Mock).mockImplementation((fn) => fn); // Mock debounce function

    render(<SearchInput />, { wrapper: MemoryRouter });

    const inputElement = screen.getByPlaceholderText(
      'Search country, or city here...',
    );
    fireEvent.change(inputElement, { target: { value: 'Invalid input' } });

    await waitFor(() => {
      expect(screen.getByText('Invalid country or city')).toBeInTheDocument();
    });
  });

  it('displays search options correctly', async () => {
    (useGeoCoding as Mock).mockReturnValue({
      trigger: vi.fn().mockReturnValue([{ name: 'London' }]),
    });
    (debounce as Mock).mockImplementation((fn) => fn); // Mock debounce function
    (useSetAtom as Mock).mockReturnValue(vi.fn()); // Mock useSetAtom hook

    render(<SearchInput />, { wrapper: MemoryRouter });

    const inputElement = screen.getByPlaceholderText(
      'Search country, or city here...',
    );
    await userEvent.type(inputElement, 'London');

    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument();
    });
  });

  it('navigates to home page on value selection', async () => {
    (useGeoCoding as Mock).mockReturnValue({
      trigger: vi.fn().mockReturnValue([{ name: 'London' }]),
    });
    (debounce as Mock).mockImplementation((fn) => fn); // Mock debounce function
    (useSetAtom as Mock).mockReturnValue(vi.fn()); // Mock useSetAtom hook

    render(<SearchInput />, { wrapper: MemoryRouter });

    const inputElement = screen.getByPlaceholderText(
      'Search country, or city here...',
    );
    await userEvent.type(inputElement, 'London');

    await waitFor(() => {
      const optionElement = screen.getByText('London');
      fireEvent.click(optionElement);
    });

    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
});
