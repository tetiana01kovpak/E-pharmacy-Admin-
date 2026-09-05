import Avatar from '../../components/Avatar/Avatar.jsx';
import StatusBadge from '../../components/StatusBadge/StatusBadge.jsx';
import { formatCurrency, formatDate } from '../../utils/formatters.js';
import tableStyles from '../../styles/table.module.css';

export default function OrdersTable({ orders = [] }) {
  if (orders.length === 0) {
    return <div className={[tableStyles.card, tableStyles.empty].join(' ')}>No orders found.</div>;
  }

  return (
    <div className={tableStyles.card}>
      <div className={tableStyles.scroll}>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>User Info</th>
              <th>Address</th>
              <th>Products</th>
              <th>Order date</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <div className={tableStyles.userCell}>
                    <Avatar name={order.customerName} size={32} />
                    <div>
                      <div className={tableStyles.userName}>{order.customerName}</div>
                      <div className={tableStyles.userEmail}>{order.customerEmail}</div>
                    </div>
                  </div>
                </td>
                <td>{order.address}</td>
                <td>{order.products?.map((p) => `${p.name} ×${p.quantity}`).join(', ')}</td>
                <td>{formatDate(order.orderDate)}</td>
                <td>${formatCurrency(order.price)}</td>
                <td>
                  <StatusBadge status={order.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
