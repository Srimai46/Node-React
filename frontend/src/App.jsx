import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>   {/* ✅ อยู่ใน BrowserRouter */}
        <Routes>
  <Route path="/" element={<LoginPage />} />        {/* ✅ หน้าแรก */}
  <Route path="/login" element={<LoginPage />} />   {/* สำรอง */}
  <Route path="/dashboard" element={<DashboardPage />} />
</Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
