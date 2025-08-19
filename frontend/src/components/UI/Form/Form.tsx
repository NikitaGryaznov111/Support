import styles from './Form.module.scss';
import { TypePropsForm } from '../../../utils/types';
const Form = ({
  formAction,
  valueName,
  valueDescription,
  text,
  onChangeTaskName,
  onChangeDescription,
}: TypePropsForm) => {
  return (
    <form className={styles.form} onSubmit={formAction}>
      <label className={styles.label} htmlFor="taskName">
        Название задачи:
      </label>
      <input
        id="taskName"
        className={styles.input}
        type="text"
        name="taskName"
        placeholder="Name task..."
        value={valueName}
        onChange={onChangeTaskName}
        required
      />
      <label className={styles.label} htmlFor="description">
        Описание задачи:
      </label>
      <input
        id="description"
        className={styles.input}
        type="text"
        name="description"
        placeholder="Task description..."
        value={valueDescription}
        onChange={onChangeDescription}
      />
      <button className={styles.button} type="submit">
        {text}
      </button>
    </form>
  );
};

export default Form;
