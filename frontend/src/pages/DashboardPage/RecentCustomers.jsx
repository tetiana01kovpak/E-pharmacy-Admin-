import Avatar from '../../components/Avatar/Avatar.jsx';
import { formatCurrency } from '../../utils/formatters.js';
import styles from './DashboardCard.module.css';

export default function RecentCustomers({ customers = [] }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>Recent Customers</div>
      <div className={styles.list}>
        {customers.length === 0 && <div className={styles.row}>No customers yet</div>}
        {customers.map((customer) => (
          <div key={customer._id} className={styles.row}>
            <div className={styles.person}>
              <Avatar name={customer.name} size={36} />
              <span className={styles.personName}>{customer.name}</span>
            </div>
            <span className={styles.email}>{customer.email}</span>
            <span className={styles.amount}>{formatCurrency(customer.totalSpent)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
