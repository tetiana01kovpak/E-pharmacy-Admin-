import { useState } from 'react';
import {
  useGetProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} from '../../app/api.js';
import Loader from '../../components/Loader/Loader.jsx';
import Icon from '../../components/Icon/Icon.jsx';
import NameFilter from '../../components/NameFilter/NameFilter.jsx';
import ProductsTable from './ProductsTable.jsx';
import ProductFormModal from './ProductFormModal.jsx';
import styles from './AllProductsPage.module.css';

export default function AllProductsPage() {
  const [name, setName] = useState('');
  const [modalMode, setModalMode] = useState(null); // 'add' | 'edit' | null
  const [activeProduct, setActiveProduct] = useState(null);

  const { data, isLoading, isError } = useGetProductsQuery({ name: name || undefined });
  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const categories = data?.categories || [];

  const closeModal = () => {
    setModalMode(null);
    setActiveProduct(null);
  };

  const handleAdd = async (values) => {
    await addProduct(values).unwrap();
    closeModal();
  };

  const handleEdit = async (values) => {
    await updateProduct({ id: activeProduct._id, ...values }).unwrap();
    closeModal();
  };

  const handleDelete = (product) => {
    deleteProduct(product._id);
  };

  return (
    <div>
      <div className={styles.headerRow}>
        <h2 className={styles.pageTitle}>All products</h2>
        <button type="button" className={styles.addBtn} onClick={() => setModalMode('add')}>
          <Icon name="plus" size={16} />
          Add a new product
        </button>
      </div>

      <NameFilter placeholder="Product Name" onFilter={setName} />

      {isLoading && <Loader />}
      {isError && <p>Failed to load products.</p>}
      {!isLoading && !isError && (
        <ProductsTable
          products={data?.products}
          onEdit={(product) => {
            setActiveProduct(product);
            setModalMode('edit');
          }}
          onDelete={handleDelete}
        />
      )}

      {modalMode === 'add' && (
        <ProductFormModal mode="add" categories={categories} onSubmit={handleAdd} onClose={closeModal} />
      )}
      {modalMode === 'edit' && activeProduct && (
        <ProductFormModal
          mode="edit"
          product={activeProduct}
          categories={categories}
          onSubmit={handleEdit}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
