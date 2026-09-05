import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../Header/Header.jsx';
import Sidebar from '../Sidebar/Sidebar.jsx';
import { useGetUserInfoQuery, useLogoutMutation } from '../../app/api.js';
import { credentialsCleared, selectCurrentUser } from '../../app/authSlice.js';
import styles from './SharedLayout.module.css';

export default function SharedLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cachedUser = useSelector(selectCurrentUser);
  const { data: userInfo } = useGetUserInfoQuery();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
    } catch {
      // proceed with client-side logout regardless of network/server outcome
    } finally {
      dispatch(credentialsCleared());
      navigate('/login', { replace: true });
    }
  };

  const email = userInfo?.email || cachedUser?.email;

  return (
    <div className={styles.layout}>
      <Header
        userEmail={email}
        onMenuToggle={() => setIsMenuOpen((v) => !v)}
        onLogout={handleLogout}
      />
      <div className={styles.body}>
        <Sidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
