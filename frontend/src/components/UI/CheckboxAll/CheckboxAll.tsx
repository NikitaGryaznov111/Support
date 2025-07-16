import { FC } from 'react';
import styles from './CheckboxAll.module.scss';
interface ICheckboxAllProps {
  handleCheckboxAll: () => void;
  text: string;
}
const CheckboxAll: FC<ICheckboxAllProps> = ({ handleCheckboxAll, text }) => {
  return (
    <div className={styles.checkboxAll}>
      <input type="checkbox" id="checkbox" onChange={handleCheckboxAll} />
      <label htmlFor="checkbox">{text}</label>
    </div>
  );
};

export default CheckboxAll;
