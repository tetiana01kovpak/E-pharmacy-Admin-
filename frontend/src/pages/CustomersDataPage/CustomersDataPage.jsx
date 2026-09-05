import { useState } from 'react';
import { useGetCustomersQuery } from '../../app/api.js';
import Loader from '../../components/Loader/Loader.jsx';
import NameFilter from '../../components/NameFilter/NameFilter.jsx';
import Pagination from '../../components/Pagination/Pagination.jsx';
import CustomersTable from './CustomersTable.jsx';
import CustomerDetailModal from './CustomerDetailModal.jsx';
import styles from './CustomersDataPage.module.css';

export default function CustomersDataPage() {
  const [name, setName] = useState('');
  const [page, setPage] = useState(1);
  const [viewedCustomerId, setViewedCustomerId] = useState(null);

  const { data, isLoading, isError } = useGetCustomersQuery({ name: name || undefined, page, limit: 8 });

  const handleFilter = (value) => {
    setName(value);
    setPage(1);
  };

  return (
    <div>
      <h2 className={styles.pageTitle}>Customers Data</h2>
      <NameFilter placeholder="User Name" onFilter={handleFilter} />

      {isLoading && <Loader />}
      {isError && <p>Failed to load customers.</p>}
      {!isLoading && !isError && (
        <>
          <CustomersTable customers={data?.customers} onView={(c) => setViewedCustomerId(c._id)} />
          <Pagination page={data?.page || 1} pages={data?.pages || 1} onChange={setPage} />
        </>
      )}

      {viewedCustomerId && (
        <CustomerDetailModal customerId={viewedCustomerId} onClose={() => setViewedCustomerId(null)} />
      )}
    </div>
  );
}
