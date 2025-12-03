import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { fetchTransactions, createTransaction, updateTransaction, deleteTransaction } from '../api/transactionApi';
import { useAuth } from '../context/AuthContext';

export const useTransactions = () => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let socket;
    const init = async () => {
      try {
        setLoading(true);
        const data = await fetchTransactions();
        setItems(data);
      } catch (err) {
        setError(err.message || 'Error');
      } finally {
        setLoading(false);
      }

      socket = io('http://localhost:4000');
      if (user?.id) socket.emit('auth:join', user.id);

      socket.on('transaction:created', (t) => setItems((prev) => [t, ...prev]));
      socket.on('transaction:updated', (t) =>
        setItems((prev) => prev.map((p) => (p.id === t.id ? t : p)))
      );
      socket.on('transaction:deleted', ({ id }) =>
        setItems((prev) => prev.filter((p) => p.id !== id))
      );

      return () => socket && socket.disconnect();
    };

    init();

    return () => {};
  }, [user]);

  // ✅ Refactor addItem ให้ auto เติม userId และแปลง date เป็น ISO string
  const addItem = async (payload) => {
    try {
      const created = await createTransaction({
        ...payload,
        userId: user?.id, // auto เติม userId
        date: new Date(payload.date).toISOString(), // แปลง date เป็น ISO string
      });
      setItems((prev) => [created, ...prev]);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const editItem = async (id, payload) => {
    try {
      const updated = await updateTransaction(id, {
        ...payload,
        userId: user?.id,
        date: new Date(payload.date).toISOString(),
      });
      setItems((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const removeItem = async (id) => {
    try {
      await deleteTransaction(id);
      setItems((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return { items, loading, error, addItem, editItem, removeItem };
};
