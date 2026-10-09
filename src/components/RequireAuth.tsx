import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function RequireAuth() {
  const { user, loading } = useAuth();
  if (loading) return <p className="min-h-screen bg-gray-900 text-gray-400 p-8">Cargando…</p>;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
