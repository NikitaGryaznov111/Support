import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './AuthStyles.module.scss';
const Logout: FC = () => {
  const navigate = useNavigate();
  const handleLogout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');

    navigate('/navigationAuth');
  };
  return (
    <button onClick={handleLogout} className={styles.logoutBtn}>
      Выйти
    </button>
  );
};

export default Logout;
