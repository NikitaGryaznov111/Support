import { FC } from 'react';
type Props = {
  children: string;
  onClick?: () => any;
};
const Button: FC<Props> = ({ children }) => {
  return <button type="button">{children}</button>;
};

export default Button;
