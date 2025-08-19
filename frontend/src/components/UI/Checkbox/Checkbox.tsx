import { useEffect, useState } from 'react';
import styles from './Checkbox.module.scss';

const Checkbox = ({ checkedAll }: { checkedAll: boolean }) => {
  const [checked, setChecked] = useState<boolean>(false);
  useEffect(() => {
    if (checkedAll) {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [checkedAll]);
  return (
    <input
      className={styles.checkbox}
      type="checkbox"
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

export default Checkbox;
