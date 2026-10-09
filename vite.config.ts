/**
 * Vite + Vitest de Sofía Consulta Frontend.
 *
 * @author Cristian Deysdayr Jiménez
 * @created 2026-10-09
 */

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
});
