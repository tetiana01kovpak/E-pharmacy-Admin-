import { NavLink } from 'react-router-dom';
import Icon from '../Icon/Icon.jsx';
import styles from './Sidebar.module.css';

const MENU_ITEMS = [
  { to: '/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { to: '/orders', label: 'Orders', icon: 'cart' },
  { to: '/products', label: 'Products', icon: 'flask' },
  { to: '/suppliers', label: 'Suppliers', icon: 'pharmacy' },
  { to: '/customers', label: 'Customers', icon: 'users' },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && <div className={styles.overlay} onClick={onClose} />}
      <aside className={[styles.sidebar, isOpen && styles.sidebarOpen].filter(Boolean).join(' ')}>
        <nav className={styles.menu} aria-label="Main navigation">
          {MENU_ITEMS.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                [styles.iconBtn, isActive && styles.active].filter(Boolean).join(' ')
              }
              aria-label={label}
              title={label}
            >
              <Icon name={icon} size={16} />
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}
