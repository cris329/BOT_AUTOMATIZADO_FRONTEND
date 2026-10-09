# Sofía Consulta — Frontend

App React (Vite) con login JWT y pantallas para la misma funcionalidad del
scraper Sofía/Betowa. Habla con `SOFIA-CONSULTA-BACKEND` por `/api/v1`.

## Arranque

```bash
cp .env.example .env
npm install
npm run dev
```

Abre `http://localhost:5173`. Usuario por defecto del backend (si lo sembraste):

- email: `admin@local.test`
- password: el de `ADMIN_PASSWORD` en el `.env` del backend

## Módulos

1. **Clave operador** — guarda credencial Sofía cifrada
2. **Registro** — Fase 1 Consultar Registro (uno / lote)
3. **Programas** — Fase 2 inscripciones por programa
4. **Betowa** — validación sin Sofía

No comparte carpetas ni endpoints con CDATTG-WEB.
