import { Input } from '@/components/ui/input';
import { useSearchStore } from '../store/useSearch.store';

const Search = () => {
  const { query, setQuery } = useSearchStore();

  return (
    <form>
      <Input
        type="search"
        placeholder="Поиск..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-60"
      />
    </form>
  );
};

export default Search;
