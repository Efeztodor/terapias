# Guía de Optimización de Imágenes para Railway

## Problema
Las imágenes grandes (> 1MB) pueden causar fallos de build en Railway debido a:
- Límites de memoria durante el build
- Timeouts durante el procesamiento
- Tamaño excesivo del build final

## Imágenes que Requieren Optimización

### Imágenes Identificadas

1. **`src/assets/logo-paola.png`** - 2.03 MB
   - **Objetivo:** Reducir a < 500 KB
   - **Acción:** Comprimir y posiblemente convertir a WebP

2. **`public/lovable-uploads/a03ec1b2-a764-4519-bd71-3772e86f6928.png`** - 2.03 MB
   - **Objetivo:** Reducir a < 500 KB
   - **Acción:** Comprimir y posiblemente convertir a WebP

3. **`public/favicon.png`** - 0.69 MB
   - **Objetivo:** Reducir a < 100 KB
   - **Acción:** Comprimir y redimensionar si es necesario

4. **`src/assets/hero-bg.jpg`** - Tamaño desconocido
   - **Objetivo:** Verificar tamaño y optimizar si > 500 KB
   - **Acción:** Comprimir y posiblemente convertir a WebP

## Métodos de Optimización

### Opción 1: Herramientas Online (Más Rápido)

#### Para PNG:
1. **TinyPNG** (https://tinypng.com/)
   - Sube la imagen
   - Descarga la versión optimizada
   - Puede reducir hasta 70% del tamaño

2. **Squoosh** (https://squoosh.app/)
   - Control avanzado de compresión
   - Conversión a WebP
   - Comparación lado a lado

#### Para JPG:
1. **JPEG Optimizer** (https://jpeg-optimizer.com/)
2. **Squoosh** (también funciona con JPG)

### Opción 2: Herramientas de Línea de Comandos

#### Usando Sharp (Recomendado para automatización)

```bash
# Instalar sharp-cli globalmente
npm install -g sharp-cli

# Optimizar una imagen PNG
sharp -i logo-paola.png -o logo-paola-optimized.png --png

# Convertir a WebP (mejor compresión)
sharp -i logo-paola.png -o logo-paola.webp --webp

# Redimensionar y optimizar
sharp -i logo-paola.png -o logo-paola-optimized.png --resize 1200 --png
```

#### Usando ImageMagick

```bash
# Comprimir PNG
magick logo-paola.png -strip -quality 85 logo-paola-optimized.png

# Convertir a WebP
magick logo-paola.png -quality 80 logo-paola.webp
```

### Opción 3: Script de Automatización

Ver `scripts/optimize-images.js` para un script automatizado.

## Pasos Recomendados

### Paso 1: Optimizar Imágenes Manualmente

1. **Logo Principal (`src/assets/logo-paola.png`):**
   ```bash
   # Usar TinyPNG o Squoosh para comprimir
   # Objetivo: < 500 KB
   # Si es posible, convertir a WebP para mejor compresión
   ```

2. **Imagen de Upload (`public/lovable-uploads/...`):**
   ```bash
   # Comprimir usando Squoosh con calidad 80-85
   # Objetivo: < 500 KB
   ```

3. **Favicon (`public/favicon.png`):**
   ```bash
   # Redimensionar a 32x32 o 64x64 si es necesario
   # Comprimir con TinyPNG
   # Objetivo: < 100 KB
   ```

### Paso 2: Actualizar Referencias en el Código

Si convertiste imágenes a WebP, actualiza las referencias:

```tsx
// Antes
import logo from "@/assets/logo-paola.png";

// Después (si convertiste a WebP)
import logo from "@/assets/logo-paola.webp";
```

### Paso 3: Verificar Tamaños

```bash
# Verificar tamaños después de optimizar
Get-ChildItem -Path src/assets,public -Recurse -Include *.png,*.jpg,*.webp | 
  Where-Object { $_.Length -gt 500KB } | 
  Select-Object FullName, @{Name="Size(MB)";Expression={[math]::Round($_.Length/1MB,2)}}
```

### Paso 4: Probar Build Localmente

```bash
# Limpiar build anterior
rm -rf dist

# Ejecutar build
npm run build

# Verificar que el build se completa sin errores
# Verificar tamaño del directorio dist
```

## Configuración de Vite para WebP

Si decides usar WebP, Vite lo soporta automáticamente. Solo necesitas:

1. Convertir las imágenes a WebP
2. Actualizar las importaciones en el código
3. Vite manejará el resto automáticamente

## Verificación Post-Optimización

Después de optimizar las imágenes:

1. ✅ Todas las imágenes < 1 MB
2. ✅ Logo principal < 500 KB
3. ✅ Favicon < 100 KB
4. ✅ Build local funciona correctamente
5. ✅ Tamaño total de `dist/` reducido significativamente

## Notas Adicionales

- **WebP vs PNG:** WebP ofrece mejor compresión pero requiere navegadores modernos. Vite puede generar fallbacks automáticamente.
- **Calidad vs Tamaño:** Encuentra el balance entre calidad visual y tamaño de archivo.
- **Lazy Loading:** Las imágenes grandes deberían usar `loading="lazy"` en el código (ya implementado en algunos componentes).

## Recursos

- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)
- [WebP Converter](https://cloudconvert.com/png-to-webp)
- [Vite Asset Handling](https://vitejs.dev/guide/assets.html)
