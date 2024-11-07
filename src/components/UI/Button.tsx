import { FC } from 'react';
type ComponentProps = {
  children: string;
};
const Button: FC<ComponentProps> = ({ children }) => {
  return <button type="button">{children}</button>;
};

export default Button;
