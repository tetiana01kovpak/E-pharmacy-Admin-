import { Link } from 'react-router-dom';
import styles from './Logo.module.css';

export default function Logo({ withText = true }) {
  return (
    <Link to="/dashboard" className={styles.logo} aria-label="E-Pharmacy home">
      <span className={styles.mark}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M12 5c-3.6 0-6.5 3-6.5 6.8 0 4.8 6.5 10.6 6.5 10.6s6.5-5.8 6.5-10.6C18.5 8 15.6 5 12 5Z"
            fill="#fff"
            opacity="0.95"
          />
          <path d="M12 9v6M9 12h6" stroke="#59B17A" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </span>
      {withText && <span className={styles.wordmark}>E-Pharmacy</span>}
    </Link>
  );
}
