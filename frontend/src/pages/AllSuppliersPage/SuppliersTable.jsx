import Icon from '../../components/Icon/Icon.jsx';
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx';
import { formatCurrency, formatDate } from '../../utils/formatters.js';
import tableStyles from '../../styles/table.module.css';

export default function SuppliersTable({ suppliers = [], onEdit }) {
  if (suppliers.length === 0) {
    return <div className={[tableStyles.card, tableStyles.empty].join(' ')}>No suppliers found.</div>;
  }

  return (
    <div className={tableStyles.card}>
      <div className={tableStyles.scroll}>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Suppliers Info</th>
              <th>Address</th>
              <th>Company</th>
              <th>Delivery date</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier._id}>
                <td>{supplier.name}</td>
                <td>{supplier.address}</td>
                <td>{supplier.company}</td>
                <td>{formatDate(supplier.deliveryDate)}</td>
                <td>${formatCurrency(supplier.amount)}</td>
                <td>
                  <StatusBadge status={supplier.status} />
                </td>
                <td>
                  <div className={tableStyles.actions}>
                    <button
                      type="button"
                      className={tableStyles.actionBtn}
                      onClick={() => onEdit(supplier)}
                      aria-label={`Edit ${supplier.name}`}
                    >
                      <Icon name="edit" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
