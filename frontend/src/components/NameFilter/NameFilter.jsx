import { useState } from 'react';
import Icon from '../Icon/Icon.jsx';
import styles from './NameFilter.module.css';

export default function NameFilter({ placeholder, onFilter }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(value.trim());
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} role="search">
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        aria-label={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit" className={styles.filterBtn}>
        <Icon name="filter" size={16} />
        Filter
      </button>
    </form>
  );
}
