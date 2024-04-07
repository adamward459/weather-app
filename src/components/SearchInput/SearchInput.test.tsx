import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchInput from './SearchInput';

vi.mock('../../hooks/useGeoCoding', () => ({
  __esModule: true,
  default: () => ({
    trigger: vi.fn(),
  }),
}));

describe('SearchInput', () => {
  it('renders the search input correctly', () => {
    render(<SearchInput />);

    const inputElement = screen.getByPlaceholderText(
      'Search country, or city here...',
    );
    expect(inputElement).toBeInTheDocument();
  });

  it('updates input value correctly', async () => {
    render(<SearchInput />);

    const inputElement = screen.getByPlaceholderText(
      'Search country, or city here...',
    );
    userEvent.type(inputElement, 'London');

    await waitFor(() => {
      expect(inputElement).toHaveValue('London');
    });
  });

  it('displays error message for invalid input', async () => {
    render(<SearchInput />);

    const inputElement = screen.getByPlaceholderText(
      'Search country, or city here...',
    );
    await userEvent.type(inputElement, 'InvalidCity');

    await waitFor(() => {
      const errorMessage = screen.getByText('Invalid country or city');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
