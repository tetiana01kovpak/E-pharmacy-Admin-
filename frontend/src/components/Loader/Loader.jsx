import styles from './Loader.module.css';

export default function Loader() {
  return (
    <div className={styles.wrap} role="status" aria-label="Loading">
      <span className={styles.spinner} />
    </div>
  );
}
