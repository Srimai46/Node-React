import { useState } from 'react';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [mode, setMode] = useState('login');
  const [error, setError] = useState(null);

  const submit = async () => {
    try {
      setError(null);
      const path = mode === 'login' ? '/auth/login' : '/auth/register';
      const { data } = await axiosClient.post(path, form);
      login(data);
      navigate('/dashboard'); // ✅ redirect หลัง login/register
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{ display: 'grid', placeItems: 'center', height: '100%' }}>
      <div style={{ display: 'grid', gap: 12, width: 320 }}>
        <h3>{mode === 'login' ? 'Login' : 'Register'}</h3>
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button onClick={submit}>{mode === 'login' ? 'Login' : 'Register'}</button>
        <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}>
          Switch to {mode === 'login' ? 'Register' : 'Login'}
        </button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>
    </div>
  );
}
