/**
 * Login premium neomorfo (claro/oscuro).
 * Lo hice con marca elevada y campos hundidos para sensación de producto serio.
 *
 * @author Cristian Deysdayr Jiménez
 */

import { useState, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { complementariosPaths } from '../routes/paths';
import { axiosErrorMessage } from '../utils/httpError';

export function LoginPage() {
  const { user, login, loading } = useAuth();
  const [email, setEmail] = useState('admin@example.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  if (!loading && user) {
    return <Navigate to={complementariosPaths.consultarRegistro} replace />;
  }

  /** Envío credenciales al API y muestro error legible. */
  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    try {
      await login(email.trim(), password);
    } catch (err) {
      setError(axiosErrorMessage(err, 'credenciales invalidas'));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="neo-app flex items-center justify-center p-4">
      <form onSubmit={onSubmit} className="card w-full max-w-md space-y-5">
        <div className="text-center">
          <div className="brand-mark" aria-hidden>
            BA
          </div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--ink)' }}>
            Bot Automatizado
          </h1>
          <p className="page-lead">Consulta Sofía · acceso seguro</p>
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium page-muted" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            className="input-field"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium page-muted" htmlFor="pass">
            Contraseña
          </label>
          <input
            id="pass"
            className="input-field"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
            autoComplete="current-password"
          />
        </div>

        {error ? (
          <p className="text-sm font-medium" style={{ color: 'var(--danger)' }}>
            {error}
          </p>
        ) : null}

        <button type="submit" className="btn-primary w-full" disabled={busy}>
          {busy ? 'Entrando…' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}
