/**
 * Rutas FPI exactas CDATTG + Layout CDATTG.
 *
 * @author Cristian Deysdayr Jiménez
 */

import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { RequireAuth } from './components/RequireAuth';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ComplementariosBetowaVerificacionPage } from './pages/complementarios/ComplementariosBetowaVerificacionPage';
import { ComplementariosConsultarRegistroPage } from './pages/complementarios/ComplementariosConsultarRegistroPage';
import { ComplementariosInscripcionesPage } from './pages/complementarios/ComplementariosInscripcionesPage';
import { LoginPage } from './pages/LoginPage';
import { complementariosPaths } from './routes/paths';

function Shell() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<RequireAuth />}>
              <Route element={<Shell />}>
                <Route index element={<Navigate to={complementariosPaths.consultarRegistro} replace />} />
                <Route path="complementarios/betowa" element={<ComplementariosBetowaVerificacionPage />} />
                <Route path="complementarios/consultar-registro" element={<ComplementariosConsultarRegistroPage />} />
                <Route path="complementarios/inscripciones" element={<ComplementariosInscripcionesPage />} />
              </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}
