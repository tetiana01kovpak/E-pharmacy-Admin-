import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx';
import { formatSignedCurrency } from '../../utils/formatters.js';
import styles from './DashboardCard.module.css';

export default function IncomeExpenses({ transactions = [] }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>Income/Expenses</div>
      <div className={styles.list}>
        {transactions.length === 0 && <div className={styles.row}>No transactions yet</div>}
        {transactions.map((tx) => (
          <div key={tx._id} className={styles.row}>
            <StatusBadge status={tx.type} label={tx.type === 'income' ? 'Income' : 'Expense'} />
            <span className={styles.email}>{tx.title}{tx.email ? ` · ${tx.email}` : ''}</span>
            <span
              className={styles.amount}
              style={{ color: tx.type === 'income' ? 'var(--color-primary)' : 'var(--color-error)' }}
            >
              {formatSignedCurrency(tx.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
