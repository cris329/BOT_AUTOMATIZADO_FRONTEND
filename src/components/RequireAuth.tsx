/**
 * Protejo rutas: solo entran usuarios con sesión.
 *
 * @author Cristian Deysdayr Jiménez
 */

import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function RequireAuth() {
  const { user, loading } = useAuth();
  if (loading) {
    return <p className="neo-app flex items-center justify-center p-8 page-muted">Cargando…</p>;
  }
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
