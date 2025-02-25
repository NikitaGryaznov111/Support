import { NavLink } from 'react-router-dom';
import styles from './AuthStyles.module.scss';
const NavAuth = () => {
  return (
    <ul className={styles.navAuth}>
      <li>
        <NavLink to="/login">Войти</NavLink>
      </li>
      <li>
        <NavLink to="/registration">Регистрация</NavLink>
      </li>
    </ul>
  );
};

export default NavAuth;
