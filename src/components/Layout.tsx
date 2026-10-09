/**
 * Layout CDATTG (header + sidebar FPI + breadcrumb + tema).
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
  [complementariosPaths.consultarRegistro]: ['Inicio', 'Complementarios', 'Fase 1 - Consultar Registro'],
  [complementariosPaths.inscripciones]: ['Inicio', 'Complementarios', 'Fase 2 - Programas'],
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <nav className="border-b border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
        <div className="flex h-14 items-center justify-between px-3 sm:px-4">
          <button type="button" className="p-2 text-gray-600 dark:text-gray-300" onClick={() => setOpen((v) => !v)} aria-label="Menú">
            <Bars3Icon className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-1">
            <button type="button" onClick={toggleTheme} className="p-2 text-gray-600 dark:text-gray-300" aria-label="Tema">
              {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5 text-yellow-400" />}
            </button>
            <span className="px-3 text-xs font-semibold uppercase tracking-wide text-gray-700 dark:text-gray-200">{rolesLine}</span>
            <button type="button" className="btn-secondary text-xs" onClick={logout}>Salir</button>
          </div>
        </div>
      </nav>

      {open ? <button type="button" className="fixed inset-0 z-40 bg-black/50 md:hidden" aria-label="Cerrar" onClick={() => setOpen(false)} /> : null}

      <div className="flex">
        <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-gray-200 bg-white pt-14 transition dark:border-gray-700 dark:bg-gray-800 md:static md:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="px-3 py-4">
            <Link to={complementariosPaths.consultarRegistro} className="mb-4 block px-2 text-sm font-bold text-gray-900 dark:text-white">
              Sofía Consulta
            </Link>
            <button type="button" onClick={() => setFpiOpen((v) => !v)} className="flex w-full items-center justify-between rounded-md px-2 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
              <span>FPI</span>
              <ChevronDownIcon className={`h-4 w-4 transition ${fpiOpen ? '' : '-rotate-90'}`} />
            </button>
            {fpiOpen ? (
              <div className="mt-0.5 space-y-0.5">
                {FPI.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors border-l-[3px] ${
                        isActive
                          ? 'border-primary-600 bg-primary-50 font-medium text-primary-800 dark:border-primary-400 dark:bg-primary-900/30 dark:text-primary-200 pl-[9px]'
                          : 'border-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/80 pl-[9px]'
                      }`
                    }
                  >
                    <IdentificationIcon className="w-5 h-5 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </NavLink>
                ))}
              </div>
            ) : null}
          </div>
        </aside>

        <main className="min-w-0 flex-1 p-4 dark:bg-gray-900 sm:p-6">
          <nav aria-label="Miga de pan" className="mb-4">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              {crumbs.map((c, i) => (
                <li key={c} className="inline-flex items-center gap-2">
                  {i !== 0 ? <span aria-hidden>/</span> : null}
                  <span className={i === crumbs.length - 1 ? 'font-medium text-gray-900 dark:text-white' : ''}>{c}</span>
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
