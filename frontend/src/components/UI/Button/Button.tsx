import { FC, RefObject } from 'react';
import styles from './Button.module.scss';
import { Link, NavLink } from 'react-router-dom';
type Props = {
  children: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ref?: RefObject<HTMLButtonElement | null>;
  type?: 'button' | 'submit';
  disabled?: boolean;
  as?: 'link' | 'navLink';
  to?: string;
};
const Button: FC<Props> = ({
  children,
  onClick,
  ref,
  type,
  disabled,
  as,
  to,
}) => {
  if (to) {
    if (as === 'link') {
      return (
        <Link to={to} className={styles.link}>
          {children}
        </Link>
      );
    }
    if (as === 'navLink') {
      return (
        <NavLink
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.active}` : styles.link
          }
          to={to}
        >
          {children}
        </NavLink>
      );
    }
  }
  return (
    <button
      ref={ref}
      className={styles.button}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
