import styles from './Button.module.css';

export default function Button({
  variant = 'primary',
  type = 'button',
  className,
  children,
  ...rest
}) {
  return (
    <button
      type={type}
      className={[styles.btn, styles[variant], className].filter(Boolean).join(' ')}
      {...rest}
    >
      {children}
    </button>
  );
}
