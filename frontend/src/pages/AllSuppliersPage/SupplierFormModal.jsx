import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Modal from '../../components/Modal/Modal.jsx';
import Button from '../../components/Button/Button.jsx';
import FormField from '../../components/FormField/FormField.jsx';
import styles from '../AllProductsPage/ProductFormModal.module.css';

const STATUSES = ['Pending', 'Paid', 'Cancelled'];

const schema = yup.object({
  name: yup.string().trim().required('Supplier info is required'),
  address: yup.string().trim().required('Address is required'),
  company: yup.string().trim().required('Company is required'),
  deliveryDate: yup.string().required('Delivery date is required'),
  amount: yup.number().typeError('Amount must be a number').min(0).required('Amount is required'),
  status: yup.string().required('Status is required'),
});

function toDateInputValue(date) {
  if (!date) return '';
  return new Date(date).toISOString().slice(0, 10);
}

export default function SupplierFormModal({ mode = 'add', supplier, onSubmit, onClose }) {
  const isEdit = mode === 'edit';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: supplier?.name || '',
      address: supplier?.address || '',
      company: supplier?.company || '',
      deliveryDate: toDateInputValue(supplier?.deliveryDate) || toDateInputValue(new Date()),
      amount: supplier?.amount ?? '',
      status: supplier?.status || 'Pending',
    },
  });

  const submitHandler = async (values) => {
    await onSubmit({ ...values, amount: Number(values.amount) });
  };

  return (
    <Modal title={isEdit ? 'Edit Supplier Data' : 'Add New Supplier'} onClose={onClose}>
      <form className={styles.form} onSubmit={handleSubmit(submitHandler)} noValidate>
        <FormField label="Suppliers Info" error={errors.name?.message} {...register('name')} />
        <FormField label="Address" error={errors.address?.message} {...register('address')} />
        <FormField label="Company" error={errors.company?.message} {...register('company')} />
        <FormField
          label="Delivery date"
          type="date"
          error={errors.deliveryDate?.message}
          {...register('deliveryDate')}
        />
        <FormField
          label="Amount"
          type="number"
          step="0.01"
          error={errors.amount?.message}
          {...register('amount')}
        />

        <select className={styles.select} {...register('status')}>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        {errors.status && <span className={styles.errorText}>{errors.status.message}</span>}

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
