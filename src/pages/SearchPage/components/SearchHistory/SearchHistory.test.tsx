import { fireEvent, render, screen } from '@testing-library/react';
import { useAtom, useSetAtom } from 'jotai';
import { useNavigate } from 'react-router-dom';
import { Mock } from 'vitest';
import SearchHistory from './SearchHistory';

vi.mock('jotai', () => ({
  useAtom: vi.fn(),
  useSetAtom: vi.fn(),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: vi.fn(),
}));

const mockHistory = [
  { name: 'Location 1' },
  { name: 'Location 2' },
  { name: 'Location 3' },
];

const mockSetHistory = vi.fn();
const mockSetSelectedGeo = vi.fn();
const mockNavigate = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  (useAtom as Mock).mockReturnValue([mockHistory, mockSetHistory]);
  (useSetAtom as Mock).mockReturnValue(mockSetSelectedGeo);
  (useNavigate as Mock).mockReturnValue(mockNavigate);
});

describe('SearchHistory', () => {
  it('renders search history correctly', () => {
    render(<SearchHistory />);

    expect(screen.getByText('Search History')).toBeInTheDocument();
  });

  it('renders search history items correctly', () => {
    render(<SearchHistory />);

    const historyItems = screen.getAllByRole('listitem');
    expect(historyItems).toHaveLength(mockHistory.length);

    historyItems.forEach((item, index) => {
      expect(item).toHaveTextContent(mockHistory[index].name);
    });
  });

  it('calls onSelectGeo when clicking on search icon', () => {
    render(<SearchHistory />);

    const searchIcons = screen.getAllByTestId('search-icon');
    searchIcons.forEach((icon, index) => {
      fireEvent.click(icon);
      expect(mockSetSelectedGeo).toHaveBeenCalledWith(mockHistory[index]);
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('calls onDeleteHistory when clicking on delete icon', () => {
    render(<SearchHistory />);

    const deleteIcons = screen.getAllByTestId('delete-icon');
    deleteIcons.forEach((icon) => {
      fireEvent.click(icon);
    });

    expect(mockSetHistory).toHaveBeenCalledTimes(mockHistory.length);
  });
});
