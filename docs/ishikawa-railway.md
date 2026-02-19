# Ishikawa: Despliegue correcto en Railway

**Objetivo:** Que el repositorio se suba y ejecute correctamente en Railway.

---

## Diagrama de Ishikawa (causas que impiden el deploy)

```
                    Entorno / Config
                           │
    DATABASE_URL     PORT / HOST      Variables no
    no definida      no usados        documentadas
         \                |                /
          \               |               /
           \              |              /
            \             |             /
             \            |            /
    ──────────\───────────┼───────────/──────────  "No se sube / no corre en Railway"
             /            |            \
            /             |             \
           /              |              \
          /               |               \
         /                |                \
    Scripts          Servidor           Dependencias
    sin "start"      no sirve           express/cors/pg
    build solo       frontend           en devDependencies
    frontend         ni SPA fallback    tsx solo en dev
```

---

## Causas y correcciones aplicadas

| Rama (categoría) | Causa | Corrección |
|------------------|--------|------------|
| **Scripts** | No hay script `start` para producción | Añadir `"start": "tsx server/index.ts"` en `package.json` |
| **Scripts** | Railway ejecuta `npm run build` + `npm start`; el build solo hace Vite | Mantener `build`: `vite build`; el servidor sirve `dist/` |
| **Servidor** | Express no sirve el frontend estático | En producción, servir `express.static('dist')` y fallback SPA a `index.html` |
| **Servidor** | CORS en producción apunta a localhost | Usar `CORS_ORIGIN` o en Railway el mismo origen (no necesario si todo va en un solo servicio) |
| **Dependencias** | `express`, `cors`, `pg` en devDependencies | Mover a `dependencies` para que estén en producción |
| **Dependencias** | `tsx` en devDependencies | Mover a `dependencies` para ejecutar el servidor TS en start |
| **Entorno** | `DATABASE_URL` no documentada para Railway | Crear `.env.example` y documentar; en Railway añadir Postgres y enlazar variable |
| **Entorno** | Postgres en Railway suele requerir SSL | Documentar `DB_SSL=true` en `.env.example` |
| **Config** | Sin guía para Railway | Añadir `railway.json` o documentar en README los pasos (opcional) |

---

## Checklist post-cambios

- [x] Script `start` definido
- [x] Servidor sirve `dist/` y fallback SPA en producción
- [x] Dependencias de runtime en `dependencies`
- [x] `.env.example` con variables necesarias para Railway
- [x] `railway.json` con startCommand y Nixpacks
- [x] `.env.example` con variables para Railway
- [ ] En Railway: conectar repo, añadir Postgres, definir `DATABASE_URL` y `DB_SSL=true`
- [ ] En Railway: el build será `npm run build`, el start `npm start`

---

## Cómo desplegar en Railway (resumen)

1. Conectar el repositorio de GitHub a Railway.
2. Añadir el plugin **PostgreSQL** al proyecto.
3. En Variables del servicio, asegurar que existan (Railway suele inyectar `DATABASE_URL` al enlazar Postgres):
   - `DATABASE_URL` (automática si Postgres está enlazado)
   - `DB_SSL` = `true`
   - `NODE_ENV` = `production` (opcional; Railway puede fijarlo)
4. Deploy: Railway hará `npm install`, `npm run build`, `npm start`.
5. La app quedará en una sola URL (frontend + API en `/api`).
