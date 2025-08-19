import { FC, useEffect, useState } from 'react';
import styles from './Search.module.scss';
import { useAppDispatch } from '../../../store/store';
import { setText } from '../../../store/parts/searchSlice';

const Search: FC = () => {
  const [user, setUser] = useState<string>('');
  const dispatch = useAppDispatch();
  const handleInputChange =
    () => (event: React.ChangeEvent<HTMLInputElement>) => {
      setUser(event.target.value);
    };
  useEffect(() => {
    dispatch(setText(user));
  }, [user]);
  return (
    <form className={styles.form}>
      <div className={styles.inputContainer}>
        <input
          value={user}
          onChange={handleInputChange()}
          type="text"
          className={styles.text}
          placeholder="Поиск..."
        />
      </div>
    </form>
  );
};

export default Search;
