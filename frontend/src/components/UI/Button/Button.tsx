import { FC, RefObject } from 'react';
import styles from './Button.module.scss';
type Props = {
  children: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  ref?: RefObject<HTMLButtonElement | null>;
  type?: string;
  disabled?: boolean;
};
const Button: FC<Props> = ({ children, onClick, ref, type, disabled }) => {
  return (
    <button
      ref={ref}
      className={styles.button}
      onClick={onClick}
      type={type === 'submit' ? 'submit' : 'button'}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
