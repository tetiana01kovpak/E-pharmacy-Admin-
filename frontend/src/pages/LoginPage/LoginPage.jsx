import Logo from '../../components/Logo/Logo.jsx';
import LoginForm from './LoginForm.jsx';
import styles from './LoginPage.module.css';

export default function LoginPage() {
  return (
    <div className={styles.page}>
      <div className={styles.decor} aria-hidden="true" />
      <div className={styles.logoWrap}>
        <Logo />
      </div>
      <div className={styles.content}>
        <h1 className={styles.heading}>
          Your medication, delivered. Say goodbye to all your healthcare worries with us.
        </h1>
        <LoginForm />
      </div>
    </div>
  );
}
