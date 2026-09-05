import { forwardRef, useState } from 'react';
import Icon from '../Icon/Icon.jsx';
import styles from './FormField.module.css';

const FormField = forwardRef(function FormField(
  { label, icon, error, type = 'text', className, ...rest },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={[styles.field, className].filter(Boolean).join(' ')}>
      <div className={styles.inputWrap}>
        {icon && (
          <span className={styles.leadingIcon}>
            <Icon name={icon} size={16} />
          </span>
        )}
        <input
          ref={ref}
          type={inputType}
          placeholder={label}
          aria-label={label}
          className={[
            styles.input,
            icon && styles.hasIcon,
            isPassword && styles.hasTrailing,
            error && styles.error,
          ]
            .filter(Boolean)
            .join(' ')}
          {...rest}
        />
        {isPassword && (
          <button
            type="button"
            className={styles.trailingBtn}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <Icon name={showPassword ? 'eye-off' : 'eye'} size={16} />
          </button>
        )}
      </div>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
});

export default FormField;
