import Avatar from '../../components/Avatar/Avatar.jsx';
import Icon from '../../components/Icon/Icon.jsx';
import { formatDate } from '../../utils/formatters.js';
import tableStyles from '../../styles/table.module.css';

export default function CustomersTable({ customers = [], onView }) {
  if (customers.length === 0) {
    return <div className={[tableStyles.card, tableStyles.empty].join(' ')}>No customers found.</div>;
  }

  return (
    <div className={tableStyles.card}>
      <div className={tableStyles.scroll}>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>User Info</th>
              <th>Email</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Register date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer._id}>
                <td>
                  <div className={tableStyles.userCell}>
                    <Avatar name={customer.name} size={32} />
                    <span className={tableStyles.userName}>{customer.name}</span>
                  </div>
                </td>
                <td>{customer.email}</td>
                <td>{customer.address}</td>
                <td>{customer.phone}</td>
                <td>{formatDate(customer.registerDate)}</td>
                <td>
                  <div className={tableStyles.actions}>
                    <button
                      type="button"
                      className={tableStyles.actionBtn}
                      onClick={() => onView(customer)}
                      aria-label={`View ${customer.name}`}
                    >
                      <Icon name="eye" size={16} />
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
