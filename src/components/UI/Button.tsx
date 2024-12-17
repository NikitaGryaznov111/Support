import { FC } from 'react';
type Props = {
  children: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  // ref?: HTMLButtonElement;
};
const Button: FC<Props> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} type="button">
      {children}
    </button>
  );
};

export default Button;
