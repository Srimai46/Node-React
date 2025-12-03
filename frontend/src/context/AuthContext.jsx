import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  // sync token กับ localStorage ทุกครั้งที่เปลี่ยนค่า
  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // ฟังก์ชัน login → เก็บ user และ token
  const login = ({ user, token }) => {
    setUser(user);
    setToken(token);
    navigate('/dashboard'); // ✅ หลัง login → ไปหน้า Dashboard
  };

  // ฟังก์ชัน logout → เคลียร์ user และ token
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
    navigate('/login'); // ✅ หลัง logout → ไปหน้า Login
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// hook สำหรับเรียกใช้งาน context
export const useAuth = () => useContext(AuthContext);
