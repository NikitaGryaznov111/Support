import styles from './CheckboxAll.module.scss';
interface IProps {
  handleCheckboxAll: () => void;
  text: string;
}
const CheckboxAll = ({ handleCheckboxAll, text }: IProps) => {
  return (
    <div className={styles.checkboxAll}>
      <input type="checkbox" id="checkbox" onChange={handleCheckboxAll} />
      <label htmlFor="checkbox">{text}</label>
    </div>
  );
};

export default CheckboxAll;
