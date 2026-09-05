import { useState } from 'react';
import {
  useGetSuppliersQuery,
  useAddSupplierMutation,
  useUpdateSupplierMutation,
} from '../../app/api.js';
import Loader from '../../components/Loader/Loader.jsx';
import Icon from '../../components/Icon/Icon.jsx';
import NameFilter from '../../components/NameFilter/NameFilter.jsx';
import SuppliersTable from './SuppliersTable.jsx';
import SupplierFormModal from './SupplierFormModal.jsx';
import styles from '../AllProductsPage/AllProductsPage.module.css';

export default function AllSuppliersPage() {
  const [name, setName] = useState('');
  const [modalMode, setModalMode] = useState(null);
  const [activeSupplier, setActiveSupplier] = useState(null);

  const { data, isLoading, isError } = useGetSuppliersQuery({ name: name || undefined });
  const [addSupplier] = useAddSupplierMutation();
  const [updateSupplier] = useUpdateSupplierMutation();

  const closeModal = () => {
    setModalMode(null);
    setActiveSupplier(null);
  };

  const handleAdd = async (values) => {
    await addSupplier(values).unwrap();
    closeModal();
  };

  const handleEdit = async (values) => {
    await updateSupplier({ id: activeSupplier._id, ...values }).unwrap();
    closeModal();
  };

  return (
    <div>
      <div className={styles.headerRow}>
        <h2 className={styles.pageTitle}>All suppliers</h2>
        <button type="button" className={styles.addBtn} onClick={() => setModalMode('add')}>
          <Icon name="plus" size={16} />
          Add a new supplier
        </button>
      </div>

      <NameFilter placeholder="User Name" onFilter={setName} />

      {isLoading && <Loader />}
      {isError && <p>Failed to load suppliers.</p>}
      {!isLoading && !isError && (
        <SuppliersTable
          suppliers={data?.suppliers}
          onEdit={(supplier) => {
            setActiveSupplier(supplier);
            setModalMode('edit');
          }}
        />
      )}

      {modalMode === 'add' && <SupplierFormModal mode="add" onSubmit={handleAdd} onClose={closeModal} />}
      {modalMode === 'edit' && activeSupplier && (
        <SupplierFormModal mode="edit" supplier={activeSupplier} onSubmit={handleEdit} onClose={closeModal} />
      )}
    </div>
  );
}
