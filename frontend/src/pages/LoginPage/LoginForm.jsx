import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useLoginMutation } from '../../app/api.js';
import { credentialsSet } from '../../app/authSlice.js';
import FormField from '../../components/FormField/FormField.jsx';
import styles from './LoginForm.module.css';

const schema = yup.object({
  email: yup.string().trim().email('Enter a valid email').required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: yupResolver(schema), mode: 'onBlur' });

  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    try {
      const result = await login(values).unwrap();
      dispatch(credentialsSet(result));
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError('root', {
        message: err?.data?.message || 'Invalid email or password',
      });
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <FormField
        label="Email"
        icon="mail"
        type="email"
        error={errors.email?.message}
        {...register('email')}
      />
      <FormField
        label="Password"
        icon="lock"
        type="password"
        error={errors.password?.message}
        {...register('password')}
      />
      {errors.root && <p className={styles.formError}>{errors.root.message}</p>}
      <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
        {isSubmitting ? 'Logging in…' : 'Log In Now'}
      </button>
    </form>
  );
}
