import { FC } from 'react';
import styles from './CheckboxAll.module.scss';
interface ICheckboxAllProps {
  handleCheckboxAll: () => void;
}
const CheckboxAll: FC<ICheckboxAllProps> = ({ handleCheckboxAll }) => {
  return (
    <div className={styles.checkboxAll}>
      <input type="checkbox" id="checkbox" onChange={handleCheckboxAll} />
      <label htmlFor="checkbox">Выбрать все задачи</label>
    </div>
  );
};

export default CheckboxAll;
