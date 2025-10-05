import { Link, useParams } from 'react-router-dom';
import styles from './Error.module.scss';
import { FC } from 'react';

const Error: FC = () => {
  const params = useParams();

  return (
    <div className={styles.error}>
      <h1 className={styles.errorHeader}>Error 404</h1>
      <p className={styles.errorSub} data-testid="error-message">
        Страница не найдена по адресу:{' '}
        {Object.values(params).join('') || 'Unknown'}
      </p>
      <Link to="/">Нажмите, чтобы вернуться на главную страницу!</Link>
    </div>
  );
};

export default Error;
