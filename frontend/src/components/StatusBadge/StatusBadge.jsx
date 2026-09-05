import styles from './StatusBadge.module.css';

const TONE_MAP = {
  Delivered: 'green',
  Paid: 'green',
  income: 'green',
  Pending: 'neutral',
  Cancelled: 'red',
  expense: 'red',
};

export default function StatusBadge({ status, label }) {
  const tone = TONE_MAP[status] || 'neutral';
  return <span className={[styles.badge, styles[tone]].join(' ')}>{label ?? status}</span>;
}
