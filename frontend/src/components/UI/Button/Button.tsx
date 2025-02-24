import { FC, RefObject } from 'react';
import styles from './Button.module.scss';
type Props = {
  children: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ref?: RefObject<HTMLButtonElement | null>;
};
const Button: FC<Props> = ({ children, onClick, ref }) => {
  return (
    <button ref={ref} className={styles.button} onClick={onClick} type="button">
      {children}
    </button>
  );
};

export default Button;
