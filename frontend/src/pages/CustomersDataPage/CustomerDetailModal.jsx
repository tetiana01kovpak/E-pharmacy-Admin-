import { useGetCustomerByIdQuery } from '../../app/api.js';
import Modal from '../../components/Modal/Modal.jsx';
import Loader from '../../components/Loader/Loader.jsx';
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx';
import { formatCurrency, formatDate } from '../../utils/formatters.js';
import styles from './CustomerDetailModal.module.css';

export default function CustomerDetailModal({ customerId, onClose }) {
  const { data, isLoading, isError } = useGetCustomerByIdQuery(customerId);

  return (
    <Modal title="Customer Details" onClose={onClose}>
      {isLoading && <Loader />}
      {isError && <p className={styles.empty}>Failed to load customer.</p>}
      {data && (
        <>
          <div className={styles.info}>
            <span className={styles.name}>{data.customer.name}</span>
            <span>{data.customer.email}</span>
            <span>{data.customer.address}</span>
            <span>{data.customer.phone}</span>
            <span>Registered {formatDate(data.customer.registerDate)}</span>
            <span>Total spent: ${formatCurrency(data.customer.totalSpent)}</span>
          </div>

          <h3 className={styles.historyTitle}>Order history</h3>
          {data.history.length === 0 ? (
            <p className={styles.empty}>No orders yet.</p>
          ) : (
            <div className={styles.historyList}>
              {data.history.map((order) => (
                <div key={order._id} className={styles.historyRow}>
                  <span>{formatDate(order.orderDate)}</span>
                  <span>${formatCurrency(order.price)}</span>
                  <StatusBadge status={order.status} />
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </Modal>
  );
}
