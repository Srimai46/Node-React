import { useTransactions } from '../hooks/useTransactions';
import TransactionTable from '../components/TransactionTable';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function DashboardPage() {
  const { items, loading, error, addItem, editItem, removeItem } = useTransactions();
  const { user, logout } = useAuth();   // ✅ ดึง user ออกมาด้วย
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div style={{ display: 'grid', gap: 16 }}>
      <h3>Dashboard</h3>
      <button onClick={handleLogout} style={{ justifySelf: 'start' }}>
        Logout
      </button>
      <TransactionTable
        items={items}
        onCreate={addItem}
        onUpdate={editItem}
        onDelete={removeItem}
        user={user}   // ✅ ตอนนี้ user ถูกส่งลงไปแล้ว
      />
    </div>
  );
}
