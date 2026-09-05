import { useGetDashboardQuery } from '../../app/api.js';
import Loader from '../../components/Loader/Loader.jsx';
import Statistics from './Statistics.jsx';
import RecentCustomers from './RecentCustomers.jsx';
import IncomeExpenses from './IncomeExpenses.jsx';
import styles from './DashboardPage.module.css';

export default function DashboardPage() {
  const { data, isLoading, isError } = useGetDashboardQuery();

  if (isLoading) return <Loader />;
  if (isError) return <p>Failed to load dashboard data.</p>;

  return (
    <div>
      <h2 className={styles.pageTitle}>Dashboard</h2>
      <Statistics stats={data?.stats} />
      <div className={styles.panels}>
        <RecentCustomers customers={data?.recentCustomers} />
        <IncomeExpenses transactions={data?.incomeExpenses} />
      </div>
    </div>
  );
}
