import { FC, useEffect, useState } from 'react';
import styles from './Search.module.scss';
import { useAppDispatch } from '../../../store/store';
import { setText } from '../../../store/parts/searchSlice';

const Search: FC = () => {
  const [val, setVal] = useState<string>('');
  const dispatch = useAppDispatch();
  const handleInputChange =
    () => (event: React.ChangeEvent<HTMLInputElement>) => {
      setVal(event.target.value);
    };
  useEffect(() => {
    dispatch(setText(val));
  }, [val]);
  return (
    <form className={styles.form}>
      <div className={styles.inputContainer}>
        <input
          value={val}
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
