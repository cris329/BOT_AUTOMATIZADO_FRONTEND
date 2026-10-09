/**
 * Auth de la app (JWE) con forma usable por el Layout CDATTG.
 *
 * @author Cristian Deysdayr Jiménez
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { apiService } from '../services/api';

type User = { id: number; email: string; full_name: string; rol: string };

type AuthCtx = {
  user: User | null;
  loading: boolean;
  roles: string[];
  permissions: string[];
  hasPermission: (p: string) => boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem('sc_token')) {
      setLoading(false);
      return;
    }
    apiService
      .yo()
      .then((u) => setUser({ id: u.id, email: u.email, full_name: u.nombre, rol: u.rol }))
      .catch(() => localStorage.removeItem('sc_token'))
      .finally(() => setLoading(false));
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const token = await apiService.entrar(email, password);
    localStorage.setItem('sc_token', token);
    const u = await apiService.yo();
    setUser({ id: u.id, email: u.email, full_name: u.nombre, rol: u.rol });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('sc_token');
    setUser(null);
  }, []);

  const value = useMemo<AuthCtx>(
    () => ({
      user,
      loading,
      roles: user ? [user.rol] : [],
      permissions: [],
      hasPermission: () => true,
      login,
      logout,
    }),
    [user, loading, login, logout],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth(): AuthCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error('useAuth fuera de AuthProvider');
  return v;
}
