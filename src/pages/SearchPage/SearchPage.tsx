import SearchHistory from './components/SearchHistory/SearchHistory';
import SearchInput from './components/SearchInput/SearchInput';

export default function SearchPage() {
  return (
    <div className="mx-auto flex h-full w-1/3 min-w-[300px] flex-col items-center">
      <SearchInput />
      <SearchHistory />
    </div>
  );
}
