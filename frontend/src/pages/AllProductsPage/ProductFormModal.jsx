import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from '../../components/Modal/Modal.jsx';
import Button from '../../components/Button/Button.jsx';
import FormField from '../../components/FormField/FormField.jsx';
import styles from './ProductFormModal.module.css';

const schema = yup.object({
  name: yup.string().trim().required('Product name is required'),
  category: yup.string().required('Category is required'),
  stock: yup.number().typeError('Stock must be a number').min(0).required('Stock is required'),
  suppliers: yup.string(),
  price: yup.number().typeError('Price must be a number').min(0).required('Price is required'),
});

export default function ProductFormModal({ mode = 'add', product, categories = [], onSubmit, onClose }) {
  const isEdit = mode === 'edit';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: product?.name || '',
      category: product?.category || categories[0] || '',
      stock: product?.stock ?? '',
      suppliers: product?.suppliers?.join(', ') || '',
      price: product?.price ?? '',
    },
  });

  const submitHandler = async (values) => {
    await onSubmit({
      name: values.name,
      category: values.category,
      stock: Number(values.stock),
      price: Number(values.price),
      suppliers: values.suppliers
        ? values.suppliers.split(',').map((s) => s.trim()).filter(Boolean)
        : [],
    });
  };

  return (
    <Modal title={isEdit ? 'Edit Product Data' : 'Add New Product'} onClose={onClose}>
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)} noValidate>
        <FormField label="Product Info" error={errors.name?.message} {...register('name')} />

        <select className={styles.select} {...register('category')}>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        {errors.category && <span className={styles.errorText}>{errors.category.message}</span>}

        <FormField
          label="Stock"
          type="number"
          error={errors.stock?.message}
          {...register('stock')}
        />
        <FormField label="Suppliers (comma separated)" error={errors.suppliers?.message} {...register('suppliers')} />
        <FormField
          label="Price"
          type="number"
          step="0.01"
          error={errors.price?.message}
          {...register('price')}
        />

        <div className={styles.actions}>
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" disabled={isSubmitting}>
            {isEdit ? 'Save' : 'Add'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
