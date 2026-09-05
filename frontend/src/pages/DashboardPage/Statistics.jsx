import Icon from '../../components/Icon/Icon.jsx';
import styles from './Statistics.module.css';

const CARDS = [
  { key: 'allProducts', label: 'All products', icon: 'flask', highlight: true },
  { key: 'allSuppliers', label: 'All suppliers', icon: 'pharmacy' },
  { key: 'allCustomers', label: 'All customers', icon: 'users' },
];

export default function Statistics({ stats }) {
  return (
    <div className={styles.grid}>
      {CARDS.map(({ key, label, icon, highlight }) => (
        <div key={key} className={[styles.card, highlight && styles.highlight].filter(Boolean).join(' ')}>
          <span className={styles.label}>
            <Icon name={icon} size={16} />
            {label}
          </span>
          <span className={styles.value}>{stats?.[key] ?? 0}</span>
        </div>
      ))}
    </div>
  );
}
