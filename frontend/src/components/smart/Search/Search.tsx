import { FC } from 'react';
import styles from './Search.module.scss';

const Search: FC = () => {
  return (
    <form className={styles.form}>
      <div className={styles.inputContainer}>
        <input type="text" className={styles.text} placeholder="Поиск..." />
      </div>
    </form>
  );
};

export default Search;
