import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo.jsx';
import Icon from '../Icon/Icon.jsx';
import styles from './Header.module.css';

export default function Header({ userEmail, onMenuToggle, onLogout }) {
  return (
    <header className={styles.header}>
      <button
        type="button"
        className={styles.burgerBtn}
        onClick={onMenuToggle}
        aria-label="Toggle menu"
      >
        <Icon name="menu" size={22} />
      </button>

      <Logo />

      <div className={styles.titles}>
        <h1 className={styles.appTitle}>Medicine Store</h1>
      </div>

      <div className={styles.crumbs}>
        <Link to="/dashboard">Dashboard</Link>
        {userEmail && (
          <>
            <span className={styles.divider} />
            <span>{userEmail}</span>
          </>
        )}
      </div>

      <div className={styles.spacer} />

      <button type="button" className={styles.logoutBtn} onClick={onLogout} aria-label="Log out">
        <Icon name="logout" size={16} />
      </button>
    </header>
  );
}
