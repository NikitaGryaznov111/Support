import { TypeUser } from '@/types/types';
import { create } from 'zustand';

interface ISearchState {
  query: string;
  users: TypeUser[];
}
interface ISearchAction {
  setQuery: (query: string) => void;
  setUsers: (users: TypeUser[]) => void;
  getFilteredUsers: () => TypeUser[];
}

interface ISearchStore extends ISearchState, ISearchAction {}

export const useSearchStore = create<ISearchStore>((set, get) => ({
  query: '',
  users: [],
  setQuery: (query) => set({ query }),
  setUsers: (users) => set({ users }),
  getFilteredUsers: () => {
    const { query, users } = get();
    if (query.trim()) {
      return users?.filter((user) =>
        user.name.toLowerCase().includes(query.toLowerCase()),
      );
    } else {
      return users;
    }
  },
}));
