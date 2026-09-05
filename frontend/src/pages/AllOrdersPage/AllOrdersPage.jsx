import { useState } from 'react';
import { useGetOrdersQuery } from '../../app/api.js';
import Loader from '../../components/Loader/Loader.jsx';
import NameFilter from '../../components/NameFilter/NameFilter.jsx';
import OrdersTable from './OrdersTable.jsx';
import styles from './AllOrdersPage.module.css';

export default function AllOrdersPage() {
  const [name, setName] = useState('');
  const { data, isLoading, isError } = useGetOrdersQuery({ name: name || undefined });

  return (
    <div>
      <h2 className={styles.pageTitle}>All orders</h2>
      <NameFilter placeholder="User Name" onFilter={setName} />
      {isLoading && <Loader />}
      {isError && <p>Failed to load orders.</p>}
      {!isLoading && !isError && <OrdersTable orders={data?.orders} />}
    </div>
  );
}
