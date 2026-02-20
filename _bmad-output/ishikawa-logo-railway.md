# Ishikawa: Causa raíz — "Railway no permite cambiar el logo"

**Problema:** Al intentar cambiar el logo de la página desplegada en Railway, el cambio no se refleja o no es posible.

**Contexto:** 
- Logo anterior: `public/logo-paola-paredes-sin-fondo.png` (eliminado en repo).
- Nuevo logo: archivo con nombre largo en `public/` (sin seguimiento en Git).
- Código: `Navbar.tsx` y `Footer.tsx` referencian `/logo-paola-paredes-sin-fondo.png`.
- Despliegue: Railway con Nixpacks, `npm start`.

---

## Diagrama Ishikawa (6M)

Causas posibles agrupadas en las 6 M (Metodología, Mano de obra, Material, Medio, Máquina, Medición), apuntando al **efecto**: *Railway no muestra / no permite cambiar el logo*.

```
                    ┌─ Método: no hay checklist "cambiar logo"
                    │
    Metodología ────┼─ Proceso: cambio de logo no documentado
                    │
                    └─ Git: nuevo archivo no añadido/commitado
                                         │
                                         ▼
    Mano de obra ───┼─ Confusión sobre dónde colocar el logo (public/ vs assets/)
                    │
                    └─ No saber que Railway sirve desde el build (no desde local)
                                         │
                                         ▼
    Material ───────┼─ Nombre del nuevo archivo ≠ nombre en código
                    │     (código pide logo-paola-paredes-sin-fondo.png)
                    │
                    └─ Archivo nuevo con nombre muy largo o en otra ruta
                                         │
                                         ▼
    Medio ──────────┼─ Entorno Railway: build desde repo (solo lo commiteado)
                    │
                    └─ Cache de build/deploy en Railway
                                         │
                                         ▼
    Máquina ────────┼─ Nixpacks: carpeta public/ copiada al build
                    │     si el PNG no está en public/ o no está en repo → no se despliega
                    │
                    └─ Vite: solo incluye lo que está en public/ en el build
                                         │
                                         ▼
    Medición ───────┼─ No se comprueba en local que /logo-...png existe tras el cambio
                    │
                    └─ No se verifica el build (npm run build) antes de subir
```

---

## Causas raíz más probables (priorizadas)

| # | Categoría | Causa | Comentario |
|---|-----------|--------|------------|
| 1 | **Material / Código** | El código usa una ruta fija `/logo-paola-paredes-sin-fondo.png`. El archivo nuevo tiene otro nombre (y además está sin commitear). | Aunque subas otro PNG, el HTML/JS sigue pidiendo el nombre viejo. |
| 2 | **Metodología / Git** | El nuevo logo no está en el repositorio (untracked) y el antiguo fue eliminado. Railway solo despliega lo que está en el repo. | Railway “no permite” el cambio porque el asset nuevo nunca llega al deploy. |
| 3 | **Medio** | Railway sirve el resultado del build. Si el build no incluye el PNG con el nombre correcto, el cambio no se ve. | Cache de build puede hacer que sigas viendo la versión anterior hasta redeploy limpio. |
| 4 | **Método** | No hay un proceso claro: “poner PNG en public/, mismo nombre o actualizar referencias, commit, push, redeploy”. | Aumenta la probabilidad de desalinear nombre de archivo y código. |

---

## Acciones correctivas recomendadas

1. **Unificar nombre y ruta**
   - Renombrar el nuevo logo a `logo-paola-paredes-sin-fondo.png` y colocarlo en `public/`.
   - O mantener el nombre nuevo y actualizar en `Navbar.tsx` y `Footer.tsx` la ruta al nuevo archivo (y asegurar que ese archivo esté en `public/`).

2. **Incluir el asset en el repositorio**
   - `git add public/logo-paola-paredes-sin-fondo.png` (o el nombre que se use).
   - Commit y push a la rama que despliega Railway.

3. **Comprobar build local**
   - `npm run build` y revisar que en `dist/` (o la carpeta de build) aparezca el PNG.
   - Abrir en local la build y comprobar que el logo se ve.

4. **Forzar redeploy en Railway**
   - Nuevo deploy desde el último commit. Si Railway usa cache de build, considerar “Clear build cache” / redeploy limpio si el logo sigue sin actualizarse.

5. **Documentar el proceso**
   - En el repo (p. ej. README o docs): “Para cambiar el logo: reemplazar `public/logo-paola-paredes-sin-fondo.png`, o actualizar la ruta en Navbar y Footer y subir el nuevo archivo a `public/`, luego commit, push y redeploy.”

---

## Resumen una frase

**Causa raíz más probable:** El nuevo logo no está en el repo con el nombre que el código espera (`logo-paola-paredes-sin-fondo.png`), y/o el archivo no está en `public/`, por eso Railway sigue sirviendo el build sin el logo nuevo.

---

# Party Mode — Agentes óptimos para este problema

Según el workflow de Party Mode, se seleccionan **2–3 agentes más relevantes** por tema. Para *“causa raíz del logo en Railway”* y *“definir con qué agentes empezar”*, esta es la recomendación.

## Agentes óptimos para **empezar** (primer turno)

| Orden | Agente | Rol | Motivo |
|-------|--------|-----|--------|
| 1 | **Analyst (Mary)** | Business Analyst | Lidera análisis de causa raíz, requisitos y evidencia; encaja con el Ishikawa y con descubrir qué falla. |
| 2 | **Architect (Winston)** | Architect | Infraestructura (Railway), build, despliegue, dónde vive el asset en el ciclo de release. |
| 3 | **Dev (Amelia)** | Developer | Código que referencia el logo (Navbar/Footer), carpeta `public/`, nombre del archivo y build (Vite). |

**Por qué este orden:** Mary estructura el problema y las causas; Winston explica por qué Railway “no permite” el cambio (build/repo/cache); Amelia traduce en cambios concretos (rutas, nombre del archivo, commit).

## Agentes para **segundo turno** (validar y cerrar)

| Agente | Rol | Cuándo usarlos |
|--------|-----|----------------|
| **QA (Quinn)** | QA Engineer | Verificar que el logo se ve en build local y en Railway (casos de prueba / checklist). |
| **UX Designer (Sally)** | UX Designer | Si además quieres criterios de formato/tamaño/nombre del asset para futuros cambios de logo. |

## Agentes que puedes **dejar para después** (menos críticos aquí)

| Agente | Rol | Motivo |
|--------|-----|--------|
| **PM (John)** | Product Manager | Útil si priorizas “cambiar logo” frente a otras tareas; no esencial para la causa raíz técnica. |
| **SM (Bob)** | Scrum Master | Útil si conviertes “cambiar logo” en historia/checklist en el backlog. |
| **Quick Flow Solo Dev (Barry)** | Quick Flow | Alternativa a Amelia si prefieres flujo rápido spec+implementación; para este problema concreto, Dev + Architect suelen bastar. |

## Flujo sugerido en Party Mode

1. **Inicio:** Activar Party Mode y plantear: “No puedo cambiar el logo en Railway; ya tenemos un Ishikawa en `_bmad-output/ishikawa-logo-railway.md`. ¿Con qué agentes empezamos?”
2. **Primera ronda:** Analyst + Architect + Dev (Mary, Winston, Amelia) comentan el Ishikawa y confirman causas y acciones.
3. **Segunda ronda (opcional):** QA (Quinn) propone checklist de verificación; UX (Sally) sugiere estándar del asset si aplica.
4. **Cierre:** Dev (o Quick Flow) ejecuta: renombrar/colocar logo, actualizar rutas si hace falta, commit, push, redeploy y verificación.
