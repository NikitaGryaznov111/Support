import { FC } from 'react';
import styles from './Form.module.scss';
import { TypePropsForm } from '../../../utils/types';
const Form: FC<TypePropsForm> = ({
  formAction,
  defaultValueName,
  defaultValueDescription,
  text,
}) => {
  return (
    <form className={styles.form} action={formAction}>
      <label className={styles.label} htmlFor="task">
        Название задачи:
      </label>
      <input
        className={styles.input}
        type="text"
        name="taskName"
        placeholder="Name task..."
        defaultValue={defaultValueName}
      />
      <label className={styles.label} htmlFor="description">
        Описание задачи:
      </label>
      <input
        className={styles.input}
        type="text"
        name="description"
        placeholder="Task description..."
        defaultValue={defaultValueDescription}
      />
      <button className={styles.button} type="submit">
        {text}
      </button>
    </form>
  );
};

export default Form;
