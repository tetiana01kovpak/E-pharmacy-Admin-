import Icon from '../../components/Icon/Icon.jsx';
import { formatCurrency } from '../../utils/formatters.js';
import tableStyles from '../../styles/table.module.css';

export default function ProductsTable({ products = [], onEdit, onDelete }) {
  if (products.length === 0) {
    return <div className={[tableStyles.card, tableStyles.empty].join(' ')}>No products found.</div>;
  }

  return (
    <div className={tableStyles.card}>
      <div className={tableStyles.scroll}>
        <table className={tableStyles.table}>
          <thead>
            <tr>
              <th>Product Info</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Suppliers</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.stock}</td>
                <td>{product.suppliers?.join(', ') || '—'}</td>
                <td>${formatCurrency(product.price)}</td>
                <td>
                  <div className={tableStyles.actions}>
                    <button
                      type="button"
                      className={tableStyles.actionBtn}
                      onClick={() => onEdit(product)}
                      aria-label={`Edit ${product.name}`}
                    >
                      <Icon name="edit" size={16} />
                    </button>
                    <button
                      type="button"
                      className={[tableStyles.actionBtn, tableStyles.danger].join(' ')}
                      onClick={() => onDelete(product)}
                      aria-label={`Delete ${product.name}`}
                    >
                      <Icon name="trash" size={16} />
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
