/**
 * Shell neomorfo: header, sidebar FPI, miga y toggle de tema.
 *
 * @author Cristian Deysdayr Jiménez
 */

import {
  Bars3Icon,
  ChevronDownIcon,
  IdentificationIcon,
  MoonIcon,
  SunIcon,
} from '@heroicons/react/24/outline';
import { useState, type ReactNode } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { complementariosPaths } from '../routes/paths';

const FPI = [
  { path: complementariosPaths.betowa, label: 'Complementarios (Betowa)' },
  { path: complementariosPaths.consultarRegistro, label: 'Sofía · Fase 1 · Consultar Registro' },
  { path: complementariosPaths.inscripciones, label: 'Sofía · Fase 2 · Programas' },
];

const crumb: Record<string, string[]> = {
  [complementariosPaths.betowa]: ['Inicio', 'Complementarios', 'Betowa'],
  [complementariosPaths.consultarRegistro]: ['Inicio', 'Complementarios', 'Fase 1'],
  [complementariosPaths.inscripciones]: ['Inicio', 'Complementarios', 'Fase 2'],
};

export function Layout({ children }: { children: ReactNode }) {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [fpiOpen, setFpiOpen] = useState(true);
  const rolesLine = user?.rol?.includes('SUPER') ? 'SUPER' : 'F. COMP';
  const crumbs = crumb[pathname] ?? ['Inicio', 'Complementarios'];

  return (
    <div className="neo-app">
      <nav className="nav-shell sticky top-0 z-30">
        <div className="flex h-14 items-center justify-between px-3 sm:px-4">
          <button type="button" className="icon-btn md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menú">
            <Bars3Icon className="h-5 w-5" />
          </button>
          <Link to={complementariosPaths.consultarRegistro} className="hidden text-sm font-bold tracking-tight md:block" style={{ color: 'var(--ink)' }}>
            Bot Automatizado
          </Link>
          <div className="flex items-center gap-2">
            <button type="button" onClick={toggleTheme} className="icon-btn" aria-label="Tema">
              {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
            </button>
            <span className="chip text-xs uppercase tracking-wide">{rolesLine}</span>
            <button type="button" className="btn-secondary text-xs !py-2 !px-3" onClick={logout}>
              Salir
            </button>
          </div>
        </div>
      </nav>

      {open ? (
        <button type="button" className="fixed inset-0 z-40 md:hidden" style={{ background: 'var(--overlay)' }} aria-label="Cerrar" onClick={() => setOpen(false)} />
      ) : null}

      <div className="flex">
        <aside
          className={`aside-shell fixed inset-y-0 left-0 z-50 w-64 transform pt-16 transition md:static md:translate-x-0 md:pt-0 ${
            open ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="px-3 py-4">
            <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wider page-muted">Módulo FPI</p>
            <button
              type="button"
              onClick={() => setFpiOpen((v) => !v)}
              className="mb-1 flex w-full items-center justify-between rounded-xl px-2 py-2 text-xs font-semibold page-muted"
            >
              <span>Consultas</span>
              <ChevronDownIcon className={`h-4 w-4 transition ${fpiOpen ? '' : '-rotate-90'}`} />
            </button>
            {fpiOpen ? (
              <div className="space-y-1">
                {FPI.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) => `nav-item pl-[9px] ${isActive ? 'nav-item-active' : ''}`}
                  >
                    <IdentificationIcon className="h-5 w-5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            ) : null}
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-4 sm:p-6">
          <nav aria-label="Miga de pan" className="mb-5">
            <ol className="flex flex-wrap items-center gap-2 text-sm page-muted">
              {crumbs.map((c, i) => (
                <li key={c} className="inline-flex items-center gap-2">
                  {i !== 0 ? <span aria-hidden>/</span> : null}
                  <span className={i === crumbs.length - 1 ? 'font-semibold' : ''} style={i === crumbs.length - 1 ? { color: 'var(--ink)' } : undefined}>
                    {c}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
          {children}
        </main>
      </div>
    </div>
  );
}
